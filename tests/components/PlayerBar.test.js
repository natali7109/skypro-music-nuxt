import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { usePlayerStore } from '../../stores/player'
import PlayerBar from '../../components/PlayerBar.vue'

describe('PlayerBar', () => {
  const track = {
    _id: 1,
    name: 'Playing Track',
    author: 'Playing Author',
    logo: '/img/track1.jpg',
  }

  // Создаём и активируем Pinia перед каждым тестом
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('отображает название текущего трека', () => {
    // Устанавливаем трек в стор
    const store = usePlayerStore()
    store.setCurrentTrack(track)

    const wrapper = mount(PlayerBar, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true,
        },
      },
    })
    expect(wrapper.text()).toContain('Playing Track')
  })

  it('отображает исполнителя текущего трека', () => {
    const store = usePlayerStore()
    store.setCurrentTrack(track)

    const wrapper = mount(PlayerBar, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true,
        },
      },
    })
    expect(wrapper.text()).toContain('Playing Author')
  })

  it('показывает "Не выбрано", если трек не выбран', () => {
    const wrapper = mount(PlayerBar, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true,
        },
      },
    })
    expect(wrapper.text()).toContain('Не выбрано')
    expect(wrapper.text()).toContain('Выберите трек')
  })

  it('отображает обложку трека, если она есть', () => {
    const store = usePlayerStore()
    store.setCurrentTrack(track)

    const wrapper = mount(PlayerBar, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true,
        },
      },
    })
    // Проверяем, что NuxtImg для обложки рендерится
    const cover = wrapper.find('.track-play__cover')
    expect(cover.exists()).toBe(true)
  })

  it('показывает SVG-заглушку, если обложки нет', () => {
    const trackWithoutLogo = {
      _id: 2,
      name: 'No Logo Track',
      author: 'No Logo Author',
    }
    const store = usePlayerStore()
    store.setCurrentTrack(trackWithoutLogo)

    const wrapper = mount(PlayerBar, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true,
        },
      },
    })
    // Проверяем, что SVG-заглушка есть
    const svg = wrapper.find('.track-play__image svg')
    expect(svg.exists()).toBe(true)
  })
})