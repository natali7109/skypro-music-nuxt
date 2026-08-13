import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Navbar from '../../components/Navbar.vue'

describe('Navbar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // Мокаем localStorage
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
      removeItem: vi.fn(),
    }
    global.localStorage = localStorageMock
  })

  it('отображает логотип', () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          NuxtLink: true,
          NuxtImg: true,
        },
      },
    })
    // Ищем контейнер логотипа через html-разметку
    expect(wrapper.html()).toContain('nav__logo')
  })

  it('содержит пункты меню (после открытия бургера)', async () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          NuxtLink: true,
          NuxtImg: true,
        },
      },
    })
    
    await wrapper.find('.nav__burger').trigger('click')
    
    const items = wrapper.findAll('.menu__item')
    expect(items.length).toBe(3)
  })

  it('содержит кнопку выхода (после открытия бургера)', async () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          NuxtLink: true,
          NuxtImg: true,
        },
      },
    })
    
    await wrapper.find('.nav__burger').trigger('click')
    
    const logoutBtn = wrapper.find('.logout-btn')
    expect(logoutBtn.exists()).toBe(true)
  })

  it('меню скрыто по умолчанию', () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          NuxtLink: true,
          NuxtImg: true,
        },
      },
    })
    expect(wrapper.find('.nav__menu').exists()).toBe(false)
  })

  it('открывает меню при клике на бургер', async () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          NuxtLink: true,
          NuxtImg: true,
        },
      },
    })
    
    await wrapper.find('.nav__burger').trigger('click')
    
    expect(wrapper.find('.nav__menu').exists()).toBe(true)
    expect(wrapper.find('.nav__menu').isVisible()).toBe(true)
  })

  it('закрывает меню при повторном клике на бургер', async () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          NuxtLink: true,
          NuxtImg: true,
        },
      },
    })
    
    await wrapper.find('.nav__burger').trigger('click')
    expect(wrapper.find('.nav__menu').exists()).toBe(true)
    
    await wrapper.find('.nav__burger').trigger('click')
    expect(wrapper.find('.nav__menu').exists()).toBe(false)
  })
})