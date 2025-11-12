import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePerfumeStore } from '@/stores/perfumeStore'
import { NoteFamily, Gender } from '@/types/perfume'

describe('PerfumeStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('Initial State', () => {
    it('應該有正確的初始狀態', () => {
      const store = usePerfumeStore()
      expect(store.perfumes).toEqual([])
      expect(store.searchKeyword).toBe('')
      expect(store.selectedBrandIds).toEqual([])
      expect(store.selectedNoteFamilies).toEqual([])
      expect(store.selectedGenders).toEqual([])
      expect(store.currentPage).toBe(1)
      expect(store.loading).toBe(false)
      expect(store.error).toBeNull()
    })
  })

  describe('Search and Filters', () => {
    it('應該能設定搜尋關鍵字', () => {
      const store = usePerfumeStore()
      store.setSearchKeyword('Chanel')
      expect(store.searchKeyword).toBe('Chanel')
    })

    it('應該能切換品牌篩選', () => {
      const store = usePerfumeStore()
      store.toggleBrand('chanel')
      expect(store.selectedBrandIds).toContain('chanel')
      
      store.toggleBrand('chanel')
      expect(store.selectedBrandIds).not.toContain('chanel')
    })

    it('應該能切換香調篩選', () => {
      const store = usePerfumeStore()
      store.toggleNoteFamily(NoteFamily.FLORAL)
      expect(store.selectedNoteFamilies).toContain(NoteFamily.FLORAL)
      
      store.toggleNoteFamily(NoteFamily.FLORAL)
      expect(store.selectedNoteFamilies).not.toContain(NoteFamily.FLORAL)
    })

    it('應該能切換性別篩選', () => {
      const store = usePerfumeStore()
      store.toggleGender(Gender.FEMALE)
      expect(store.selectedGenders).toContain(Gender.FEMALE)
      
      store.toggleGender(Gender.FEMALE)
      expect(store.selectedGenders).not.toContain(Gender.FEMALE)
    })

    it('應該能清除所有篩選', () => {
      const store = usePerfumeStore()
      store.toggleBrand('chanel')
      store.toggleNoteFamily(NoteFamily.FLORAL)
      store.toggleGender(Gender.FEMALE)
      
      store.clearFilters()
      
      expect(store.selectedBrandIds).toEqual([])
      expect(store.selectedNoteFamilies).toEqual([])
      expect(store.selectedGenders).toEqual([])
    })

    it('hasFilters 應該正確反映篩選狀態', () => {
      const store = usePerfumeStore()
      expect(store.hasFilters).toBe(false)
      
      store.toggleBrand('chanel')
      expect(store.hasFilters).toBe(true)
    })
  })

  describe('Pagination', () => {
    it('應該能設定頁碼', () => {
      const store = usePerfumeStore()
      store.totalResults = 100
      store.pageSize = 20
      
      store.setPage(2)
      expect(store.currentPage).toBe(2)
    })

    it('應該能前往下一頁', () => {
      const store = usePerfumeStore()
      store.totalResults = 100
      store.pageSize = 20
      
      store.nextPage()
      expect(store.currentPage).toBe(2)
    })

    it('應該能前往上一頁', () => {
      const store = usePerfumeStore()
      store.currentPage = 2
      
      store.previousPage()
      expect(store.currentPage).toBe(1)
    })

    it('不應該前往超過總頁數的頁碼', () => {
      const store = usePerfumeStore()
      store.totalResults = 40
      store.pageSize = 20
      store.currentPage = 2
      
      store.nextPage()
      expect(store.currentPage).toBe(2)
    })

    it('不應該前往小於 1 的頁碼', () => {
      const store = usePerfumeStore()
      store.currentPage = 1
      
      store.previousPage()
      expect(store.currentPage).toBe(1)
    })

    it('應該正確計算總頁數', () => {
      const store = usePerfumeStore()
      store.totalResults = 95
      store.pageSize = 20
      
      expect(store.totalPages).toBe(5)
    })
  })

  describe('API Actions', () => {
    it('應該能載入所有香水', async () => {
      const store = usePerfumeStore()
      await store.loadAllPerfumes()
      
      expect(store.perfumes.length).toBeGreaterThan(0)
      expect(store.loading).toBe(false)
      expect(store.error).toBeNull()
    })

    it('應該能搜尋香水', async () => {
      const store = usePerfumeStore()
      store.setSearchKeyword('Chanel')
      await store.searchPerfumes()
      
      expect(store.perfumes.length).toBeGreaterThan(0)
      expect(store.loading).toBe(false)
    })

    it('應該能載入可用選項', async () => {
      const store = usePerfumeStore()
      await store.loadAvailableOptions()
      
      expect(store.availableBrands.length).toBeGreaterThan(0)
      expect(store.availableNoteFamilies.length).toBeGreaterThan(0)
    })
  })
})

