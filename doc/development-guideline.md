# 開發指南 (Development Guideline)

## 📋 目錄

- [代碼風格規範](#代碼風格規範)
- [單元測試要求](#單元測試要求)
- [提交前檢查清單](#提交前檢查清單)
- [專案結構規範](#專案結構規範)
- [命名規範](#命名規範)
- [Git 工作流程](#git-工作流程)
- [Code Review 規範](#code-review-規範)

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

## Code Review 規範

本專案遵循 [Google Code Review Guidelines](https://google.github.io/eng-practices/review/) 的核心理念。

### Code Review 的目的

Code Review 的主要目的是：
1. **確保代碼品質**：代碼符合專案標準和最佳實踐
2. **知識分享**：團隊成員互相學習，了解代碼庫的變化
3. **早期發現問題**：在合併前發現 bug 和設計問題
4. **一致性**：保持代碼庫的風格和架構一致性

### Code Review 原則

#### 1. 審查者（Reviewer）原則

**✅ 應該做的：**

- **關注代碼本身**：審查代碼的設計、功能、複雜度、測試覆蓋率
- **給予建設性反饋**：提供具體、可操作的建議
- **保持禮貌和尊重**：使用友善、專業的語言
- **及時回應**：盡快回應 review 請求（目標：24 小時內）
- **解釋原因**：說明為什麼需要修改，而不只是要求修改
- **認可好的代碼**：對優秀的代碼給予肯定

**❌ 不應該做的：**

- **不要過度關注風格**：小問題可以建議，但不應阻擋合併
- **不要要求完美**：代碼不需要完美，只需要足夠好
- **不要個人化**：關注代碼，不針對個人
- **不要拖延**：避免長時間不回應

#### 2. 提交者（Author）原則

**✅ 應該做的：**

- **保持 PR 小而專注**：每個 PR 專注於一個功能或修復
- **提供清晰的描述**：說明變更的目的和背景
- **回應所有評論**：對每個 comment 給予回應
- **虛心接受反饋**：將 review 視為學習機會
- **保持專業**：即使不同意評論，也要保持專業態度

**❌ 不應該做的：**

- **不要防禦性回應**：不要為每個評論辯護
- **不要忽略評論**：必須回應或解決所有評論
- **不要提交過大的 PR**：大 PR 難以審查，應該拆分

### Code Review 檢查清單

#### 功能正確性

- ✅ 代碼是否實現了預期的功能？
- ✅ 是否處理了邊界情況和錯誤情況？
- ✅ 是否有潛在的 bug 或邏輯錯誤？

#### 設計和架構

- ✅ 代碼設計是否合理？
- ✅ 是否遵循了專案的架構模式？
- ✅ 是否有不必要的複雜度？
- ✅ 是否重用了現有代碼？

#### 測試

- ✅ 是否有足夠的單元測試？
- ✅ 測試是否覆蓋了主要功能和邊界情況？
- ✅ 測試是否清晰易懂？

#### 代碼風格

- ✅ 是否符合專案的代碼風格規範？
- ✅ 命名是否清晰有意義？
- ✅ 是否有適當的註釋？

#### 性能

- ✅ 是否有明顯的性能問題？
- ✅ 是否有不必要的計算或資源消耗？

#### 安全性

- ✅ 是否有安全漏洞？
- ✅ 是否正確處理了用戶輸入？

### Code Review 流程

1. **提交 PR**
   - 確保所有測試通過
   - 確保 Build 成功
   - 填寫清晰的 PR 描述

2. **請求 Review**
   - 至少需要 1 位 reviewer 批准
   - 標記相關的團隊成員
   - 添加適當的標籤（如 `feature`, `bugfix`, `refactor`）

3. **Review 過程**
   - Reviewer 檢查代碼並留下評論
   - Author 回應評論並進行修改
   - 重複此過程直到所有問題解決

4. **批准和合併**
   - 獲得至少 1 個 approval
   - 解決所有 blocking comments
   - 合併到目標分支

### Review 評論類型

#### 必須修復（Must Fix / Blocking）

- 功能錯誤或 bug
- 安全問題
- 測試覆蓋不足
- 違反核心規範

**標記方式**：使用 `[MUST FIX]` 或 `[BLOCKING]` 前綴

#### 建議改進（Nice to Have / Non-blocking）

- 代碼風格小問題
- 可選的重構建議
- 性能優化建議

**標記方式**：使用 `[SUGGESTION]` 或 `[OPTIONAL]` 前綴

### Review 回應時間

- **目標回應時間**：24 小時內
- **緊急修復**：4 小時內
- **大型 PR**：48 小時內

### PR 大小建議

根據 Google Code Review Guidelines，PR 大小建議如下：

- **理想大小**（< 200 行）：強烈推薦，易於審查，預期在一天內獲得審查回饋
- **可接受大小**（200-400 行）：可接受，但應該考慮拆分為多個 PR
- **大型 PR**（> 400 行）：應該拆分，大 PR 會延遲審查並降低代碼品質

**最佳實踐**：將 PR 控制在 50-200 行之間，這是最理想的審查範圍。

### 範例評論

**✅ 好的評論：**

```
[MUST FIX] 這裡缺少錯誤處理。如果 API 調用失敗，應該捕獲錯誤並顯示用戶友好的訊息。

建議：
try {
  const data = await fetchPerfumes()
} catch (error) {
  showErrorMessage('無法載入香水列表，請稍後再試')
}
```

**❌ 不好的評論：**

```
這個寫法不對
```

**✅ 好的評論：**

```
[SUGGESTION] 這個函數可以提取為一個可重用的工具函數，因為在其他地方也會用到類似的邏輯。
```

### 衝突解決

如果 Author 和 Reviewer 對某個問題有不同意見：

1. **討論**：在 PR 評論中進行討論
2. **尋求第三方意見**：邀請另一位團隊成員參與討論
3. **記錄決策**：在評論中記錄最終決策和原因

### 參考資源

- [Google Code Review Guidelines](https://google.github.io/eng-practices/review/)
- [Google Code Review Developer Guide](https://google.github.io/eng-practices/review/developer/)

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

