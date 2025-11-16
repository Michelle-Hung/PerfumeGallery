<template>
  <div class="detail-container">
    <!-- Loading -->
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="5" animated />
    </div>

    <!-- 香水詳情 -->
    <div v-else-if="perfume" class="perfume-detail">
      <el-row :gutter="24">
        <!-- 左側：圖片 -->
        <el-col :xs="24" :sm="24" :md="8" :lg="8">
          <div class="image-section">
            <img :src="perfume.image" :alt="perfume.name" class="perfume-image" />
            <div class="image-actions">
              <el-button
                :icon="isFavorite ? StarFilled : Star"
                :type="isFavorite ? 'warning' : 'default'"
                size="large"
                @click="toggleFavorite"
              >
                {{ isFavorite ? '已收藏' : '收藏' }}
              </el-button>
            </div>
          </div>
        </el-col>

        <!-- 右側：資訊 -->
        <el-col :xs="24" :sm="24" :md="16" :lg="16">
          <div class="info-section">
            <div class="perfume-header">
              <h1 class="perfume-name">{{ perfume.name }}</h1>
              <el-tag :type="getGenderTagType(perfume.gender)" size="large">
                {{ getGenderText(perfume.gender) }}
              </el-tag>
            </div>

            <p class="brand-name">{{ perfume.brand.name }}</p>

            <!-- 評分 -->
            <div class="rating-section">
              <el-rate
                v-model="averageRating"
                disabled
                show-score
                :score-template="averageRating.toFixed(1)"
                :text-color="ratingColor"
              />
              <span class="review-count-text">
                ({{ reviewCount }} 則評論)
              </span>
            </div>

            <!-- 價格 -->
            <div v-if="perfume.price" class="price-section">
              <span class="price-label">價格：</span>
              <span class="price-value">NT$ {{ perfume.price.toLocaleString() }}</span>
            </div>

            <!-- 濃度 -->
            <div class="concentration-section">
              <span class="concentration-label">濃度：</span>
              <el-tag>{{ getConcentrationText(perfume.concentration) }}</el-tag>
            </div>

            <!-- 發行年份 -->
            <div v-if="perfume.year" class="year-section">
              <span class="year-label">發行年份：</span>
              <span>{{ perfume.year }}</span>
            </div>

            <!-- 描述 -->
            <div class="description-section">
              <h3>描述</h3>
              <p>{{ perfume.description }}</p>
            </div>

            <!-- 香調 -->
            <div class="notes-section">
              <h3>香調結構</h3>
              <div class="notes-list">
                <div class="note-group">
                  <h4>前調</h4>
                  <div class="note-tags">
                    <el-tag
                      v-for="note in topNotes"
                      :key="note.name"
                      type="success"
                      effect="plain"
                    >
                      {{ note.name }}
                    </el-tag>
                  </div>
                </div>
                <div class="note-group">
                  <h4>中調</h4>
                  <div class="note-tags">
                    <el-tag
                      v-for="note in middleNotes"
                      :key="note.name"
                      type="warning"
                      effect="plain"
                    >
                      {{ note.name }}
                    </el-tag>
                  </div>
                </div>
                <div class="note-group">
                  <h4>後調</h4>
                  <div class="note-tags">
                    <el-tag
                      v-for="note in baseNotes"
                      :key="note.name"
                      type="info"
                      effect="plain"
                    >
                      {{ note.name }}
                    </el-tag>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 評論區 -->
      <el-divider />
      <div class="reviews-section">
        <h3>評論 ({{ reviewCount }})</h3>

        <!-- 新增評論 -->
        <el-card class="add-review-card" shadow="never">
          <el-form :model="reviewForm" label-width="80px">
            <el-form-item label="評分">
              <el-rate v-model="reviewForm.rating" />
            </el-form-item>
            <el-form-item label="評論">
              <el-input
                v-model="reviewForm.comment"
                type="textarea"
                :rows="4"
                placeholder="分享您對這款香水的看法..."
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitReview">提交評論</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- 評論列表 -->
        <div v-if="reviews.length > 0" class="reviews-list">
          <el-card
            v-for="review in reviews"
            :key="review.id"
            class="review-card"
            shadow="hover"
          >
            <div class="review-header">
              <div class="review-user">
                <el-avatar :size="40">{{ review.userName[0] }}</el-avatar>
                <div class="user-info">
                  <span class="user-name">{{ review.userName }}</span>
                  <span class="review-date">{{ formatDate(review.createdAt) }}</span>
                </div>
              </div>
              <el-rate v-model="review.rating" disabled size="small" />
            </div>
            <p class="review-comment">{{ review.comment }}</p>
          </el-card>
        </div>

        <el-empty
          v-else
          description="還沒有評論，成為第一個評論的人吧！"
          :image-size="150"
        />
      </div>
    </div>

    <!-- 錯誤狀態 -->
    <el-result
      v-else
      icon="error"
      title="找不到香水"
      sub-title="請檢查網址是否正確"
    >
      <template #extra>
        <el-button type="primary" @click="router.push('/')">返回首頁</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Star, StarFilled } from '@element-plus/icons-vue'
