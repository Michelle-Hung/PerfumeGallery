import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import type { Review } from '@/types/perfume'

export const useUserStore = defineStore('user', () => {
  // State - 使用 localStorage 持久化
  const favoriteIds = useLocalStorage<string[]>('perfume-favorites', [])
  const reviews = useLocalStorage<Review[]>('perfume-reviews', [])

  // Computed
  const favoritesCount = computed(() => favoriteIds.value.length)

  const reviewsByPerfume = computed(() => {
    const map = new Map<string, Review[]>()
    reviews.value.forEach(review => {
      if (!map.has(review.perfumeId)) {
        map.set(review.perfumeId, [])
      }
      map.get(review.perfumeId)!.push(review)
    })
    return map
  })

  // Actions - Favorites
  function isFavorite(perfumeId: string): boolean {
    return favoriteIds.value.includes(perfumeId)
  }

  function toggleFavorite(perfumeId: string) {
    const index = favoriteIds.value.indexOf(perfumeId)
    if (index > -1) {
      favoriteIds.value.splice(index, 1)
    } else {
      favoriteIds.value.push(perfumeId)
    }
  }

  function addFavorite(perfumeId: string) {
    if (!isFavorite(perfumeId)) {
      favoriteIds.value.push(perfumeId)
    }
  }

  function removeFavorite(perfumeId: string) {
    const index = favoriteIds.value.indexOf(perfumeId)
    if (index > -1) {
      favoriteIds.value.splice(index, 1)
    }
  }

  function clearFavorites() {
    favoriteIds.value = []
  }

  // Actions - Reviews
  function getReviewsForPerfume(perfumeId: string): Review[] {
    return reviewsByPerfume.value.get(perfumeId) || []
  }

  function addReview(perfumeId: string, userName: string, rating: number, comment: string) {
    const newReview: Review = {
      id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      perfumeId,
      userName,
      rating,
      comment,
      createdAt: new Date().toISOString()
    }
    reviews.value.push(newReview)
    return newReview
  }

  function deleteReview(reviewId: string) {
    const index = reviews.value.findIndex(r => r.id === reviewId)
    if (index > -1) {
      reviews.value.splice(index, 1)
    }
  }

  function updateReview(reviewId: string, rating: number, comment: string) {
    const review = reviews.value.find(r => r.id === reviewId)
    if (review) {
      review.rating = rating
      review.comment = comment
    }
  }

  function getAverageRating(perfumeId: string): number {
    const perfumeReviews = getReviewsForPerfume(perfumeId)
    if (perfumeReviews.length === 0) return 0
    
    const sum = perfumeReviews.reduce((acc, review) => acc + review.rating, 0)
    return sum / perfumeReviews.length
  }

  function getReviewCount(perfumeId: string): number {
    return getReviewsForPerfume(perfumeId).length
  }

  function clearAllReviews() {
    reviews.value = []
  }

  return {
    // State
    favoriteIds,
    reviews,
    // Computed
    favoritesCount,
    reviewsByPerfume,
    // Actions - Favorites
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
    // Actions - Reviews
    getReviewsForPerfume,
    addReview,
    deleteReview,
    updateReview,
    getAverageRating,
    getReviewCount,
    clearAllReviews
  }
})

