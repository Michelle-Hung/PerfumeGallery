/**
 * 香調類型（前調、中調、後調）
 */
export enum NoteType {
  TOP = 'top',
  MIDDLE = 'middle',
  BASE = 'base'
}

/**
 * 香調家族分類
 */
export enum NoteFamily {
  FLORAL = 'floral',          // 花香
  WOODY = 'woody',            // 木質
  ORIENTAL = 'oriental',      // 東方
  FRESH = 'fresh',            // 清新
  FRUITY = 'fruity',          // 果香
  CITRUS = 'citrus',          // 柑橘
  SPICY = 'spicy',            // 辛香
  AQUATIC = 'aquatic',        // 水生
  GOURMAND = 'gourmand',      // 美食
  GREEN = 'green',            // 綠葉
  LEATHER = 'leather',        // 皮革
  AMBER = 'amber'             // 琥珀
}

/**
 * 性別分類
 */
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  UNISEX = 'unisex'
}

/**
 * 香水濃度
 */
export enum Concentration {
  PARFUM = 'parfum',                    // 香精 15-40%
  EAU_DE_PARFUM = 'eau_de_parfum',     // 淡香精 10-20%
  EAU_DE_TOILETTE = 'eau_de_toilette', // 淡香水 5-15%
  EAU_DE_COLOGNE = 'eau_de_cologne',   // 古龍水 2-5%
  EAU_FRAICHE = 'eau_fraiche'          // 清淡香水 1-3%
}

/**
 * 香調介面
 */
export interface Note {
  name: string;           // 香調名稱
  type: NoteType;         // 香調類型（前/中/後）
  family: NoteFamily;     // 香調家族
}

/**
 * 品牌介面
 */
export interface Brand {
  id: string;
  name: string;
  country: string;        // 國家
  description?: string;   // 品牌描述
  logo?: string;          // 品牌 logo URL
}

/**
 * 香水介面
 */
export interface Perfume {
  id: string;
  name: string;                    // 香水名稱
  brand: Brand;                    // 品牌
  year?: number;                   // 發行年份
  gender: Gender;                  // 性別分類
  concentration: Concentration;    // 濃度
  notes: Note[];                   // 香調列表
  description: string;             // 描述
  image: string;                   // 圖片 URL
  price?: number;                  // 價格（選填）
  rating?: number;                 // 評分（0-5）
  reviewCount?: number;            // 評論數量
}

/**
 * 使用者評論介面
 */
export interface Review {
  id: string;
  perfumeId: string;
  userName: string;
  rating: number;          // 評分 1-5
  comment: string;         // 評論內容
  createdAt: string;       // 建立時間
}

/**
 * 篩選條件介面
 */
export interface FilterOptions {
  brandIds: string[];
  noteFamilies: NoteFamily[];
  genders: Gender[];
  priceRange?: {
    min: number;
    max: number;
  };
}

/**
 * 搜尋結果介面
 */
export interface SearchResult {
  perfumes: Perfume[];
  total: number;
  page: number;
  pageSize: number;
}

