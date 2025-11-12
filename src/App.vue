<template>
  <el-container class="app-container">
    <el-header class="app-header">
      <div class="header-content">
        <router-link to="/" class="logo">
          <h1>🌸 香水世界</h1>
        </router-link>
        <el-menu
          mode="horizontal"
          :router="true"
          :default-active="currentRoute"
          class="header-menu"
        >
          <el-menu-item index="/">首頁</el-menu-item>
          <el-menu-item index="/favorites">
            <el-icon><Star /></el-icon>
            我的收藏
            <el-badge v-if="favoritesCount > 0" :value="favoritesCount" class="favorite-badge" />
          </el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main class="app-main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>
    <el-footer class="app-footer">
      <p>&copy; 2024 Perfume Gallery - 使用 Vue 3 + TypeScript 建立</p>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const route = useRoute()
const userStore = useUserStore()

const currentRoute = computed(() => route.path)
const favoritesCount = computed(() => userStore.favoritesCount)
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: var(--bg-overlay);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-light);
  padding: 0;
  height: 80px;
  display: flex;
  align-items: center;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 768px) {
  .app-header {
    height: 70px;
  }

  .logo h1 {
    font-size: 22px;
  }

  .app-main {
    padding: 32px 16px;
  }
}

.logo {
  text-decoration: none;
  color: white;
}

.logo h1 {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.8px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-menu {
  background: transparent;
  border: none;
}

:deep(.header-menu .el-menu-item) {
  color: var(--text-secondary);
  border-bottom: 2px solid transparent;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: var(--radius-sm);
  margin: 0 4px;
}

:deep(.header-menu .el-menu-item:hover) {
  background: var(--bg-secondary);
  color: var(--accent-color);
}

:deep(.header-menu .el-menu-item.is-active) {
  background: var(--bg-secondary);
  color: var(--accent-color);
  border-bottom-color: var(--accent-color);
  border-bottom-width: 2px;
}

.favorite-badge {
  margin-left: 8px;
}

.app-main {
  flex: 1;
  background: linear-gradient(to bottom, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  padding: 48px 24px;
  min-height: calc(100vh - 160px);
}

.app-footer {
  background: var(--bg-card);
  color: var(--text-light);
  text-align: center;
  padding: 32px 24px;
  border-top: 1px solid var(--border-light);
  font-size: 14px;
  margin-top: auto;
}

.app-footer p {
  margin: 0;
}

.fade-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
