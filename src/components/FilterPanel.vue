<template>
  <el-card class="filter-panel" shadow="never">
    <template #header>
      <div class="filter-header">
        <span class="filter-title">
          <el-icon><Filter /></el-icon>
          篩選條件
        </span>
        <el-button
          v-if="hasFilters"
          link
          type="primary"
          @click="handleClearAll"
        >
          清除全部
        </el-button>
      </div>
    </template>

    <!-- 品牌篩選 -->
    <div class="filter-section">
      <h4 class="section-title">品牌</h4>
      <el-checkbox-group v-model="selectedBrands" @change="handleBrandChange">
        <el-checkbox
          v-for="brand in brands"
          :key="brand.id"
          :label="brand.id"
          :value="brand.id"
        >
          {{ brand.name }}
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <el-divider />

    <!-- 香調篩選 -->
    <div class="filter-section">
      <h4 class="section-title">香調</h4>
      <el-checkbox-group v-model="selectedNotes" @change="handleNoteChange">
        <el-checkbox
          v-for="note in noteFamilies"
          :key="note"
          :label="note"
          :value="note"
        >
          {{ getNoteFamilyText(note) }}
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <el-divider />

    <!-- 性別篩選 -->
    <div class="filter-section">
      <h4 class="section-title">性別分類</h4>
      <el-checkbox-group v-model="selectedGenders" @change="handleGenderChange">
        <el-checkbox
          v-for="gender in genders"
          :key="gender"
          :label="gender"
          :value="gender"
        >
          {{ getGenderText(gender) }}
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <!-- 已選篩選條件統計 -->
    <div v-if="hasFilters" class="filter-summary">
      <el-tag
        v-if="selectedBrands.length > 0"
        closable
        @close="selectedBrands = []; handleBrandChange()"
      >
        品牌: {{ selectedBrands.length }}
      </el-tag>
      <el-tag
        v-if="selectedNotes.length > 0"
        closable
        @close="selectedNotes = []; handleNoteChange()"
      >
        香調: {{ selectedNotes.length }}
      </el-tag>
      <el-tag
        v-if="selectedGenders.length > 0"
        closable
        @close="selectedGenders = []; handleGenderChange()"
      >
        性別: {{ selectedGenders.length }}
      </el-tag>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Filter } from '@element-plus/icons-vue'
import { NoteFamily, Gender } from '@/types/perfume'

interface Props {
  brands: Array<{ id: string; name: string }>
  noteFamilies: NoteFamily[]
  genders?: Gender[]
  modelBrands?: string[]
  modelNotes?: NoteFamily[]
  modelGenders?: Gender[]
}

interface Emits {
  (e: 'update:modelBrands', value: string[]): void
  (e: 'update:modelNotes', value: NoteFamily[]): void
  (e: 'update:modelGenders', value: Gender[]): void
  (e: 'change'): void
}

const props = withDefaults(defineProps<Props>(), {
  genders: () => [Gender.MALE, Gender.FEMALE, Gender.UNISEX],
  modelBrands: () => [],
  modelNotes: () => [],
  modelGenders: () => []
})

const emit = defineEmits<Emits>()

const selectedBrands = ref<string[]>([...props.modelBrands])
const selectedNotes = ref<NoteFamily[]>([...props.modelNotes])
const selectedGenders = ref<Gender[]>([...props.modelGenders])

// 監聽外部變化
watch(() => props.modelBrands, (newValue) => {
  selectedBrands.value = [...newValue]
})

watch(() => props.modelNotes, (newValue) => {
  selectedNotes.value = [...newValue]
})

watch(() => props.modelGenders, (newValue) => {
  selectedGenders.value = [...newValue]
})

const hasFilters = computed(() => {
  return selectedBrands.value.length > 0 ||
         selectedNotes.value.length > 0 ||
         selectedGenders.value.length > 0
})

function handleBrandChange() {
  emit('update:modelBrands', selectedBrands.value)
  emit('change')
}

function handleNoteChange() {
  emit('update:modelNotes', selectedNotes.value)
  emit('change')
}

function handleGenderChange() {
  emit('update:modelGenders', selectedGenders.value)
  emit('change')
}

function handleClearAll() {
  selectedBrands.value = []
  selectedNotes.value = []
  selectedGenders.value = []
  emit('update:modelBrands', [])
  emit('update:modelNotes', [])
  emit('update:modelGenders', [])
  emit('change')
}

function getNoteFamilyText(family: NoteFamily): string {
  const familyMap: Record<NoteFamily, string> = {
    [NoteFamily.FLORAL]: '花香',
    [NoteFamily.WOODY]: '木質',
    [NoteFamily.ORIENTAL]: '東方',
    [NoteFamily.FRESH]: '清新',
    [NoteFamily.FRUITY]: '果香',
    [NoteFamily.CITRUS]: '柑橘',
    [NoteFamily.SPICY]: '辛香',
    [NoteFamily.AQUATIC]: '水生',
    [NoteFamily.GOURMAND]: '美食',
    [NoteFamily.GREEN]: '綠葉',
    [NoteFamily.LEATHER]: '皮革',
    [NoteFamily.AMBER]: '琥珀'
  }
  return familyMap[family] || family
}

function getGenderText(gender: Gender): string {
  const genderMap: Record<Gender, string> = {
    [Gender.MALE]: '男香',
    [Gender.FEMALE]: '女香',
    [Gender.UNISEX]: '中性'
  }
  return genderMap[gender] || gender
}
</script>

<style scoped>
.filter-panel {
  height: fit-content;
  position: sticky;
  top: 100px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-title {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-section {
  margin-bottom: 16px;
}

.section-title {
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.el-checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.el-checkbox {
  margin: 0;
}

.filter-summary {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

:deep(.el-tag) {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
  color: var(--text-secondary);
  font-weight: 500;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

:deep(.el-tag:hover) {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
  transform: translateY(-1px);
}

.el-divider {
  margin: 16px 0;
}

:deep(.el-card__header) {
  padding: 24px;
  background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
  border-bottom: 1px solid var(--border-light);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.filter-panel {
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-md);
  background: var(--bg-card);
  transition: all 0.3s ease;
}

.filter-panel:hover {
  box-shadow: var(--shadow-lg);
}

:deep(.el-card__body) {
  padding: 16px;
}
</style>

