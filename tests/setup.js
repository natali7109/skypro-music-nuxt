import { vi, beforeEach } from 'vitest'
import { config } from '@vue/test-utils'

// ★ ТВОЙ РАБОЧИЙ КОД (ОСТАЁТСЯ БЕЗ ИЗМЕНЕНИЙ) ★
const createLocalStorageMock = () => {
  let store = new Map()

  return {
    getItem: vi.fn((key) => (store.has(key) ? store.get(key) : null)),
    setItem: vi.fn((key, value) => { store.set(key, String(value)) }),
    removeItem: vi.fn((key) => { store.delete(key) }),
    clear: vi.fn(() => { store.clear() }),
    seed(key, value) {
      store.set(key, JSON.stringify(value))
    },
  }
}

const localStorageMock = createLocalStorageMock()
vi.stubGlobal('localStorage', localStorageMock)

beforeEach(() => {
  localStorageMock.clear()
})

// ★ НОВЫЕ МОКИ (ДОБАВЛЯЕМ СЮДА) ★

// 1. Мок для NuxtLink и NuxtImg (чтобы тесты не падали на них)
config.global.stubs = {
  NuxtLink: {
    template: '<a><slot /></a>',
  },
  NuxtImg: {
    template: '<img />',
  },
}

// 2. Мок для useUserStore (нужен для проверки isAuthenticated)
vi.mock('~/stores/user', () => ({
  useUserStore: vi.fn(() => ({
    isAuthenticated: false,
    user: null,
    token: null,
    logout: vi.fn(),
    login: vi.fn(),
    initializeAuth: vi.fn(),
  })),
}))

// 3. Мок для navigateTo (используется в лайках)
vi.mock('#app', () => ({
  navigateTo: vi.fn(),
}))

// 4. Мок для vue-router (на всякий случай)
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
  })),
}))

export { localStorageMock }