import { describe, it, expect } from 'vitest'
import {
  fetchPerfumes,
  fetchPerfumeById,
  searchPerfumes,
  getAvailableNoteFamilies,
  getAvailableBrands,
  getPriceRange,
  getPopularPerfumes,
  getTopRatedPerfumes
} from '@/services/perfumeService'
import { NoteFamily, Gender } from '@/types/perfume'

describe('PerfumeService', () => {
  describe('fetchPerfumes', () => {
    it('應該返回所有香水', async () => {
      const perfumes = await fetchPerfumes()
      expect(perfumes).toBeDefined()
      expect(perfumes.length).toBeGreaterThan(0)
    })
  })

  describe('fetchPerfumeById', () => {
    it('應該根據 ID 返回香水', async () => {
      const perfume = await fetchPerfumeById('chanel-no5')
      expect(perfume).toBeDefined()
      expect(perfume?.id).toBe('chanel-no5')
    })

    it('不存在的 ID 應該返回 null', async () => {
      const perfume = await fetchPerfumeById('non-existent')
      expect(perfume).toBeNull()
    })
  })

  describe('searchPerfumes', () => {
    it('應該返回分頁結果', async () => {
      const result = await searchPerfumes('', {
        brandIds: [],
        noteFamilies: [],
        genders: []
      }, 1, 10)
      
      expect(result).toBeDefined()
      expect(result.perfumes).toBeDefined()
      expect(result.total).toBeGreaterThan(0)
      expect(result.page).toBe(1)
      expect(result.pageSize).toBe(10)
    })

    it('應該根據關鍵字搜尋', async () => {
      const result = await searchPerfumes('Chanel')
      expect(result.perfumes.length).toBeGreaterThan(0)
      result.perfumes.forEach(p => {
        expect(
          p.name.toLowerCase().includes('chanel') ||
          p.brand.name.toLowerCase().includes('chanel')
        ).toBe(true)
      })
    })

    it('應該根據品牌篩選', async () => {
      const result = await searchPerfumes('', {
        brandIds: ['chanel'],
        noteFamilies: [],
        genders: []
      })
      expect(result.perfumes.length).toBeGreaterThan(0)
      result.perfumes.forEach(p => {
        expect(p.brand.id).toBe('chanel')
      })
    })

    it('應該根據香調篩選', async () => {
      const result = await searchPerfumes('', {
        brandIds: [],
        noteFamilies: [NoteFamily.FLORAL],
        genders: []
      })
      expect(result.perfumes.length).toBeGreaterThan(0)
      result.perfumes.forEach(p => {
        const hasFloral = p.notes.some(note => note.family === NoteFamily.FLORAL)
        expect(hasFloral).toBe(true)
      })
    })

    it('應該根據性別篩選', async () => {
      const result = await searchPerfumes('', {
        brandIds: [],
        noteFamilies: [],
        genders: [Gender.FEMALE]
      })
      expect(result.perfumes.length).toBeGreaterThan(0)
      result.perfumes.forEach(p => {
        expect([Gender.FEMALE, Gender.UNISEX]).toContain(p.gender)
      })
    })

    it('應該支援分頁', async () => {
      const page1 = await searchPerfumes('', {
        brandIds: [],
        noteFamilies: [],
        genders: []
      }, 1, 5)
      const page2 = await searchPerfumes('', {
        brandIds: [],
        noteFamilies: [],
        genders: []
      }, 2, 5)

      expect(page1.perfumes.length).toBe(5)
      expect(page2.perfumes.length).toBeGreaterThan(0)
      expect(page1.perfumes[0].id).not.toBe(page2.perfumes[0].id)
    })

    it('應該組合多個篩選條件', async () => {
      const result = await searchPerfumes('', {
        brandIds: ['chanel', 'dior'],
        noteFamilies: [NoteFamily.FLORAL],
        genders: [Gender.FEMALE]
      })

      result.perfumes.forEach(p => {
        expect(['chanel', 'dior']).toContain(p.brand.id)
        expect(p.notes.some(n => n.family === NoteFamily.FLORAL)).toBe(true)
        expect([Gender.FEMALE, Gender.UNISEX]).toContain(p.gender)
      })
    })
  })

  describe('getAvailableNoteFamilies', () => {
    it('應該返回所有香調家族', async () => {
      const families = await getAvailableNoteFamilies()
      expect(families).toBeDefined()
      expect(families.length).toBeGreaterThan(0)
      expect(families).toContain(NoteFamily.FLORAL)
      expect(families).toContain(NoteFamily.WOODY)
    })
  })

  describe('getAvailableBrands', () => {
    it('應該返回所有品牌', async () => {
      const brands = await getAvailableBrands()
      expect(brands).toBeDefined()
      expect(brands.length).toBeGreaterThan(0)
      brands.forEach(brand => {
        expect(brand.id).toBeTruthy()
        expect(brand.name).toBeTruthy()
      })
    })

    it('品牌不應該重複', async () => {
      const brands = await getAvailableBrands()
      const ids = brands.map(b => b.id)
      const uniqueIds = [...new Set(ids)]
      expect(ids.length).toBe(uniqueIds.length)
    })
  })

  describe('getPriceRange', () => {
    it('應該返回價格範圍', async () => {
      const range = await getPriceRange()
      expect(range).toBeDefined()
      expect(range.min).toBeGreaterThan(0)
      expect(range.max).toBeGreaterThan(range.min)
    })
  })

  describe('getPopularPerfumes', () => {
    it('應該返回熱門香水', async () => {
      const perfumes = await getPopularPerfumes(5)
      expect(perfumes).toBeDefined()
      expect(perfumes.length).toBeLessThanOrEqual(5)
      
      // 檢查是否按評論數量排序
      for (let i = 1; i < perfumes.length; i++) {
        expect(perfumes[i - 1].reviewCount).toBeGreaterThanOrEqual(perfumes[i].reviewCount || 0)
      }
    })
  })

  describe('getTopRatedPerfumes', () => {
    it('應該返回高評分香水', async () => {
      const perfumes = await getTopRatedPerfumes(5)
      expect(perfumes).toBeDefined()
      expect(perfumes.length).toBeLessThanOrEqual(5)
      
      // 檢查是否按評分排序
      for (let i = 1; i < perfumes.length; i++) {
        expect(perfumes[i - 1].rating).toBeGreaterThanOrEqual(perfumes[i].rating || 0)
      }
    })
  })
})

