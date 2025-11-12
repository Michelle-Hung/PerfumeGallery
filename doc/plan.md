# 香水專案開發計畫

## 專案概述

建立一個 Vue 3 香水展示與搜尋平台，包含品牌/香調篩選、搜尋、收藏及評論功能，使用模擬資料並預留 API 擴展介面。

## 專案架構

**技術棧：**
- Vue 3 + TypeScript + Vite
- Pinia（狀態管理）
- Vue Router（路由）
- Element Plus（UI 框架）
- VueUse（實用工具庫）
- Vitest（測試框架）
- pnpm（套件管理）

**專案結構：**
```
perfume-gallery/
├── src/
│   ├── assets/          # 靜態資源
│   ├── components/      # 通用組件
│   ├── views/           # 頁面組件
│   ├── stores/          # Pinia stores
│   ├── services/        # API 服務層（預留）
│   ├── types/           # TypeScript 類型定義
│   ├── utils/           # 工具函數
│   ├── mock/            # 模擬資料
│   ├── router/          # 路由配置
│   └── App.vue
├── tests/
│   └── unit/            # 單元測試
│       ├── mock/        # 模擬資料測試
│       ├── services/    # 服務層測試
│       └── stores/      # Store 測試
└── plan/                # 計畫文件
```

## 核心功能模塊

### 1. 資料模型設計

**檔案：** `src/types/perfume.ts`

定義了完整的類型系統：
- `Perfume` 介面（id, 名稱, 品牌, 香調, 圖片, 描述等）
- `Brand` 介面
- `Note` 介面（前調/中調/後調）
- `NoteFamily` 列舉（花香、木質、東方、清新等）
- `Gender` 列舉（男性、女性、中性）
- `Concentration` 列舉（香精、淡香精等）

### 2. 模擬資料

**檔案：** `src/mock/perfumes.ts`, `src/mock/brands.ts`

- 57+ 款知名香水資料
- 23+ 品牌（Chanel, Dior, Tom Ford, Jo Malone 等）
- 完整的香調資訊
- 高品質圖片 URL（placeholder 或實際圖片）

### 3. 服務層（API 介面）

**檔案：** `src/services/perfumeService.ts`

提供統一的資料獲取介面：
- `fetchPerfumes()` - 獲取所有香水
- `searchPerfumes(keyword, filters, page, pageSize)` - 搜尋香水
- `fetchPerfumeById(id)` - 獲取單一香水詳情
- `getAvailableBrands()` - 獲取所有品牌
- `getAvailableNoteFamilies()` - 獲取所有香調家族
- `getPopularPerfumes()` - 獲取熱門香水
- `getTopRatedPerfumes()` - 獲取高評分香水

當前返回模擬資料，未來可替換為真實 API 調用。

### 4. 狀態管理

**檔案：** `src/stores/perfumeStore.ts`, `src/stores/userStore.ts`

**perfumeStore：**
- 香水列表狀態
- 篩選條件（品牌、香調、搜尋關鍵字）
- 分頁狀態
- 篩選後的香水列表（computed）

**userStore：**
- 收藏列表（localStorage 持久化）
- 評論管理（localStorage）
- 收藏/評論相關操作

### 5. 主要頁面組件

**首頁 `src/views/Home.vue`：**
- 搜尋欄
- 品牌篩選器（多選）
- 香調篩選器（多選）
- 性別篩選器
- 香水卡片網格展示
- 分頁功能

**香水詳情頁 `src/views/PerfumeDetail.vue`：**
- 香水完整資訊
- 香調結構展示（前調/中調/後調）
- 收藏按鈕
- 評論列表與新增評論
- 評分顯示

**收藏頁 `src/views/Favorites.vue`：**
- 顯示已收藏的香水
- 可移除收藏

### 6. 通用組件

- `src/components/PerfumeCard.vue` - 香水卡片
- `src/components/SearchBar.vue` - 搜尋欄（支援防抖）
- `src/components/FilterPanel.vue` - 篩選面板

## 測試覆蓋

**測試結構：** `tests/unit/`

- `tests/unit/mock/perfumes.test.ts` - 模擬資料測試（18 個測試）
- `tests/unit/services/perfumeService.test.ts` - 服務層測試（16 個測試）
- `tests/unit/stores/perfumeStore.test.ts` - Perfume Store 測試（16 個測試）
- `tests/unit/stores/userStore.test.ts` - User Store 測試（16 個測試）

**總計：** 66 個測試，全部通過 ✅

## 實作細節

### 搜尋功能
- 即時搜尋（debounce 300ms）
- 支援香水名稱、品牌搜尋
- 搜尋結果高亮顯示

### 篩選功能
- 多品牌篩選（checkbox）
- 多香調篩選（checkbox）
- 多性別篩選（checkbox）
- 篩選條件可累加
- 顯示當前篩選數量

### 收藏功能
- 使用 localStorage 持久化
- 收藏狀態即時更新
- 收藏數量顯示

### 評論功能
- localStorage 存儲評論
- 包含評論時間、內容、評分
- 計算平均評分
- 顯示評論數量

## 樣式設計

- 現代簡約風格
- 響應式設計（支援手機、平板、桌面）
- 優雅的過渡動畫
- 清晰的視覺層級
- Element Plus 主題色彩

## 專案狀態

✅ **已完成：**
- [x] 專案初始化與依賴安裝
- [x] TypeScript 類型定義
- [x] 模擬資料建立（57+ 款香水）
- [x] 服務層實作
- [x] Pinia Stores 實作
- [x] 通用組件開發
- [x] 主要頁面實作
- [x] 路由配置
- [x] 測試覆蓋（66 個測試）
- [x] Build 成功驗證
- [x] 響應式設計

## 未來擴展預留

1. **API 整合**：服務層已預留介面，只需修改 `perfumeService.ts`
2. **後端整合**：可無縫對接 ASP.NET Core API
3. **使用者認證**：已預留 userStore，可快速加入 JWT 認證
4. **APP 開發**：前端邏輯可重用於 React Native/Flutter
5. **更多香水資料**：可擴充模擬資料至 100+ 款

## 執行指令

```bash
# 安裝依賴
pnpm install

# 開發模式
pnpm dev

# 執行測試
pnpm test

# 測試 UI
pnpm test:ui

# 測試覆蓋率
pnpm test:coverage

# 建置專案
pnpm build

# 預覽建置結果
pnpm preview
```

## 專案位置

`/Users/michelle.hung99/Documents/Git/Personal/perfume-gallery`

