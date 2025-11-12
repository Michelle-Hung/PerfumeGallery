# 開發指南 (Development Guideline)

## 📋 目錄

- [代碼風格規範](#代碼風格規範)
- [單元測試要求](#單元測試要求)
- [提交前檢查清單](#提交前檢查清單)
- [專案結構規範](#專案結構規範)
- [命名規範](#命名規範)
- [Git 工作流程](#git-工作流程)

---

## 代碼風格規範

### TypeScript / JavaScript

- **縮進**：使用 2 個空格（符合 EditorConfig）
- **引號**：使用單引號 `'` 而非雙引號
- **分號**：不使用分號（除非必要）
- **行尾**：使用 LF（Unix 風格）
- **編碼**：UTF-8

### Vue 組件規範

#### 組件結構順序

```vue
<template>
  <!-- 模板內容 -->
</template>

<script setup lang="ts">
// 1. 導入語句
import { ... } from 'vue'
import { ... } from '@/...'

// 2. 類型定義
interface Props { ... }
interface Emits { ... }

// 3. Props 和 Emits
const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 4. Composables / Stores
const store = useStore()

// 5. 響應式數據
const state = ref(...)

// 6. Computed 屬性
const computed = computed(() => ...)

// 7. 方法
function handleClick() { ... }

// 8. 生命週期鉤子
onMounted(() => { ... })
</script>

<style scoped>
/* 樣式 */
</style>
```

#### 組件命名

- **組件文件名**：PascalCase（如 `PerfumeCard.vue`）
- **組件內部類名**：kebab-case（如 `.perfume-card`）
- **變量名**：camelCase（如 `isFavorite`）
- **常量**：UPPER_SNAKE_CASE（如 `MAX_ITEMS`）

### CSS 規範

#### 必須使用 CSS 變量

所有顏色、間距、陰影等樣式值必須使用 CSS 變量，定義在 `src/style.css` 的 `:root` 中：

```css
:root {
  --primary-color: #000000;
  --text-primary: #1a1a1a;
  --bg-primary: #ffffff;
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.08);
  /* ... */
}
```

**❌ 錯誤範例：**
```css
.header {
  background: #ffffff;  /* 硬編碼顏色 */
  color: #1a1a1a;      /* 硬編碼顏色 */
}
```

**✅ 正確範例：**
```css
.header {
  background: var(--bg-primary);
  color: var(--text-primary);
}
```

#### 樣式作用域

- 組件樣式必須使用 `scoped`
- 深度選擇器使用 `:deep()` 語法

```vue
<style scoped>
.component-class {
  /* 組件樣式 */
}

:deep(.el-button) {
  /* Element Plus 組件樣式覆蓋 */
}
</style>
```

#### 現代簡約風格

- **邊框**：使用直角邊框（`border-radius: 0`）
- **陰影**：使用輕微陰影（`var(--shadow-sm)`, `var(--shadow-md)`）
- **過渡**：簡潔的過渡效果（`transition: all 0.2s ease`）
- **配色**：黑白灰為主，避免過多漸變

---

## 單元測試要求

### ⚠️ 強制要求

**所有新功能或修改都必須包含對應的單元測試。**

### 測試文件結構

測試文件應與源文件保持相同的目錄結構：

```
src/
├── services/
│   └── perfumeService.ts
tests/
└── unit/
    └── services/
        └── perfumeService.test.ts
```

### 測試文件命名

- 測試文件命名：`*.test.ts` 或 `*.spec.ts`
- 測試文件位置：`tests/unit/` 目錄下對應的結構

### 測試覆蓋範圍

#### 必須測試的內容

1. **Services（服務層）**
   - ✅ 所有公開函數
   - ✅ 正常情況和邊界情況
   - ✅ 錯誤處理

2. **Stores（狀態管理）**
   - ✅ 初始狀態
   - ✅ Actions / Mutations
   - ✅ Getters / Computed
   - ✅ 狀態變化

3. **Utils（工具函數）**
   - ✅ 所有工具函數
   - ✅ 輸入驗證
   - ✅ 返回值驗證

4. **Components（組件）**
   - ✅ Props 傳遞
   - ✅ 事件觸發
   - ✅ 用戶交互
   - ✅ 條件渲染

#### 測試範例

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { useStore } from '@/stores/store'

describe('StoreName', () => {
  beforeEach(() => {
    // 每個測試前的設置
  })

  describe('功能模塊名稱', () => {
    it('應該有正確的初始狀態', () => {
      const store = useStore()
      expect(store.state).toBeDefined()
    })

    it('應該能執行某個操作', () => {
      const store = useStore()
      store.doSomething()
      expect(store.result).toBe(expected)
    })
  })
})
```

### 測試執行

```bash
# 執行所有測試
pnpm test

# 執行測試並查看覆蓋率
pnpm test:coverage

# 使用 UI 模式執行測試
pnpm test:ui
```

### 測試覆蓋率要求

- **最低要求**：新增代碼的測試覆蓋率 ≥ 80%
- **理想目標**：測試覆蓋率 ≥ 90%

---

## 提交前檢查清單

### ✅ 必須完成的步驟

在提交代碼前，**必須**完成以下步驟：

#### 1. 執行單元測試

```bash
pnpm test
```

**要求**：
- ✅ 所有測試必須通過
- ✅ 沒有測試失敗或錯誤
- ✅ 新增功能必須有對應測試

#### 2. 執行 Build

```bash
pnpm build
```

**要求**：
- ✅ Build 必須成功
- ✅ 沒有 TypeScript 類型錯誤
- ✅ 沒有編譯錯誤
- ✅ 沒有警告（盡可能修復）

#### 3. 代碼檢查

**手動檢查**：
- ✅ 代碼符合風格規範
- ✅ 使用 CSS 變量而非硬編碼值
- ✅ 組件結構符合規範
- ✅ 沒有 console.log 或調試代碼
- ✅ 註釋清晰（中文或英文）

#### 4. 功能驗證

- ✅ 新功能正常工作
- ✅ 沒有破壞現有功能
- ✅ 響應式設計正常（移動端/桌面端）

### 🚫 禁止提交的情況

以下情況**禁止**提交代碼：

- ❌ 測試未通過
- ❌ Build 失敗
- ❌ 有 TypeScript 類型錯誤
- ❌ 有硬編碼的顏色/樣式值
- ❌ 新增功能沒有對應測試
- ❌ 有 console.log 或調試代碼

### 快速檢查腳本

建議在提交前執行：

```bash
# 1. 執行測試
pnpm test

# 2. 執行 Build
pnpm build

# 3. 檢查測試覆蓋率（可選）
pnpm test:coverage
```

---

## 專案結構規範

### 目錄結構

```
perfume-gallery/
├── src/
│   ├── assets/          # 靜態資源（圖片、字體等）
│   ├── components/      # 可重用組件
│   ├── views/           # 頁面組件
│   ├── stores/          # Pinia stores
│   ├── services/        # API 服務層
│   ├── types/           # TypeScript 類型定義
│   ├── utils/           # 工具函數
│   ├── mock/            # 模擬資料
│   ├── router/          # 路由配置
│   └── style.css        # 全局樣式（CSS 變量定義）
├── tests/
│   └── unit/            # 單元測試
│       ├── components/  # 組件測試
│       ├── services/    # 服務層測試
│       ├── stores/      # Store 測試
│       └── utils/       # 工具函數測試
└── doc/                 # 文檔
```

### 文件組織原則

1. **組件**：一個組件一個文件
2. **類型**：相關類型定義在同一個文件
3. **測試**：測試文件與源文件保持相同結構
4. **服務**：按功能模塊組織服務文件

---

## 命名規範

### 文件命名

- **組件**：PascalCase（`PerfumeCard.vue`）
- **工具函數**：camelCase（`formatDate.ts`）
- **類型定義**：camelCase（`perfume.ts`）
- **測試文件**：`*.test.ts` 或 `*.spec.ts`

### 變量命名

- **變量/函數**：camelCase（`isFavorite`, `handleClick`）
- **常量**：UPPER_SNAKE_CASE（`MAX_ITEMS`, `API_BASE_URL`）
- **類型/介面**：PascalCase（`Perfume`, `UserStore`）
- **CSS 類名**：kebab-case（`.perfume-card`, `.card-content`）

### 函數命名

- **事件處理**：`handle` 前綴（`handleClick`, `handleSubmit`）
- **獲取數據**：`get` 或 `fetch` 前綴（`getUser`, `fetchPerfumes`）
- **設置數據**：`set` 前綴（`setSearchKeyword`）
- **布爾值**：`is`/`has`/`should` 前綴（`isFavorite`, `hasError`）

---

## Git 工作流程

### Commit 訊息規範

使用清晰的 commit 訊息：

```
<type>: <subject>

<body>
```

**Type 類型**：
- `feat`: 新功能
- `fix`: 修復 bug
- `docs`: 文檔更新
- `style`: 代碼格式調整（不影響功能）
- `refactor`: 重構
- `test`: 測試相關
- `chore`: 構建/工具相關

**範例**：
```
feat: 新增香水收藏功能

- 添加收藏按鈕組件
- 實現 localStorage 持久化
- 添加對應單元測試
```

### 分支規範

- `main`: 主分支（生產環境）
- `feature/*`: 功能分支
- `fix/*`: 修復分支

---

## 工具和依賴

### 必須使用的工具

- **包管理器**：pnpm（不使用 npm 或 yarn）
- **測試框架**：Vitest
- **UI 框架**：Element Plus
- **狀態管理**：Pinia
- **路由**：Vue Router

### 開發工具

- **IDE**：推薦使用 VS Code
- **插件**：Volar（Vue 3 支持）、ESLint、Prettier

---

## 常見問題

### Q: 如何添加新的 CSS 變量？

A: 在 `src/style.css` 的 `:root` 中添加：

```css
:root {
  --your-new-color: #000000;
}
```

然後在組件中使用：

```css
.element {
  color: var(--your-new-color);
}
```

### Q: 如何為新組件編寫測試？

A: 參考 `tests/unit/components/` 中的範例，使用 `@vue/test-utils` 進行組件測試。

### Q: Build 失敗怎麼辦？

A: 
1. 檢查 TypeScript 類型錯誤
2. 檢查導入路徑是否正確
3. 確保所有依賴已安裝（`pnpm install`）
4. 檢查 `tsconfig.json` 配置

### Q: 測試覆蓋率不夠怎麼辦？

A: 
1. 檢查哪些代碼沒有被測試覆蓋
2. 為未覆蓋的代碼添加測試
3. 使用 `pnpm test:coverage` 查看詳細報告

---

## 參考資源

- [Vue 3 官方文檔](https://vuejs.org/)
- [Vitest 文檔](https://vitest.dev/)
- [Element Plus 文檔](https://element-plus.org/)
- [Pinia 文檔](https://pinia.vuejs.org/)
- [TypeScript 手冊](https://www.typescriptlang.org/docs/)

---

## 更新記錄

- **2024-XX-XX**: 初始版本創建

---

**記住：測試通過 + Build 成功 = 可以提交！** ✅

