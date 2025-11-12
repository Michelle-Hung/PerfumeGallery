<template>
  <div class="search-bar">
    <el-input
      v-model="searchText"
      placeholder="搜尋香水名稱或品牌..."
      :prefix-icon="Search"
      size="large"
      clearable
      @input="handleSearch"
      @clear="handleClear"
      class="search-input"
    >
      <template #append>
        <el-button :icon="Search" @click="handleSearchClick">搜尋</el-button>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useDebounceFn } from '@vueuse/core'

interface Props {
  modelValue?: string
  debounce?: number
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'search', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  debounce: 300
})

const emit = defineEmits<Emits>()

const searchText = ref(props.modelValue)

// 監聽外部變化
watch(() => props.modelValue, (newValue) => {
  searchText.value = newValue
})

// 防抖搜尋
const debouncedSearch = useDebounceFn((value: string) => {
  emit('update:modelValue', value)
  emit('search', value)
}, props.debounce)

function handleSearch(value: string) {
  debouncedSearch(value)
}

function handleClear() {
  searchText.value = ''
  emit('update:modelValue', '')
  emit('search', '')
}

function handleSearchClick() {
  emit('update:modelValue', searchText.value)
  emit('search', searchText.value)
}
</script>

<style scoped>
.search-bar {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
}

:deep(.el-input__wrapper) {
  box-shadow: var(--shadow-sm);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--bg-card);
}

:deep(.el-input__wrapper:hover) {
  border-color: var(--accent-color);
  box-shadow: var(--shadow-md);
}

:deep(.el-input__wrapper.is-focus) {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

:deep(.el-button) {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
  border-radius: var(--radius-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
}

:deep(.el-button:hover) {
  background-color: var(--accent-hover);
  border-color: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
</style>

