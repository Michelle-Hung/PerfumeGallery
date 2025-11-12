import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Perfume, FilterOptions, SearchResult } from '@/types/perfume'
import { NoteFamily, Gender } from '@/types/perfume'
import {
  fetchPerfumes,
  searchPerfumes as searchPerfumesService,
  getAvailableBrands,
  getAvailableNoteFamilies
} from '@/services/perfumeService'

export const usePerfumeStore = defineStore('perfume', () => {
  // State
  const perfumes = ref<Perfume[]>([])
  const searchKeyword = ref<string>('')
  const selectedBrandIds = ref<string[]>([])
  const selectedNoteFamilies = ref<NoteFamily[]>([])
  const selectedGenders = ref<Gender[]>([])
  const currentPage = ref<number>(1)
  const pageSize = ref<number>(20)
  const totalResults = ref<number>(0)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // Available options
  const availableBrands = ref<Array<{ id: string; name: string }>>([])
  const availableNoteFamilies = ref<NoteFamily[]>([])

  // Computed
  const filterOptions = computed((): FilterOptions => ({
    brandIds: selectedBrandIds.value,
    noteFamilies: selectedNoteFamilies.value,
    genders: selectedGenders.value
  }))

  const hasFilters = computed((): boolean => {
    return selectedBrandIds.value.length > 0 ||
           selectedNoteFamilies.value.length > 0 ||
           selectedGenders.value.length > 0
  })

  const totalPages = computed((): number => {
    return Math.ceil(totalResults.value / pageSize.value)
  })

  // Actions
  async function loadAllPerfumes() {
    loading.value = true
    error.value = null
    try {
      perfumes.value = await fetchPerfumes()
      totalResults.value = perfumes.value.length
    } catch (e) {
      error.value = e instanceof Error ? e.message : '載入香水資料失敗'
      console.error('Failed to load perfumes:', e)
    } finally {
      loading.value = false
    }
  }

  async function searchPerfumes() {
    loading.value = true
    error.value = null
    try {
      const result: SearchResult = await searchPerfumesService(
        searchKeyword.value,
        filterOptions.value,
        currentPage.value,
        pageSize.value
      )
      perfumes.value = result.perfumes
      totalResults.value = result.total
    } catch (e) {
      error.value = e instanceof Error ? e.message : '搜尋失敗'
      console.error('Failed to search perfumes:', e)
    } finally {
      loading.value = false
    }
  }

  async function loadAvailableOptions() {
    try {
      const [brands, families] = await Promise.all([
        getAvailableBrands(),
        getAvailableNoteFamilies()
      ])
      availableBrands.value = brands
      availableNoteFamilies.value = families
    } catch (e) {
      console.error('Failed to load available options:', e)
    }
  }

  function setSearchKeyword(keyword: string) {
    searchKeyword.value = keyword
    currentPage.value = 1 // 重置頁碼
  }

  function toggleBrand(brandId: string) {
    const index = selectedBrandIds.value.indexOf(brandId)
    if (index > -1) {
      selectedBrandIds.value.splice(index, 1)
    } else {
      selectedBrandIds.value.push(brandId)
    }
    currentPage.value = 1 // 重置頁碼
  }

  function toggleNoteFamily(family: NoteFamily) {
    const index = selectedNoteFamilies.value.indexOf(family)
    if (index > -1) {
      selectedNoteFamilies.value.splice(index, 1)
    } else {
      selectedNoteFamilies.value.push(family)
    }
    currentPage.value = 1 // 重置頁碼
  }

  function toggleGender(gender: Gender) {
    const index = selectedGenders.value.indexOf(gender)
    if (index > -1) {
      selectedGenders.value.splice(index, 1)
    } else {
      selectedGenders.value.push(gender)
    }
    currentPage.value = 1 // 重置頁碼
  }

  function clearFilters() {
    selectedBrandIds.value = []
    selectedNoteFamilies.value = []
    selectedGenders.value = []
    currentPage.value = 1
  }

  function setPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  function previousPage() {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  return {
    // State
    perfumes,
    searchKeyword,
    selectedBrandIds,
    selectedNoteFamilies,
    selectedGenders,
    currentPage,
    pageSize,
    totalResults,
    loading,
    error,
    availableBrands,
    availableNoteFamilies,
    // Computed
    filterOptions,
    hasFilters,
    totalPages,
    // Actions
    loadAllPerfumes,
    searchPerfumes,
    loadAvailableOptions,
    setSearchKeyword,
    toggleBrand,
    toggleNoteFamily,
    toggleGender,
    clearFilters,
    setPage,
    nextPage,
    previousPage
  }
})

