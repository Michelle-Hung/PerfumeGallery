import type { Perfume, FilterOptions, SearchResult } from '../types/perfume'
import { NoteFamily } from '../types/perfume'
import {
  getAllPerfumes,
  getPerfumeById,
  searchPerfumes as searchPerfumesFromMock
} from '../mock/perfumes'

/**
 * 香水服務層
 * 提供資料獲取與篩選的統一介面
 * 當前使用模擬資料，未來可以替換為真實 API 調用
 */

/**
 * 獲取所有香水
 */
export async function fetchPerfumes(): Promise<Perfume[]> {
  // 模擬 API 延遲
  await delay(100)
  return getAllPerfumes()
}

/**
 * 根據 ID 獲取單一香水
 */
export async function fetchPerfumeById(id: string): Promise<Perfume | null> {
  await delay(50)
  const perfume = getPerfumeById(id)
  return perfume || null
}

/**
 * 搜尋香水
 * @param keyword 搜尋關鍵字（名稱、品牌）
 * @param filters 篩選條件
 * @param page 頁碼（從 1 開始）
 * @param pageSize 每頁數量
 */
export async function searchPerfumes(
  keyword: string = '',
  filters: FilterOptions = {
    brandIds: [],
    noteFamilies: [],
    genders: []
  },
  page: number = 1,
  pageSize: number = 20
): Promise<SearchResult> {
  await delay(200)

  // 1. 先根據關鍵字搜尋
  let results = keyword.trim() 
    ? searchPerfumesFromMock(keyword) 
    : getAllPerfumes()

  // 2. 應用品牌篩選
  if (filters.brandIds && filters.brandIds.length > 0) {
    results = results.filter(p => filters.brandIds.includes(p.brand.id))
  }

  // 3. 應用香調篩選
  if (filters.noteFamilies && filters.noteFamilies.length > 0) {
    results = results.filter(p =>
      p.notes.some(note => filters.noteFamilies.includes(note.family))
    )
  }

  // 4. 應用性別篩選
  if (filters.genders && filters.genders.length > 0) {
    results = results.filter(p => filters.genders.includes(p.gender))
  }

  // 5. 應用價格範圍篩選
  if (filters.priceRange) {
    const { min, max } = filters.priceRange
    results = results.filter(p => {
      if (!p.price) return false
      return p.price >= min && p.price <= max
    })
  }

  // 6. 分頁
  const total = results.length
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const paginatedResults = results.slice(start, end)

  return {
    perfumes: paginatedResults,
    total,
    page,
    pageSize
  }
}

/**
 * 獲取所有可用的香調家族
 */
export async function getAvailableNoteFamilies(): Promise<NoteFamily[]> {
  await delay(50)
  return Object.values(NoteFamily)
}

/**
 * 獲取所有品牌
 */
export async function getAvailableBrands(): Promise<Array<{ id: string; name: string }>> {
  await delay(50)
  const perfumes = getAllPerfumes()
  const brandMap = new Map<string, string>()
  
  perfumes.forEach(p => {
    if (!brandMap.has(p.brand.id)) {
      brandMap.set(p.brand.id, p.brand.name)
    }
  })

  return Array.from(brandMap.entries()).map(([id, name]) => ({ id, name }))
}

/**
 * 獲取價格範圍
 */
export async function getPriceRange(): Promise<{ min: number; max: number }> {
  await delay(50)
  const perfumes = getAllPerfumes()
  const prices = perfumes.filter(p => p.price).map(p => p.price!)
  
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  }
}

/**
 * 獲取熱門香水（根據評論數量）
 */
export async function getPopularPerfumes(limit: number = 10): Promise<Perfume[]> {
  await delay(100)
  const perfumes = getAllPerfumes()
  return perfumes
    .filter(p => p.reviewCount)
    .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
    .slice(0, limit)
}

/**
 * 獲取高評分香水
 */
export async function getTopRatedPerfumes(limit: number = 10): Promise<Perfume[]> {
  await delay(100)
  const perfumes = getAllPerfumes()
  return perfumes
    .filter(p => p.rating)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit)
}

/**
 * 模擬延遲（用於模擬網路請求）
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