import { NoteType, Gender } from '@/types/perfume'
import { useUserStore } from '@/stores/userStore'
import { fetchPerfumeById } from '@/services/perfumeService'
import type { Perfume } from '@/types/perfume'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const perfume = ref<Perfume | null>(null)
const loading = ref(true)
const ratingColor = '#ff9900' // 使用統一的評分顏色

const reviewForm = ref({
  userName: '訪客',
  rating: 5,
  comment: ''
})

const isFavorite = computed(() => {
  return perfume.value ? userStore.isFavorite(perfume.value.id) : false
})

const reviews = computed(() => {
  return perfume.value ? userStore.getReviewsForPerfume(perfume.value.id) : []
})

const reviewCount = computed(() => reviews.value.length)

const averageRating = computed(() => {
  return perfume.value ? userStore.getAverageRating(perfume.value.id) : 0
})

const topNotes = computed(() => {
  return perfume.value?.notes.filter(note => note.type === NoteType.TOP) || []
})

const middleNotes = computed(() => {
  return perfume.value?.notes.filter(note => note.type === NoteType.MIDDLE) || []
})

const baseNotes = computed(() => {
  return perfume.value?.notes.filter(note => note.type === NoteType.BASE) || []
})

onMounted(async () => {
  const id = route.params.id as string
  await loadPerfume(id)
})

async function loadPerfume(id: string) {
  loading.value = true
  try {
    const result = await fetchPerfumeById(id)
    if (result) {
      perfume.value = result
    } else {
      perfume.value = null
    }
  } catch (error) {
    console.error('Failed to load perfume:', error)
    perfume.value = null
  } finally {
    loading.value = false
  }
}

function toggleFavorite() {
  if (perfume.value) {
    userStore.toggleFavorite(perfume.value.id)
  }
}

function submitReview() {
  if (!perfume.value || !reviewForm.value.comment.trim()) {
    return
  }

  userStore.addReview(
    perfume.value.id,
    reviewForm.value.userName,
    reviewForm.value.rating,
    reviewForm.value.comment
  )

  // 重置表單
  reviewForm.value.comment = ''
  reviewForm.value.rating = 5
}

function getGenderText(gender: Gender): string {
  const genderMap: Record<Gender, string> = {
    [Gender.MALE]: '男香',
    [Gender.FEMALE]: '女香',
    [Gender.UNISEX]: '中性'
  }
  return genderMap[gender] || ''
}

function getGenderTagType(gender: Gender): 'success' | 'danger' | 'info' {
  const typeMap: Record<Gender, 'success' | 'danger' | 'info'> = {
    [Gender.MALE]: 'info',
    [Gender.FEMALE]: 'danger',
    [Gender.UNISEX]: 'success'
  }
  return typeMap[gender] || 'info'
}

