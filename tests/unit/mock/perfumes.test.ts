import { describe, it, expect } from 'vitest'
import {
  getAllPerfumes,
  getPerfumeById,
  getPerfumesByBrandIds,
  getPerfumesByNoteFamilies,
  getPerfumesByGender,
  searchPerfumes
} from '@/mock/perfumes'
import { NoteFamily, Gender } from '@/types/perfume'

describe('Perfume Mock Data', () => {
  describe('getAllPerfumes', () => {
    it('應該返回所有香水', () => {
      const perfumes = getAllPerfumes()
      expect(perfumes).toBeDefined()
      expect(perfumes.length).toBeGreaterThan(0)
    })

    it('應該至少有 50 款香水', () => {
      const perfumes = getAllPerfumes()
      expect(perfumes.length).toBeGreaterThanOrEqual(50)
    })

    it('每款香水都應該有完整的資料結構', () => {
      const perfumes = getAllPerfumes()
      perfumes.forEach(perfume => {
        expect(perfume.id).toBeTruthy()
        expect(perfume.name).toBeTruthy()
        expect(perfume.brand).toBeDefined()
        expect(perfume.brand.id).toBeTruthy()
        expect(perfume.brand.name).toBeTruthy()
        expect(perfume.gender).toBeTruthy()
        expect(perfume.concentration).toBeTruthy()
        expect(perfume.notes).toBeDefined()
        expect(perfume.notes.length).toBeGreaterThan(0)
        expect(perfume.description).toBeTruthy()
        expect(perfume.image).toBeTruthy()
      })
    })
  })

  describe('getPerfumeById', () => {
    it('應該根據 ID 返回正確的香水', () => {
      const perfume = getPerfumeById('chanel-no5')
      expect(perfume).toBeDefined()
      expect(perfume?.id).toBe('chanel-no5')
      expect(perfume?.name).toBe('No. 5')
    })

    it('不存在的 ID 應該返回 undefined', () => {
      const perfume = getPerfumeById('non-existent-id')
      expect(perfume).toBeUndefined()
    })
  })

  describe('getPerfumesByBrandIds', () => {
    it('應該根據品牌 ID 篩選香水', () => {
      const perfumes = getPerfumesByBrandIds(['chanel'])
      expect(perfumes.length).toBeGreaterThan(0)
      perfumes.forEach(perfume => {
        expect(perfume.brand.id).toBe('chanel')
      })
    })

    it('空陣列應該返回所有香水', () => {
      const allPerfumes = getAllPerfumes()
      const perfumes = getPerfumesByBrandIds([])
      expect(perfumes.length).toBe(allPerfumes.length)
    })

    it('應該支援多個品牌篩選', () => {
      const perfumes = getPerfumesByBrandIds(['chanel', 'dior'])
      expect(perfumes.length).toBeGreaterThan(0)
      perfumes.forEach(perfume => {
        expect(['chanel', 'dior']).toContain(perfume.brand.id)
      })
    })
  })

  describe('getPerfumesByNoteFamilies', () => {
    it('應該根據香調家族篩選香水', () => {
      const perfumes = getPerfumesByNoteFamilies([NoteFamily.FLORAL])
      expect(perfumes.length).toBeGreaterThan(0)
      perfumes.forEach(perfume => {
        const hasFloral = perfume.notes.some(note => note.family === NoteFamily.FLORAL)
        expect(hasFloral).toBe(true)
      })
    })

    it('空陣列應該返回所有香水', () => {
      const allPerfumes = getAllPerfumes()
      const perfumes = getPerfumesByNoteFamilies([])
      expect(perfumes.length).toBe(allPerfumes.length)
    })

    it('應該支援多個香調家族篩選', () => {
      const perfumes = getPerfumesByNoteFamilies([NoteFamily.WOODY, NoteFamily.CITRUS])
      expect(perfumes.length).toBeGreaterThan(0)
      perfumes.forEach(perfume => {
        const hasTargetFamily = perfume.notes.some(note => 
          note.family === NoteFamily.WOODY || note.family === NoteFamily.CITRUS
        )
        expect(hasTargetFamily).toBe(true)
      })
    })
  })

  describe('getPerfumesByGender', () => {
    it('應該根據性別篩選香水（包含 UNISEX）', () => {
      const perfumes = getPerfumesByGender(Gender.FEMALE)
      expect(perfumes.length).toBeGreaterThan(0)
      perfumes.forEach(perfume => {
        expect([Gender.FEMALE, Gender.UNISEX]).toContain(perfume.gender)
      })
    })

    it('男性香水應該包含 MALE 和 UNISEX', () => {
      const perfumes = getPerfumesByGender(Gender.MALE)
      expect(perfumes.length).toBeGreaterThan(0)
      perfumes.forEach(perfume => {
        expect([Gender.MALE, Gender.UNISEX]).toContain(perfume.gender)
      })
    })
  })

  describe('searchPerfumes', () => {
    it('應該根據名稱搜尋香水', () => {
      const perfumes = searchPerfumes('No. 5')
      expect(perfumes.length).toBeGreaterThan(0)
      expect(perfumes.some(p => p.name.includes('No. 5'))).toBe(true)
    })

    it('應該根據品牌搜尋香水', () => {
      const perfumes = searchPerfumes('Chanel')
      expect(perfumes.length).toBeGreaterThan(0)
      perfumes.forEach(perfume => {
        expect(perfume.brand.name.toLowerCase()).toContain('chanel')
      })
    })

    it('搜尋應該不區分大小寫', () => {
      const perfumesLower = searchPerfumes('chanel')
      const perfumesUpper = searchPerfumes('CHANEL')
      expect(perfumesLower.length).toBe(perfumesUpper.length)
    })

    it('空字串應該返回所有香水', () => {
      const allPerfumes = getAllPerfumes()
      const perfumes = searchPerfumes('')
      expect(perfumes.length).toBe(allPerfumes.length)
    })

    it('不存在的關鍵字應該返回空陣列', () => {
      const perfumes = searchPerfumes('xyz123nonexistent')
      expect(perfumes.length).toBe(0)
    })
  })
})

