import type { Brand } from '../types/perfume'

/**
 * 品牌資料
 */
export const brands: Brand[] = [
  {
    id: 'chanel',
    name: 'Chanel',
    country: 'France',
    description: '法國經典奢華品牌，以優雅與時尚著稱'
  },
  {
    id: 'dior',
    name: 'Dior',
    country: 'France',
    description: '法國頂級時裝品牌，香水系列備受推崇'
  },
  {
    id: 'tom-ford',
    name: 'Tom Ford',
    country: 'USA',
    description: '美國奢華品牌，以大膽創新的香氛聞名'
  },
  {
    id: 'jo-malone',
    name: 'Jo Malone London',
    country: 'UK',
    description: '英國香氛品牌，以清新優雅的香調著稱'
  },
  {
    id: 'hermes',
    name: 'Hermès',
    country: 'France',
    description: '法國頂級奢侈品牌，香水作品精緻優雅'
  },
  {
    id: 'ysl',
    name: 'Yves Saint Laurent',
    country: 'France',
    description: '法國時尚品牌，香水系列經典永恆'
  },
  {
    id: 'gucci',
    name: 'Gucci',
    country: 'Italy',
    description: '義大利奢華品牌，香水風格多元時尚'
  },
  {
    id: 'versace',
    name: 'Versace',
    country: 'Italy',
    description: '義大利時尚品牌，香水充滿魅力與活力'
  },
  {
    id: 'bulgari',
    name: 'Bulgari',
    country: 'Italy',
    description: '義大利珠寶品牌，香水系列精緻奢華'
  },
  {
    id: 'armani',
    name: 'Giorgio Armani',
    country: 'Italy',
    description: '義大利時裝品牌，香水優雅經典'
  },
  {
    id: 'burberry',
    name: 'Burberry',
    country: 'UK',
    description: '英國經典品牌，香水展現英倫風情'
  },
  {
    id: 'creed',
    name: 'Creed',
    country: 'France',
    description: '法國沙龍香水品牌，以手工調製聞名'
  },
  {
    id: 'diptyque',
    name: 'Diptyque',
    country: 'France',
    description: '法國小眾香水品牌，以藝術氣息著稱'
  },
  {
    id: 'byredo',
    name: 'Byredo',
    country: 'Sweden',
    description: '瑞典小眾香水品牌，極簡主義風格'
  },
  {
    id: 'le-labo',
    name: 'Le Labo',
    country: 'USA',
    description: '美國小眾香水品牌，手工調製新鮮香水'
  },
  {
    id: 'maison-margiela',
    name: 'Maison Margiela',
    country: 'France',
    description: '法國時裝品牌，香水系列概念獨特'
  },
  {
    id: 'lancome',
    name: 'Lancôme',
    country: 'France',
    description: '法國美妝品牌，香水優雅浪漫'
  },
  {
    id: 'estee-lauder',
    name: 'Estée Lauder',
    country: 'USA',
    description: '美國美妝品牌，香水經典永恆'
  },
  {
    id: 'marc-jacobs',
    name: 'Marc Jacobs',
    country: 'USA',
    description: '美國時裝品牌，香水年輕時尚'
  },
  {
    id: 'prada',
    name: 'Prada',
    country: 'Italy',
    description: '義大利時尚品牌，香水現代優雅'
  },
  {
    id: 'calvin-klein',
    name: 'Calvin Klein',
    country: 'USA',
    description: '美國時尚品牌，香水簡約現代'
  },
  {
    id: 'givenchy',
    name: 'Givenchy',
    country: 'France',
    description: '法國時尚品牌，香水優雅迷人'
  }
]

/**
 * 根據 ID 獲取品牌
 */
export function getBrandById(id: string): Brand | undefined {
  return brands.find(brand => brand.id === id)
}

/**
 * 根據名稱搜尋品牌
 */
export function searchBrands(keyword: string): Brand[] {
  const lowerKeyword = keyword.toLowerCase()
  return brands.filter(brand => 
    brand.name.toLowerCase().includes(lowerKeyword)
  )
}