function getConcentrationText(concentration: string): string {
  const concentrationMap: Record<string, string> = {
    parfum: '香精 (15-40%)',
    eau_de_parfum: '淡香精 (10-20%)',
    eau_de_toilette: '淡香水 (5-15%)',
    eau_de_cologne: '古龍水 (2-5%)',
    eau_fraiche: '清淡香水 (1-3%)'
  }
  return concentrationMap[concentration] || concentration
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.detail-container {
  max-width: 1200px;
  margin: 0 auto;
}

.loading-container {
  padding: 24px;
}

.perfume-detail {
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  padding: 48px;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-light);
  position: relative;
  overflow: hidden;
}

.perfume-detail::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.04) 0%, transparent 70%);
  pointer-events: none;
}

.image-section {
  position: sticky;
  top: 24px;
}

.perfume-image {
  width: 100%;
  height: auto;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl), var(--shadow-colored);
  margin-bottom: 32px;
  border: 1px solid var(--border-light);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.perfume-image:hover {
  transform: scale(1.05) rotate(2deg);
  box-shadow: var(--shadow-xl), var(--shadow-glow);
}

.image-actions {
  display: flex;
  justify-content: center;
}

.info-section {
  padding-left: 24px;
}

.perfume-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.perfume-name {
  margin: 0;
  font-size: 44px;
  font-weight: 900;
  color: var(--primary-color);
  letter-spacing: -1.5px;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.brand-name {
  font-size: 15px;
  color: var(--text-light);
  margin-bottom: 32px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.review-count-text {
  color: var(--text-light);
  font-size: 14px;
}

.price-section {
  margin-bottom: 16px;
}

.price-label {
  color: var(--text-secondary);
  margin-right: 8px;
}

.price-value {
  font-size: 36px;
  font-weight: 900;
  color: var(--accent-color);
  letter-spacing: -1px;
  text-shadow: 1px 1px 2px rgba(212, 175, 55, 0.2);
}

.concentration-section,
.year-section {
  margin-bottom: 16px;
}

.concentration-label,
.year-label {
  color: var(--text-secondary);
  margin-right: 8px;
}

.description-section {
  margin: 32px 0;
}

.description-section h3 {
  margin: 0 0 20px 0;
  font-size: 22px;
  color: var(--text-primary);
  font-weight: 700;
  letter-spacing: -0.5px;
}

.description-section p {
  line-height: 1.8;
  color: var(--text-secondary);
  font-size: 16px;
}

.notes-section {
  margin: 32px 0;
}

.notes-section h3 {
  margin: 0 0 28px 0;
  font-size: 22px;
  color: var(--text-primary);
  font-weight: 700;
  letter-spacing: -0.5px;
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.note-group h4 {
  margin: 0 0 12px 0;
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.note-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.reviews-section {
  margin-top: 32px;
}

.reviews-section h3 {
  margin: 0 0 24px 0;
  font-size: 18px;
  color: var(--text-primary);
  font-weight: 600;
  letter-spacing: -0.3px;
}

.add-review-card {
  margin-bottom: 32px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.add-review-card:hover {
  box-shadow: var(--shadow-md);
}

:deep(.el-button--primary) {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
  border: none;
  border-radius: var(--radius-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-md);
}

:deep(.el-button--primary:hover) {
  background: linear-gradient(135deg, var(--primary-hover) 0%, var(--accent-hover) 100%);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg), var(--shadow-colored);
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-card {
  padding: 24px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--bg-card);
  box-shadow: var(--shadow-sm);
}

.review-card:hover {
  box-shadow: var(--shadow-lg), var(--shadow-colored);
  transform: translateY(-4px);
  border-color: var(--primary-color);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.review-user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  color: var(--text-primary);
}

.review-date {
  font-size: 12px;
  color: var(--text-light);
}

.review-comment {
  margin: 0;
  line-height: 1.7;
  color: var(--text-secondary);
  font-size: 14px;
}

@media (max-width: 768px) {
  .perfume-detail {
    padding: 32px 24px;
  }

  .info-section {
    padding-left: 0;
    margin-top: 32px;
  }

  .perfume-name {
    font-size: 32px;
  }

  .image-section {
    position: static;
  }

  .price-value {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .perfume-detail {
    padding: 24px 16px;
    border-radius: var(--radius-lg);
  }

  .perfume-name {
    font-size: 28px;
  }
}
</style>
