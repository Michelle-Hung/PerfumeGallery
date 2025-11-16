<template>
  <div class="home-container">
    <!-- 搜尋區域 -->
    <div class="search-section">
      <h2 class="section-title">Perfume Gallery</h2>
      <SearchBar
        v-model="perfumeStore.searchKeyword"
        @search="handleSearch"
      />
    </div>

    <!-- 主要內容區域 -->
    <el-row :gutter="24" class="content-section">
      <!-- 篩選面板 -->
      <el-col :xs="24" :sm="24" :md="6" :lg="6">
        <FilterPanel
          :brands="perfumeStore.availableBrands"
          :note-families="perfumeStore.availableNoteFamilies"
          v-model:model-brands="perfumeStore.selectedBrandIds"
          v-model:model-notes="perfumeStore.selectedNoteFamilies"
          v-model:model-genders="perfumeStore.selectedGenders"
          @change="handleFilterChange"
        />
      </el-col>

      <!-- 香水列表 -->
      <el-col :xs="24" :sm="24" :md="18" :lg="18">
        <!-- 結果統計與排序 -->
        <div class="result-header">
          <div class="result-info">
            <span class="result-count">
              找到 <strong>{{ perfumeStore.totalResults }}</strong> 款香水
            </span>
            <el-tag v-if="perfumeStore.hasFilters" type="info">
              已套用 {{ filterCount }} 個篩選條件
            </el-tag>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="perfumeStore.loading" class="loading-container">
          <el-skeleton :rows="3" animated />
          <el-skeleton :rows="3" animated />
          <el-skeleton :rows="3" animated />
        </div>

        <!-- 香水卡片網格 -->
        <div v-else-if="perfumeStore.perfumes.length > 0" class="perfume-grid">
          <PerfumeCard
            v-for="perfume in perfumeStore.perfumes"
            :key="perfume.id"
            :perfume="perfume"
          />
        </div>

        <!-- 無結果 -->
        <el-empty
          v-else
          description="沒有找到符合條件的香水"
          :image-size="200"
        >
          <el-button type="primary" @click="handleClearFilters">
            清除篩選條件
          </el-button>
        </el-empty>

        <!-- 分頁 -->
        <div v-if="perfumeStore.totalPages > 1" class="pagination-container">
          <el-pagination
            v-model:current-page="perfumeStore.currentPage"
            :page-size="perfumeStore.pageSize"
            :total="perfumeStore.totalResults"
            layout="prev, pager, next, jumper"
            @current-change="handlePageChange"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
import { usePerfumeStore } from '@/stores/perfumeStore'
import SearchBar from '@/components/SearchBar.vue'
import FilterPanel from '@/components/FilterPanel.vue'
import PerfumeCard from '@/components/PerfumeCard.vue'

const perfumeStore = usePerfumeStore()

const filterCount = computed(() => {
  return perfumeStore.selectedBrandIds.length +
         perfumeStore.selectedNoteFamilies.length +
         perfumeStore.selectedGenders.length
})

// 初始化
onMounted(async () => {
  await perfumeStore.loadAvailableOptions()
  await perfumeStore.searchPerfumes()
})

// 監聽頁碼變化
watch(() => perfumeStore.currentPage, () => {
  perfumeStore.searchPerfumes()
  // 滾動到頂部
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

function handleSearch() {
  perfumeStore.searchPerfumes()
}

function handleFilterChange() {
  perfumeStore.searchPerfumes()
}

function handlePageChange() {
  perfumeStore.searchPerfumes()
}

function handleClearFilters() {
  perfumeStore.clearFilters()
  perfumeStore.setSearchKeyword('')
  perfumeStore.searchPerfumes()
}
</script>

<style scoped>
.home-container {
  max-width: 1400px;
  margin: 0 auto;
}

.search-section {
  margin-bottom: 32px;
  text-align: center;
}

.section-title {
  margin: 0 0 48px 0;
  font-size: 48px;
  font-weight: 900;
  letter-spacing: -1.5px;
  line-height: 1.2;
  color: var(--primary-color);
  position: relative;
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

.content-section {
  margin-bottom: 24px;
}

.result-header {
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.result-count {
  font-size: 16px;
  color: var(--text-secondary);
}

.result-count strong {
  color: var(--accent-color);
  font-size: 18px;
  font-weight: 700;
}

.loading-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.perfume-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 36px;
  margin-bottom: 48px;
  position: relative;
  z-index: 1;
}

.pagination-container {
  display: flex;
  justify-content: center;
  padding: 32px 0;
}

:deep(.el-pagination) {
  --el-pagination-bg-color: var(--bg-card);
  --el-pagination-text-color: var(--text-primary);
  --el-pagination-border-radius: var(--radius-md);
}

:deep(.el-pagination .btn-next),
:deep(.el-pagination .btn-prev),
:deep(.el-pagination .number) {
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

:deep(.el-pagination .number:hover),
:deep(.el-pagination .btn-next:hover),
:deep(.el-pagination .btn-prev:hover) {
  background-color: var(--accent-color);
  color: white;
}

:deep(.el-pagination .number.is-active) {
  background-color: var(--accent-color);
  color: white;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .section-title {
    font-size: 32px;
  }

  .perfume-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }

  .result-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 28px;
  }

  .perfume-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>

