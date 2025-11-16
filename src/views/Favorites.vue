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
  font-size: 48px;
  font-weight: 900;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  letter-spacing: -1.5px;
  animation: titleFloat 3s ease-in-out infinite;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

@keyframes titleFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.page-title .el-icon {
  color: var(--accent-color);
  animation: starPulse 2s ease-in-out infinite;
}

@keyframes starPulse {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.4));
  }
  50% {
    transform: scale(1.1);
    filter: drop-shadow(0 0 16px rgba(212, 175, 55, 0.6));
  }
}

.page-subtitle {
  margin: 0;
  font-size: 16px;
  color: var(--text-secondary);
}

.page-subtitle strong {
  color: var(--accent-color);
  font-size: 20px;
  font-weight: 800;
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
  gap: 36px;
  position: relative;
  z-index: 1;
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
