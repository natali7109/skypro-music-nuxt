import { vi, beforeEach } from 'vitest'

const createLocalStorageMock = () => {
  let store = new Map()

  return {
    getItem: vi.fn((key) => (store.has(key) ? store.get(key) : null)),
    setItem: vi.fn((key, value) => { store.set(key, String(value)) }),
    removeItem: vi.fn((key) => { store.delete(key) }),
    clear: vi.fn(() => { store.clear() }),
    // удобный помощник для предзаполнения данных в тесте
    seed(key, value) {
      store.set(key, JSON.stringify(value))
    },
  }
}

const localStorageMock = createLocalStorageMock()
vi.stubGlobal('localStorage', localStorageMock)

// автоочистка между тестами, чтобы данные не "протекали"
beforeEach(() => {
  localStorageMock.clear()
})

export { localStorageMock }