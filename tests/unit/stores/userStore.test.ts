import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/userStore'

describe('UserStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // 清除 localStorage
    localStorage.clear()
  })

  describe('Favorites', () => {
    it('應該有正確的初始狀態', () => {
      const store = useUserStore()
      expect(store.favoriteIds).toEqual([])
      expect(store.favoritesCount).toBe(0)
    })

    it('應該能檢查是否收藏', () => {
      const store = useUserStore()
      expect(store.isFavorite('test-id')).toBe(false)
      
      store.addFavorite('test-id')
      expect(store.isFavorite('test-id')).toBe(true)
    })

    it('應該能新增收藏', () => {
      const store = useUserStore()
      store.addFavorite('perfume-1')
      
      expect(store.favoriteIds).toContain('perfume-1')
      expect(store.favoritesCount).toBe(1)
    })

    it('不應該重複新增收藏', () => {
      const store = useUserStore()
      store.addFavorite('perfume-1')
      store.addFavorite('perfume-1')
      
      expect(store.favoriteIds.length).toBe(1)
    })

    it('應該能移除收藏', () => {
      const store = useUserStore()
      store.addFavorite('perfume-1')
      store.removeFavorite('perfume-1')
      
      expect(store.favoriteIds).not.toContain('perfume-1')
      expect(store.favoritesCount).toBe(0)
    })

    it('應該能切換收藏狀態', () => {
      const store = useUserStore()
      
      store.toggleFavorite('perfume-1')
      expect(store.isFavorite('perfume-1')).toBe(true)
      
      store.toggleFavorite('perfume-1')
      expect(store.isFavorite('perfume-1')).toBe(false)
    })

    it('應該能清除所有收藏', () => {
      const store = useUserStore()
      store.addFavorite('perfume-1')
      store.addFavorite('perfume-2')
      
      store.clearFavorites()
      expect(store.favoriteIds).toEqual([])
    })
  })

  describe('Reviews', () => {
    it('應該能新增評論', () => {
      const store = useUserStore()
      const review = store.addReview('perfume-1', 'Test User', 5, 'Great perfume!')
      
      expect(review).toBeDefined()
      expect(review.perfumeId).toBe('perfume-1')
      expect(review.userName).toBe('Test User')
      expect(review.rating).toBe(5)
      expect(review.comment).toBe('Great perfume!')
      expect(store.reviews.length).toBe(1)
    })

    it('應該能獲取特定香水的評論', () => {
      const store = useUserStore()
      store.addReview('perfume-1', 'User 1', 5, 'Comment 1')
      store.addReview('perfume-1', 'User 2', 4, 'Comment 2')
      store.addReview('perfume-2', 'User 3', 3, 'Comment 3')
      
      const reviews = store.getReviewsForPerfume('perfume-1')
      expect(reviews.length).toBe(2)
      expect(reviews.every(r => r.perfumeId === 'perfume-1')).toBe(true)
    })

    it('應該能刪除評論', () => {
      const store = useUserStore()
      const review = store.addReview('perfume-1', 'Test User', 5, 'Great!')
      
      store.deleteReview(review.id)
      expect(store.reviews.length).toBe(0)
    })

    it('應該能更新評論', () => {
      const store = useUserStore()
      const review = store.addReview('perfume-1', 'Test User', 5, 'Great!')
      
      store.updateReview(review.id, 4, 'Good!')
      
      const updatedReview = store.reviews.find(r => r.id === review.id)
      expect(updatedReview?.rating).toBe(4)
      expect(updatedReview?.comment).toBe('Good!')
    })

    it('應該能計算平均評分', () => {
      const store = useUserStore()
      store.addReview('perfume-1', 'User 1', 5, 'Comment 1')
      store.addReview('perfume-1', 'User 2', 3, 'Comment 2')
      store.addReview('perfume-1', 'User 3', 4, 'Comment 3')
      
      const average = store.getAverageRating('perfume-1')
      expect(average).toBe(4)
    })

    it('沒有評論時應該返回 0 平均分', () => {
      const store = useUserStore()
      const average = store.getAverageRating('perfume-1')
      expect(average).toBe(0)
    })

    it('應該能獲取評論數量', () => {
      const store = useUserStore()
      store.addReview('perfume-1', 'User 1', 5, 'Comment 1')
      store.addReview('perfume-1', 'User 2', 4, 'Comment 2')
      
      expect(store.getReviewCount('perfume-1')).toBe(2)
      expect(store.getReviewCount('perfume-2')).toBe(0)
    })

    it('應該能清除所有評論', () => {
      const store = useUserStore()
      store.addReview('perfume-1', 'User 1', 5, 'Comment 1')
      store.addReview('perfume-2', 'User 2', 4, 'Comment 2')
      
      store.clearAllReviews()
      expect(store.reviews).toEqual([])
    })
  })

  describe('Computed Properties', () => {
    it('reviewsByPerfume 應該正確分組評論', () => {
      const store = useUserStore()
      store.addReview('perfume-1', 'User 1', 5, 'Comment 1')
      store.addReview('perfume-1', 'User 2', 4, 'Comment 2')
      store.addReview('perfume-2', 'User 3', 3, 'Comment 3')
      
      const reviewsMap = store.reviewsByPerfume
      expect(reviewsMap.get('perfume-1')?.length).toBe(2)
      expect(reviewsMap.get('perfume-2')?.length).toBe(1)
    })
  })
})

