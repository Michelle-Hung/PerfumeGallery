<template>
  <div class="favorites-container">
    <div class="favorites-header">
      <h2 class="page-title">
        <el-icon><StarFilled /></el-icon>
        我的收藏
      </h2>
      <p class="page-subtitle">
        您已收藏 <strong>{{ favoritesCount }}</strong> 款香水
      </p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="3" animated />
      <el-skeleton :rows="3" animated />
    </div>

    <!-- 收藏列表 -->
    <div v-else-if="favoritePerfumes.length > 0" class="favorites-content">
      <div class="perfume-grid">
        <PerfumeCard
          v-for="perfume in favoritePerfumes"
          :key="perfume.id"
          :perfume="perfume"
        />
      </div>
    </div>

    <!-- 空狀態 -->
    <el-empty
      v-else
      description="還沒有收藏任何香水"
      :image-size="200"
    >
      <el-button type="primary" @click="$router.push('/')">
        去探索香水
      </el-button>
    </el-empty>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { StarFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/userStore'
import { fetchPerfumeById } from '@/services/perfumeService'
import PerfumeCard from '@/components/PerfumeCard.vue'
import type { Perfume } from '@/types/perfume'

const userStore = useUserStore()

const favoritePerfumes = ref<Perfume[]>([])
const loading = ref(true)

const favoritesCount = computed(() => userStore.favoritesCount)

onMounted(async () => {
  await loadFavoritePerfumes()
})

async function loadFavoritePerfumes() {
  loading.value = true
  try {
    const perfumePromises = userStore.favoriteIds.map(id => fetchPerfumeById(id))
    const results = await Promise.all(perfumePromises)
    favoritePerfumes.value = results.filter((p): p is Perfume => p !== null)
  } catch (error) {
    console.error('Failed to load favorite perfumes:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.favorites-container {
  max-width: 1400px;
  margin: 0 auto;
}

.favorites-header {
  text-align: center;
  margin-bottom: 32px;
}

.page-title {
  margin: 0 0 16px 0;
  font-size: 42px;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  letter-spacing: -1.2px;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-purple) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-title .el-icon {
  color: var(--accent-purple);
}

.page-subtitle {
  margin: 0;
  font-size: 16px;
  color: var(--text-secondary);
}

.page-subtitle strong {
  color: var(--accent-purple);
  font-size: 18px;
  font-weight: 700;
}

.loading-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.favorites-content {
  margin-top: 24px;
}

.perfume-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 32px;
  }

  .perfume-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 28px;
  }

  .perfume-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
