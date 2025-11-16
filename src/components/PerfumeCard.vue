<template>
  <el-card 
    class="perfume-card" 
    :body-style="{ padding: '0' }"
    shadow="hover"
    @click="handleClick"
  >
    <div class="card-image-wrapper">
      <img :src="perfume.image" :alt="perfume.name" class="perfume-image" />
      <div class="favorite-btn-wrapper">
        <el-button
          :icon="isFavorite ? StarFilled : Star"
          circle
          :type="isFavorite ? 'warning' : 'default'"
          @click.stop="toggleFavorite"
          class="favorite-btn"
        />
      </div>
      <el-tag v-if="perfume.gender" class="gender-tag" :type="getGenderTagType(perfume.gender)">
        {{ getGenderText(perfume.gender) }}
      </el-tag>
    </div>
    
    <div class="card-content">
      <h3 class="perfume-name">{{ perfume.name }}</h3>
      <p class="brand-name">{{ perfume.brand.name }}</p>
      
      <div class="perfume-notes">
        <el-tag 
          v-for="(note, index) in displayedNotes" 
          :key="index"
          size="small"
          effect="plain"
          class="note-tag"
        >
          {{ note.name }}
        </el-tag>
        <span v-if="perfume.notes.length > 3" class="more-notes">
          +{{ perfume.notes.length - 3 }}
        </span>
      </div>
      
      <div class="card-footer">
        <div class="rating-section">
          <el-rate 
            v-model="perfume.rating" 
            disabled 
            show-score 
            :score-template="perfume.rating?.toFixed(1) || '0.0'"
            :text-color="ratingColor"
            size="small"
          />
          <span v-if="perfume.reviewCount" class="review-count">
            ({{ perfume.reviewCount }})
          </span>
        </div>
        <div v-if="perfume.price" class="price">
          NT$ {{ perfume.price.toLocaleString() }}
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Star, StarFilled } from '@element-plus/icons-vue'
import type { Perfume } from '@/types/perfume'
import { Gender } from '@/types/perfume'
import { useUserStore } from '@/stores/userStore'

interface Props {
  perfume: Perfume
}

const props = defineProps<Props>()
const router = useRouter()
const userStore = useUserStore()

const isFavorite = computed(() => userStore.isFavorite(props.perfume.id))
const displayedNotes = computed(() => props.perfume.notes.slice(0, 3))
const ratingColor = '#ff9900' // 使用統一的評分顏色

function toggleFavorite() {
  userStore.toggleFavorite(props.perfume.id)
}

function handleClick() {
  router.push({ name: 'perfume-detail', params: { id: props.perfume.id } })
}

function getGenderText(gender: Gender): string {
  const genderMap = {
    [Gender.MALE]: '男香',
    [Gender.FEMALE]: '女香',
    [Gender.UNISEX]: '中性'
  }
  return genderMap[gender] || ''
}

function getGenderTagType(gender: Gender): 'success' | 'danger' | 'info' {
  const typeMap = {
    [Gender.MALE]: 'info' as const,
    [Gender.FEMALE]: 'danger' as const,
    [Gender.UNISEX]: 'success' as const
  }
  return typeMap[gender] || 'info'
}
</script>

<style scoped>
.perfume-card {
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  position: relative;
}

.perfume-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: var(--radius-lg);
  padding: 2px;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.perfume-card:hover::before {
  opacity: 1;
}

.perfume-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: var(--shadow-xl), var(--shadow-colored);
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  height: 320px;
  overflow: hidden;
  background: linear-gradient(135deg, #FAF3E0 0%, #F5E6D3 100%);
}

.card-image-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.05) 100%);
  pointer-events: none;
}

.perfume-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  filter: brightness(1.05);
}

.perfume-card:hover .perfume-image {
  transform: scale(1.15) rotate(2deg);
}

.favorite-btn-wrapper {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
}

.favorite-btn {
  background: var(--bg-overlay);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: var(--shadow-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.favorite-btn:hover {
  box-shadow: var(--shadow-lg), var(--shadow-glow);
  transform: scale(1.15) rotate(12deg);
  background: var(--bg-card);
}

.gender-tag {
  position: absolute;
  top: 12px;
  left: 12px;
}

.card-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
  background: var(--bg-card);
}

.perfume-name {
  margin: 0 0 8px 0;
  font-size: 19px;
  font-weight: 700;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: -0.6px;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.perfume-card:hover .perfume-name {
  color: var(--primary-color);
}

.brand-name {
  margin: 0 0 16px 0;
  font-size: 13px;
  color: var(--text-light);
  font-weight: 500;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.perfume-notes {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
  min-height: 32px;
}

.note-tag {
  font-size: 12px;
}

.more-notes {
  font-size: 12px;
  color: var(--text-light);
  align-self: center;
}

.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid var(--border-light);
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 4px;
}

.review-count {
  font-size: 12px;
  color: var(--text-light);
}

.price {
  font-size: 22px;
  font-weight: 800;
  color: var(--accent-color);
  letter-spacing: -0.6px;
  text-shadow: 1px 1px 2px rgba(212, 175, 55, 0.15);
}

:deep(.el-rate__text) {
  font-size: 12px;
  margin-left: 4px;
  color: var(--text-light);
}

:deep(.el-rate__icon) {
  transition: transform 0.2s ease;
}

:deep(.el-rate__icon:hover) {
  transform: scale(1.2);
}
</style>

