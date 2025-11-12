import type { Perfume } from '../types/perfume'
import { NoteType, NoteFamily, Gender, Concentration } from '../types/perfume'
import { getBrandById } from './brands'

/**
 * 模擬香水資料 - 100+ 款知名香水
 */
export const perfumes: Perfume[] = [
  // Chanel 香水系列
  {
    id: 'chanel-no5',
    name: 'No. 5',
    brand: getBrandById('chanel')!,
    year: 1921,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '香檸檬', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '檸檬', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '橙花', type: NoteType.TOP, family: NoteFamily.FLORAL },
      { name: '玫瑰', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '茉莉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '鈴蘭', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '檀香木', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '香草', type: NoteType.BASE, family: NoteFamily.GOURMAND },
      { name: '琥珀', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '經典永恆的女性香水，優雅而神秘，散發著法式浪漫的氣息。',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
    price: 4200,
    rating: 4.8,
    reviewCount: 2567
  },
  {
    id: 'chanel-coco-mademoiselle',
    name: 'Coco Mademoiselle',
    brand: getBrandById('chanel')!,
    year: 2001,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '柑橘', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '葡萄柚', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '玫瑰', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '茉莉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '荔枝', type: NoteType.MIDDLE, family: NoteFamily.FRUITY },
      { name: '廣藿香', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '香草', type: NoteType.BASE, family: NoteFamily.GOURMAND },
      { name: '白麝香', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '年輕活力的現代女性香水，清新中帶著東方韻味。',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
    price: 3800,
    rating: 4.7,
    reviewCount: 1890
  },
  {
    id: 'chanel-bleu',
    name: 'Bleu de Chanel',
    brand: getBrandById('chanel')!,
    year: 2010,
    gender: Gender.MALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '檸檬', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '薄荷', type: NoteType.TOP, family: NoteFamily.FRESH },
      { name: '粉紅胡椒', type: NoteType.TOP, family: NoteFamily.SPICY },
      { name: '生薑', type: NoteType.MIDDLE, family: NoteFamily.SPICY },
      { name: '茉莉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '琥珀', type: NoteType.BASE, family: NoteFamily.AMBER },
      { name: '雪松', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '檀香木', type: NoteType.BASE, family: NoteFamily.WOODY }
    ],
    description: '充滿魅力的男性香水，散發自信與優雅。',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400',
    price: 3600,
    rating: 4.6,
    reviewCount: 1543
  },
  {
    id: 'chanel-chance',
    name: 'Chance Eau Tendre',
    brand: getBrandById('chanel')!,
    year: 2010,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_TOILETTE,
    notes: [
      { name: '葡萄柚', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '柑橘', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '風信子', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '茉莉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '白麝香', type: NoteType.BASE, family: NoteFamily.AMBER },
      { name: '雪松', type: NoteType.BASE, family: NoteFamily.WOODY }
    ],
    description: '清新柔美的女性香水，充滿年輕活力。',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400',
    price: 3200,
    rating: 4.5,
    reviewCount: 987
  },

  // Dior 香水系列
  {
    id: 'dior-jadore',
    name: "J'adore",
    brand: getBrandById('dior')!,
    year: 1999,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '香檸檬', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '桃子', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '玫瑰', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '茉莉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '鈴蘭', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '黑莓', type: NoteType.MIDDLE, family: NoteFamily.FRUITY },
      { name: '雪松', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '白麝香', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '感性優雅的女性香水，如金色陽光般璀璨。',
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400',
    price: 3900,
    rating: 4.7,
    reviewCount: 2134
  },
  {
    id: 'dior-sauvage',
    name: 'Sauvage',
    brand: getBrandById('dior')!,
    year: 2015,
    gender: Gender.MALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '香檸檬', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '胡椒', type: NoteType.TOP, family: NoteFamily.SPICY },
      { name: '薰衣草', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '天竺葵', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '雪松', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '龍涎香', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '野性狂放的男性香水，散發原始魅力。',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400',
    price: 3500,
    rating: 4.8,
    reviewCount: 3421
  },
  {
    id: 'dior-miss-dior',
    name: 'Miss Dior',
    brand: getBrandById('dior')!,
    year: 2017,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '血橙', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '玫瑰', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '牡丹', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '鳶尾花', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '白麝香', type: NoteType.BASE, family: NoteFamily.AMBER },
      { name: '廣藿香', type: NoteType.BASE, family: NoteFamily.WOODY }
    ],
    description: '充滿女性魅力的優雅香水，浪漫而迷人。',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
    price: 3700,
    rating: 4.6,
    reviewCount: 1765
  },
  {
    id: 'dior-homme-intense',
    name: 'Dior Homme Intense',
    brand: getBrandById('dior')!,
    year: 2011,
    gender: Gender.MALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '薰衣草', type: NoteType.TOP, family: NoteFamily.FLORAL },
      { name: '鳶尾花', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '梨子', type: NoteType.MIDDLE, family: NoteFamily.FRUITY },
      { name: '雪松', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '香草', type: NoteType.BASE, family: NoteFamily.GOURMAND }
    ],
    description: '優雅紳士的男性香水，散發知性魅力。',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
    price: 3800,
    rating: 4.7,
    reviewCount: 1234
  },

  // Tom Ford 香水系列
  {
    id: 'tom-ford-black-orchid',
    name: 'Black Orchid',
    brand: getBrandById('tom-ford')!,
    year: 2006,
    gender: Gender.UNISEX,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '黑松露', type: NoteType.TOP, family: NoteFamily.SPICY },
      { name: '香檸檬', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '黑蘭花', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '梅子', type: NoteType.MIDDLE, family: NoteFamily.FRUITY },
      { name: '廣藿香', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '香草', type: NoteType.BASE, family: NoteFamily.GOURMAND },
      { name: '焚香', type: NoteType.BASE, family: NoteFamily.ORIENTAL }
    ],
    description: '神秘奢華的中性香水，散發暗黑魅力。',
    image: 'https://images.unsplash.com/photo-1595425970154-c14c3f2f76c7?w=400',
    price: 4800,
    rating: 4.6,
    reviewCount: 1543
  },
  {
    id: 'tom-ford-tobacco-vanille',
    name: 'Tobacco Vanille',
    brand: getBrandById('tom-ford')!,
    year: 2007,
    gender: Gender.UNISEX,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '煙草葉', type: NoteType.TOP, family: NoteFamily.ORIENTAL },
      { name: '香料', type: NoteType.TOP, family: NoteFamily.SPICY },
      { name: '可可', type: NoteType.MIDDLE, family: NoteFamily.GOURMAND },
      { name: '乾果', type: NoteType.MIDDLE, family: NoteFamily.GOURMAND },
      { name: '香草', type: NoteType.BASE, family: NoteFamily.GOURMAND },
      { name: '零陵香豆', type: NoteType.BASE, family: NoteFamily.GOURMAND }
    ],
    description: '溫暖甜美的中性香水，帶有煙草與香草的奢華氣息。',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400',
    price: 5200,
    rating: 4.8,
    reviewCount: 2098
  },
  {
    id: 'tom-ford-oud-wood',
    name: 'Oud Wood',
    brand: getBrandById('tom-ford')!,
    year: 2007,
    gender: Gender.UNISEX,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '巴西紫檀', type: NoteType.TOP, family: NoteFamily.WOODY },
      { name: '小荳蔻', type: NoteType.TOP, family: NoteFamily.SPICY },
      { name: '沉香木', type: NoteType.MIDDLE, family: NoteFamily.WOODY },
      { name: '檀香木', type: NoteType.MIDDLE, family: NoteFamily.WOODY },
      { name: '香根草', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '琥珀', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '珍稀沉香木的奢華香氛，溫暖而神秘。',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
    price: 5500,
    rating: 4.7,
    reviewCount: 1678
  },
  {
    id: 'tom-ford-lost-cherry',
    name: 'Lost Cherry',
    brand: getBrandById('tom-ford')!,
    year: 2018,
    gender: Gender.UNISEX,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '櫻桃', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '苦杏仁', type: NoteType.TOP, family: NoteFamily.GOURMAND },
      { name: '玫瑰', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '茉莉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '零陵香豆', type: NoteType.BASE, family: NoteFamily.GOURMAND },
      { name: '秘魯香脂', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '性感迷人的櫻桃香氛，甜美而誘惑。',
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400',
    price: 5800,
    rating: 4.9,
    reviewCount: 2345
  },

  // Jo Malone 香水系列
  {
    id: 'jo-malone-english-pear',
    name: 'English Pear & Freesia',
    brand: getBrandById('jo-malone')!,
    year: 2010,
    gender: Gender.UNISEX,
    concentration: Concentration.EAU_DE_COLOGNE,
    notes: [
      { name: '英國梨', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '甜瓜', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '小蒼蘭', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '玫瑰', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '廣藿香', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '琥珀', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '清新果香的英式風情，優雅而精緻。',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
    price: 3200,
    rating: 4.6,
    reviewCount: 1456
  },
  {
    id: 'jo-malone-wood-sage',
    name: 'Wood Sage & Sea Salt',
    brand: getBrandById('jo-malone')!,
    year: 2014,
    gender: Gender.UNISEX,
    concentration: Concentration.EAU_DE_COLOGNE,
    notes: [
      { name: '苦橙', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '海鹽', type: NoteType.MIDDLE, family: NoteFamily.AQUATIC },
      { name: '鼠尾草', type: NoteType.MIDDLE, family: NoteFamily.GREEN },
      { name: '紅藻', type: NoteType.BASE, family: NoteFamily.AQUATIC },
      { name: '麝香', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '海岸風情的清新香氛，自然而純淨。',
    image: 'https://images.unsplash.com/photo-1595425970154-c14c3f2f76c7?w=400',
    price: 3200,
    rating: 4.5,
    reviewCount: 1234
  },
  {
    id: 'jo-malone-lime-basil',
    name: 'Lime Basil & Mandarin',
    brand: getBrandById('jo-malone')!,
    year: 1999,
    gender: Gender.UNISEX,
    concentration: Concentration.EAU_DE_COLOGNE,
    notes: [
      { name: '萊姆', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '柑橘', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '羅勒', type: NoteType.MIDDLE, family: NoteFamily.GREEN },
      { name: '百里香', type: NoteType.MIDDLE, family: NoteFamily.GREEN },
      { name: '香根草', type: NoteType.BASE, family: NoteFamily.WOODY }
    ],
    description: 'Jo Malone 的經典代表作，清新活力的柑橘調。',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400',
    price: 3200,
    rating: 4.7,
    reviewCount: 1890
  },
  {
    id: 'jo-malone-peony-blush',
    name: 'Peony & Blush Suede',
    brand: getBrandById('jo-malone')!,
    year: 2013,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_COLOGNE,
    notes: [
      { name: '紅蘋果', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '牡丹', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '茉莉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '麝香', type: NoteType.BASE, family: NoteFamily.AMBER },
      { name: '麂皮', type: NoteType.BASE, family: NoteFamily.LEATHER }
    ],
    description: '柔美浪漫的牡丹花香，優雅迷人。',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
    price: 3200,
    rating: 4.6,
    reviewCount: 1567
  },

  // Hermès 香水系列
  {
    id: 'hermes-terre',
    name: "Terre d'Hermès",
    brand: getBrandById('hermes')!,
    year: 2006,
    gender: Gender.MALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '葡萄柚', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '柑橘', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '胡椒', type: NoteType.MIDDLE, family: NoteFamily.SPICY },
      { name: '天竺葵', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '雪松', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '香根草', type: NoteType.BASE, family: NoteFamily.WOODY }
    ],
    description: '大地的氣息，陽剛而優雅的男性香水。',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
    price: 3900,
    rating: 4.7,
    reviewCount: 1987
  },
  {
    id: 'hermes-jardin-nil',
    name: 'Un Jardin Sur Le Nil',
    brand: getBrandById('hermes')!,
    year: 2005,
    gender: Gender.UNISEX,
    concentration: Concentration.EAU_DE_TOILETTE,
    notes: [
      { name: '葡萄柚', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '青番茄', type: NoteType.TOP, family: NoteFamily.GREEN },
      { name: '蓮花', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '牡丹', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '雪松', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '麝香', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '尼羅河畔的花園，清新而神秘。',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400',
    price: 3500,
    rating: 4.5,
    reviewCount: 876
  },
  {
    id: 'hermes-twilly',
    name: "Twilly d'Hermès",
    brand: getBrandById('hermes')!,
    year: 2017,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '生薑', type: NoteType.TOP, family: NoteFamily.SPICY },
      { name: '香檸檬', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '晚香玉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '檀香木', type: NoteType.BASE, family: NoteFamily.WOODY }
    ],
    description: '年輕活力的女性香水，辛香與花香的完美結合。',
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400',
    price: 3600,
    rating: 4.6,
    reviewCount: 1123
  },

  // YSL 香水系列
  {
    id: 'ysl-black-opium',
    name: 'Black Opium',
    brand: getBrandById('ysl')!,
    year: 2014,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '黑咖啡', type: NoteType.TOP, family: NoteFamily.GOURMAND },
      { name: '粉紅胡椒', type: NoteType.TOP, family: NoteFamily.SPICY },
      { name: '白花', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '茉莉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '香草', type: NoteType.BASE, family: NoteFamily.GOURMAND },
      { name: '廣藿香', type: NoteType.BASE, family: NoteFamily.WOODY }
    ],
    description: '性感迷人的咖啡調香水，充滿搖滾魅力。',
    image: 'https://images.unsplash.com/photo-1595425970154-c14c3f2f76c7?w=400',
    price: 3400,
    rating: 4.7,
    reviewCount: 2345
  },
  {
    id: 'ysl-libre',
    name: 'Libre',
    brand: getBrandById('ysl')!,
    year: 2019,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '柑橘', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '薰衣草', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '橙花', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '香草', type: NoteType.BASE, family: NoteFamily.GOURMAND },
      { name: '麝香', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '自由灑脫的女性香水，散發現代優雅。',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
    price: 3500,
    rating: 4.6,
    reviewCount: 1678
  },
  {
    id: 'ysl-y',
    name: 'Y',
    brand: getBrandById('ysl')!,
    year: 2017,
    gender: Gender.MALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '蘋果', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '薑', type: NoteType.TOP, family: NoteFamily.SPICY },
      { name: '天竺葵', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '鼠尾草', type: NoteType.MIDDLE, family: NoteFamily.GREEN },
      { name: '雪松', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '龍涎香', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '充滿活力的男性香水，自信而時尚。',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
    price: 3300,
    rating: 4.5,
    reviewCount: 1234
  },

  // Gucci 香水系列
  {
    id: 'gucci-bloom',
    name: 'Bloom',
    brand: getBrandById('gucci')!,
    year: 2017,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '晚香玉', type: NoteType.TOP, family: NoteFamily.FLORAL },
      { name: '茉莉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '橙花', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '檀香木', type: NoteType.BASE, family: NoteFamily.WOODY }
    ],
    description: '盛開的花園，豐富而優雅的女性香水。',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400',
    price: 3400,
    rating: 4.6,
    reviewCount: 1567
  },
  {
    id: 'gucci-guilty',
    name: 'Guilty',
    brand: getBrandById('gucci')!,
    year: 2010,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_TOILETTE,
    notes: [
      { name: '粉紅胡椒', type: NoteType.TOP, family: NoteFamily.SPICY },
      { name: '柑橘', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '天竺葵', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '桃子', type: NoteType.MIDDLE, family: NoteFamily.FRUITY },
      { name: '琥珀', type: NoteType.BASE, family: NoteFamily.AMBER },
      { name: '廣藿香', type: NoteType.BASE, family: NoteFamily.WOODY }
    ],
    description: '性感迷人的香氛，散發誘惑力。',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400',
    price: 3100,
    rating: 4.5,
    reviewCount: 1345
  },
  {
    id: 'gucci-memoire',
    name: 'Mémoire d\'une Odeur',
    brand: getBrandById('gucci')!,
    year: 2019,
    gender: Gender.UNISEX,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '羅馬洋甘菊', type: NoteType.TOP, family: NoteFamily.FLORAL },
      { name: '苦杏仁', type: NoteType.TOP, family: NoteFamily.GOURMAND },
      { name: '茉莉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '麝香', type: NoteType.BASE, family: NoteFamily.AMBER },
      { name: '雪松', type: NoteType.BASE, family: NoteFamily.WOODY }
    ],
    description: '回憶的香氣，溫柔而神秘的中性香水。',
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400',
    price: 3600,
    rating: 4.4,
    reviewCount: 987
  },

  // Versace 香水系列
  {
    id: 'versace-eros',
    name: 'Eros',
    brand: getBrandById('versace')!,
    year: 2012,
    gender: Gender.MALE,
    concentration: Concentration.EAU_DE_TOILETTE,
    notes: [
      { name: '薄荷', type: NoteType.TOP, family: NoteFamily.FRESH },
      { name: '檸檬', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '蘋果', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '天竺葵', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '零陵香豆', type: NoteType.BASE, family: NoteFamily.GOURMAND },
      { name: '香草', type: NoteType.BASE, family: NoteFamily.GOURMAND }
    ],
    description: '充滿激情的男性香水，散發愛神的魅力。',
    image: 'https://images.unsplash.com/photo-1595425970154-c14c3f2f76c7?w=400',
    price: 2800,
    rating: 4.6,
    reviewCount: 2134
  },
  {
    id: 'versace-crystal-noir',
    name: 'Crystal Noir',
    brand: getBrandById('versace')!,
    year: 2004,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '生薑', type: NoteType.TOP, family: NoteFamily.SPICY },
      { name: '小荳蔻', type: NoteType.TOP, family: NoteFamily.SPICY },
      { name: '牡丹', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '椰子', type: NoteType.MIDDLE, family: NoteFamily.GOURMAND },
      { name: '檀香木', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '麝香', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '神秘性感的女性香水，如黑色水晶般耀眼。',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
    price: 3200,
    rating: 4.5,
    reviewCount: 1456
  },
  {
    id: 'versace-bright-crystal',
    name: 'Bright Crystal',
    brand: getBrandById('versace')!,
    year: 2006,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_TOILETTE,
    notes: [
      { name: '石榴', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '柚子', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '牡丹', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '蓮花', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '琥珀', type: NoteType.BASE, family: NoteFamily.AMBER },
      { name: '麝香', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '明亮清新的女性香水，如晨露般純淨。',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
    price: 2600,
    rating: 4.6,
    reviewCount: 1789
  },

  // Bulgari 香水系列
  {
    id: 'bulgari-omnia',
    name: 'Omnia Crystalline',
    brand: getBrandById('bulgari')!,
    year: 2005,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_TOILETTE,
    notes: [
      { name: '竹子', type: NoteType.TOP, family: NoteFamily.GREEN },
      { name: '日本梨', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '蓮花', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '茶葉', type: NoteType.MIDDLE, family: NoteFamily.GREEN },
      { name: '麝香', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '清透純淨的女性香水，如水晶般剔透。',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400',
    price: 3100,
    rating: 4.5,
    reviewCount: 1234
  },
  {
    id: 'bulgari-aqva',
    name: 'Aqva Pour Homme',
    brand: getBrandById('bulgari')!,
    year: 2005,
    gender: Gender.MALE,
    concentration: Concentration.EAU_DE_TOILETTE,
    notes: [
      { name: '柑橘', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '橙花', type: NoteType.TOP, family: NoteFamily.FLORAL },
      { name: '海藻', type: NoteType.MIDDLE, family: NoteFamily.AQUATIC },
      { name: '薰衣草', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '雪松', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '琥珀', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '清新水生調的男性香水，如海洋般深邃。',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400',
    price: 2900,
    rating: 4.4,
    reviewCount: 987
  },

  // Armani 香水系列
  {
    id: 'armani-acqua-di-gio',
    name: 'Acqua di Giò',
    brand: getBrandById('armani')!,
    year: 1996,
    gender: Gender.MALE,
    concentration: Concentration.EAU_DE_TOILETTE,
    notes: [
      { name: '檸檬', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '萊姆', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '海洋', type: NoteType.MIDDLE, family: NoteFamily.AQUATIC },
      { name: '茉莉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '雪松', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '麝香', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '經典清新的男性香水，如地中海微風般舒適。',
    image: 'https://images.unsplash.com/photo-1595425970154-c14c3f2f76c7?w=400',
    price: 2700,
    rating: 4.7,
    reviewCount: 3456
  },
  {
    id: 'armani-si',
    name: 'Sì',
    brand: getBrandById('armani')!,
    year: 2013,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '黑醋栗', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '小蒼蘭', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '玫瑰', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '香草', type: NoteType.BASE, family: NoteFamily.GOURMAND },
      { name: '廣藿香', type: NoteType.BASE, family: NoteFamily.WOODY }
    ],
    description: '優雅自信的女性香水，散發現代魅力。',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
    price: 3300,
    rating: 4.6,
    reviewCount: 1890
  },
  {
    id: 'armani-code',
    name: 'Code',
    brand: getBrandById('armani')!,
    year: 2004,
    gender: Gender.MALE,
    concentration: Concentration.EAU_DE_TOILETTE,
    notes: [
      { name: '檸檬', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '香檸檬', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '橄欖花', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '鳶尾根', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '零陵香豆', type: NoteType.BASE, family: NoteFamily.GOURMAND },
      { name: '皮革', type: NoteType.BASE, family: NoteFamily.LEATHER }
    ],
    description: '神秘誘人的男性香水，散發紳士魅力。',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
    price: 2900,
    rating: 4.5,
    reviewCount: 1567
  },

  // Burberry 香水系列
  {
    id: 'burberry-brit',
    name: 'Brit for Her',
    brand: getBrandById('burberry')!,
    year: 2003,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '萊姆', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '梨子', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '牡丹', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '白桃', type: NoteType.MIDDLE, family: NoteFamily.FRUITY },
      { name: '香草', type: NoteType.BASE, family: NoteFamily.GOURMAND },
      { name: '琥珀', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '甜美可愛的女性香水，充滿英倫風情。',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400',
    price: 2800,
    rating: 4.5,
    reviewCount: 1234
  },
  {
    id: 'burberry-her',
    name: 'Her',
    brand: getBrandById('burberry')!,
    year: 2018,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '紅莓', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '黑莓', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '茉莉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '紫羅蘭', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '麝香', type: NoteType.BASE, family: NoteFamily.AMBER },
      { name: '琥珀', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '充滿活力的女性香水，倫敦女孩的現代風格。',
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400',
    price: 3200,
    rating: 4.6,
    reviewCount: 1456
  },

  // Creed 香水系列
  {
    id: 'creed-aventus',
    name: 'Aventus',
    brand: getBrandById('creed')!,
    year: 2010,
    gender: Gender.MALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '鳳梨', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '黑醋栗', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '蘋果', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '玫瑰', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '樺木', type: NoteType.MIDDLE, family: NoteFamily.WOODY },
      { name: '廣藿香', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '香草', type: NoteType.BASE, family: NoteFamily.GOURMAND },
      { name: '麝香', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '傳奇的男性香水，散發成功與力量的氣息。',
    image: 'https://images.unsplash.com/photo-1595425970154-c14c3f2f76c7?w=400',
    price: 8500,
    rating: 4.9,
    reviewCount: 4567
  },
  {
    id: 'creed-silver-mountain',
    name: 'Silver Mountain Water',
    brand: getBrandById('creed')!,
    year: 1995,
    gender: Gender.UNISEX,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '香檸檬', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '柑橘', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '綠茶', type: NoteType.MIDDLE, family: NoteFamily.GREEN },
      { name: '黑醋栗', type: NoteType.MIDDLE, family: NoteFamily.FRUITY },
      { name: '麝香', type: NoteType.BASE, family: NoteFamily.AMBER },
      { name: '檀香木', type: NoteType.BASE, family: NoteFamily.WOODY }
    ],
    description: '清新純淨的中性香水，如高山泉水般清澈。',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400',
    price: 7800,
    rating: 4.7,
    reviewCount: 1678
  },

  // Diptyque 香水系列
  {
    id: 'diptyque-do-son',
    name: 'Do Son',
    brand: getBrandById('diptyque')!,
    year: 2005,
    gender: Gender.UNISEX,
    concentration: Concentration.EAU_DE_TOILETTE,
    notes: [
      { name: '粉紅胡椒', type: NoteType.TOP, family: NoteFamily.SPICY },
      { name: '晚香玉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '橙花', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '白麝香', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '優雅的晚香玉香氛，如越南海邊的夏日記憶。',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
    price: 4200,
    rating: 4.6,
    reviewCount: 987
  },
  {
    id: 'diptyque-tam-dao',
    name: 'Tam Dao',
    brand: getBrandById('diptyque')!,
    year: 2003,
    gender: Gender.UNISEX,
    concentration: Concentration.EAU_DE_TOILETTE,
    notes: [
      { name: '檀香木', type: NoteType.TOP, family: NoteFamily.WOODY },
      { name: '雪松', type: NoteType.MIDDLE, family: NoteFamily.WOODY },
      { name: '柏樹', type: NoteType.MIDDLE, family: NoteFamily.WOODY },
      { name: '麝香', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '溫暖的木質調香水，靈感來自印度支那森林。',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
    price: 4200,
    rating: 4.5,
    reviewCount: 876
  },

  // Byredo 香水系列
  {
    id: 'byredo-gypsy-water',
    name: 'Gypsy Water',
    brand: getBrandById('byredo')!,
    year: 2008,
    gender: Gender.UNISEX,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '檸檬', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '胡椒', type: NoteType.TOP, family: NoteFamily.SPICY },
      { name: '松樹', type: NoteType.MIDDLE, family: NoteFamily.WOODY },
      { name: '鳶尾', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '香草', type: NoteType.BASE, family: NoteFamily.GOURMAND },
      { name: '檀香木', type: NoteType.BASE, family: NoteFamily.WOODY }
    ],
    description: '自由奔放的香氛，如吉普賽人的浪漫之旅。',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400',
    price: 4800,
    rating: 4.7,
    reviewCount: 1456
  },
  {
    id: 'byredo-bal-dafrique',
    name: "Bal d'Afrique",
    brand: getBrandById('byredo')!,
    year: 2009,
    gender: Gender.UNISEX,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '檸檬', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '橙花', type: NoteType.TOP, family: NoteFamily.FLORAL },
      { name: '非洲萬壽菊', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '紫羅蘭', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '雪松', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '琥珀', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '充滿活力的香氛，靈感來自巴黎與非洲的文化碰撞。',
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400',
    price: 4800,
    rating: 4.6,
    reviewCount: 1234
  },

  // Le Labo 香水系列
  {
    id: 'le-labo-santal-33',
    name: 'Santal 33',
    brand: getBrandById('le-labo')!,
    year: 2011,
    gender: Gender.UNISEX,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '小荳蔻', type: NoteType.TOP, family: NoteFamily.SPICY },
      { name: '紫羅蘭', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '鳶尾', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '檀香木', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '雪松', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '皮革', type: NoteType.BASE, family: NoteFamily.LEATHER }
    ],
    description: '都市傳奇香氛，檀香與皮革的完美平衡。',
    image: 'https://images.unsplash.com/photo-1595425970154-c14c3f2f76c7?w=400',
    price: 6200,
    rating: 4.8,
    reviewCount: 2345
  },
  {
    id: 'le-labo-another-13',
    name: 'Another 13',
    brand: getBrandById('le-labo')!,
    year: 2010,
    gender: Gender.UNISEX,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '麝香', type: NoteType.TOP, family: NoteFamily.AMBER },
      { name: '苔蘚', type: NoteType.MIDDLE, family: NoteFamily.GREEN },
      { name: '茉莉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '龍涎香', type: NoteType.BASE, family: NoteFamily.AMBER },
      { name: '木質', type: NoteType.BASE, family: NoteFamily.WOODY }
    ],
    description: '神秘的麝香調香水，極簡而深邃。',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400',
    price: 6200,
    rating: 4.7,
    reviewCount: 1678
  },

  // Maison Margiela 香水系列
  {
    id: 'maison-margiela-replica-jazz-club',
    name: 'REPLICA Jazz Club',
    brand: getBrandById('maison-margiela')!,
    year: 2013,
    gender: Gender.UNISEX,
    concentration: Concentration.EAU_DE_TOILETTE,
    notes: [
      { name: '檸檬', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '粉紅胡椒', type: NoteType.TOP, family: NoteFamily.SPICY },
      { name: '朗姆酒', type: NoteType.MIDDLE, family: NoteFamily.GOURMAND },
      { name: '雪茄', type: NoteType.MIDDLE, family: NoteFamily.ORIENTAL },
      { name: '香草', type: NoteType.BASE, family: NoteFamily.GOURMAND },
      { name: '麝香', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '重現爵士酒吧的氛圍，溫暖而性感。',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
    price: 3800,
    rating: 4.7,
    reviewCount: 1567
  },
  {
    id: 'maison-margiela-replica-lazy-sunday',
    name: 'REPLICA Lazy Sunday Morning',
    brand: getBrandById('maison-margiela')!,
    year: 2010,
    gender: Gender.UNISEX,
    concentration: Concentration.EAU_DE_TOILETTE,
    notes: [
      { name: '梨子', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '柑橘', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '鳶尾', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '玫瑰', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '白麝香', type: NoteType.BASE, family: NoteFamily.AMBER },
      { name: '龍涎香', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '慵懶週日早晨的清新香氛，舒適而柔軟。',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
    price: 3800,
    rating: 4.5,
    reviewCount: 1123
  },

  // Lancôme 香水系列
  {
    id: 'lancome-la-vie-est-belle',
    name: 'La Vie Est Belle',
    brand: getBrandById('lancome')!,
    year: 2012,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '黑醋栗', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '梨子', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '鳶尾', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '茉莉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '廣藿香', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '香草', type: NoteType.BASE, family: NoteFamily.GOURMAND }
    ],
    description: '人生是美好的，甜美而優雅的女性香水。',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400',
    price: 3400,
    rating: 4.7,
    reviewCount: 2678
  },
  {
    id: 'lancome-tresor',
    name: 'Trésor',
    brand: getBrandById('lancome')!,
    year: 1990,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '杏桃', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '玫瑰', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '鈴蘭', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '鳶尾', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '檀香木', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '琥珀', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '經典浪漫的女性香水，如珍寶般珍貴。',
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400',
    price: 3200,
    rating: 4.6,
    reviewCount: 1890
  },

  // Estée Lauder 香水系列
  {
    id: 'estee-lauder-beautiful',
    name: 'Beautiful',
    brand: getBrandById('estee-lauder')!,
    year: 1985,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '玫瑰', type: NoteType.TOP, family: NoteFamily.FLORAL },
      { name: '百合', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '茉莉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '橙花', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '檀香木', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '香根草', type: NoteType.BASE, family: NoteFamily.WOODY }
    ],
    description: '經典優雅的花香香水，永恆美麗。',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
    price: 2900,
    rating: 4.5,
    reviewCount: 1456
  },
  {
    id: 'estee-lauder-bronze-goddess',
    name: 'Bronze Goddess',
    brand: getBrandById('estee-lauder')!,
    year: 2002,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '柑橘', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '椰子', type: NoteType.MIDDLE, family: NoteFamily.GOURMAND },
      { name: '橙花', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '香草', type: NoteType.BASE, family: NoteFamily.GOURMAND },
      { name: '琥珀', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '陽光沙灘的夏日香氛，充滿活力。',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
    price: 3100,
    rating: 4.6,
    reviewCount: 987
  },

  // Marc Jacobs 香水系列
  {
    id: 'marc-jacobs-daisy',
    name: 'Daisy',
    brand: getBrandById('marc-jacobs')!,
    year: 2007,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_TOILETTE,
    notes: [
      { name: '草莓', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '紫羅蘭葉', type: NoteType.TOP, family: NoteFamily.GREEN },
      { name: '茉莉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '紫羅蘭', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '白麝香', type: NoteType.BASE, family: NoteFamily.AMBER },
      { name: '香草', type: NoteType.BASE, family: NoteFamily.GOURMAND }
    ],
    description: '清新甜美的雛菊香氛，充滿年輕活力。',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400',
    price: 2800,
    rating: 4.6,
    reviewCount: 2134
  },
  {
    id: 'marc-jacobs-perfect',
    name: 'Perfect',
    brand: getBrandById('marc-jacobs')!,
    year: 2020,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '黃水仙', type: NoteType.TOP, family: NoteFamily.FLORAL },
      { name: '杏桃', type: NoteType.MIDDLE, family: NoteFamily.FRUITY },
      { name: '木蘭', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '雪松', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '麝香', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '完美自信的女性香水，散發樂觀魅力。',
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400',
    price: 3000,
    rating: 4.5,
    reviewCount: 1234
  },

  // Prada 香水系列
  {
    id: 'prada-candy',
    name: 'Candy',
    brand: getBrandById('prada')!,
    year: 2011,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '焦糖', type: NoteType.TOP, family: NoteFamily.GOURMAND },
      { name: '麝香', type: NoteType.MIDDLE, family: NoteFamily.AMBER },
      { name: '香草', type: NoteType.BASE, family: NoteFamily.GOURMAND },
      { name: '安息香', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '甜美誘人的女性香水，如糖果般迷人。',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
    price: 3300,
    rating: 4.5,
    reviewCount: 1567
  },
  {
    id: 'prada-lhomme',
    name: "L'Homme",
    brand: getBrandById('prada')!,
    year: 2016,
    gender: Gender.MALE,
    concentration: Concentration.EAU_DE_TOILETTE,
    notes: [
      { name: '橙花', type: NoteType.TOP, family: NoteFamily.FLORAL },
      { name: '鳶尾', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '雪松', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '琥珀', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '現代優雅的男性香水，簡約而精緻。',
    image: 'https://images.unsplash.com/photo-1595425970154-c14c3f2f76c7?w=400',
    price: 3100,
    rating: 4.6,
    reviewCount: 1345
  },

  // Calvin Klein 香水系列
  {
    id: 'calvin-klein-ck-one',
    name: 'CK One',
    brand: getBrandById('calvin-klein')!,
    year: 1994,
    gender: Gender.UNISEX,
    concentration: Concentration.EAU_DE_TOILETTE,
    notes: [
      { name: '檸檬', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '柑橘', type: NoteType.TOP, family: NoteFamily.CITRUS },
      { name: '茉莉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '紫羅蘭', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '麝香', type: NoteType.BASE, family: NoteFamily.AMBER },
      { name: '雪松', type: NoteType.BASE, family: NoteFamily.WOODY }
    ],
    description: '經典中性香水，清新而現代。',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400',
    price: 2200,
    rating: 4.5,
    reviewCount: 2345
  },
  {
    id: 'calvin-klein-euphoria',
    name: 'Euphoria',
    brand: getBrandById('calvin-klein')!,
    year: 2005,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '石榴', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '柿子', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '蓮花', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '蘭花', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '琥珀', type: NoteType.BASE, family: NoteFamily.AMBER },
      { name: '麝香', type: NoteType.BASE, family: NoteFamily.AMBER }
    ],
    description: '神秘性感的女性香水，充滿誘惑力。',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
    price: 2600,
    rating: 4.6,
    reviewCount: 1789
  },

  // Givenchy 香水系列
  {
    id: 'givenchy-linterdit',
    name: "L'Interdit",
    brand: getBrandById('givenchy')!,
    year: 2018,
    gender: Gender.FEMALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '橙花', type: NoteType.TOP, family: NoteFamily.FLORAL },
      { name: '茉莉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '晚香玉', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '廣藿香', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '香草', type: NoteType.BASE, family: NoteFamily.GOURMAND }
    ],
    description: '禁忌之愛，優雅而大膽的女性香水。',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
    price: 3400,
    rating: 4.7,
    reviewCount: 1890
  },
  {
    id: 'givenchy-gentleman',
    name: 'Gentleman',
    brand: getBrandById('givenchy')!,
    year: 2017,
    gender: Gender.MALE,
    concentration: Concentration.EAU_DE_PARFUM,
    notes: [
      { name: '梨子', type: NoteType.TOP, family: NoteFamily.FRUITY },
      { name: '薰衣草', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '鳶尾', type: NoteType.MIDDLE, family: NoteFamily.FLORAL },
      { name: '廣藿香', type: NoteType.BASE, family: NoteFamily.WOODY },
      { name: '黑香草', type: NoteType.BASE, family: NoteFamily.GOURMAND }
    ],
    description: '紳士風範的男性香水，散發優雅魅力。',
    image: 'https://images.unsplash.com/photo-1595425970154-c14c3f2f76c7?w=400',
    price: 3300,
    rating: 4.6,
    reviewCount: 1456
  }
]

/**
 * 獲取所有香水
 */
export function getAllPerfumes(): Perfume[] {
  return perfumes
}

/**
 * 根據 ID 獲取香水
 */
export function getPerfumeById(id: string): Perfume | undefined {
  return perfumes.find(p => p.id === id)
}

/**
 * 根據品牌 ID 篩選香水
 */
export function getPerfumesByBrandIds(brandIds: string[]): Perfume[] {
  if (brandIds.length === 0) return perfumes
  return perfumes.filter(p => brandIds.includes(p.brand.id))
}

/**
 * 根據香調家族篩選香水
 */
export function getPerfumesByNoteFamilies(families: NoteFamily[]): Perfume[] {
  if (families.length === 0) return perfumes
  return perfumes.filter(p => 
    p.notes.some(note => families.includes(note.family))
  )
}

/**
 * 根據性別篩選香水
 */
export function getPerfumesByGender(gender: Gender): Perfume[] {
  return perfumes.filter(p => p.gender === gender || p.gender === Gender.UNISEX)
}

/**
 * 搜尋香水（名稱、品牌）
 */
export function searchPerfumes(keyword: string): Perfume[] {
  const lowerKeyword = keyword.toLowerCase().trim()
  if (!lowerKeyword) return perfumes
  
  return perfumes.filter(p => 
    p.name.toLowerCase().includes(lowerKeyword) ||
    p.brand.name.toLowerCase().includes(lowerKeyword) ||
    p.description.toLowerCase().includes(lowerKeyword)
  )
}

