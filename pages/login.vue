<template>
  <div class="login-page">
    <div class="login-container">
      <h1>Вход</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" required placeholder="example@mail.ru" />
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input id="password" v-model="password" type="password" required placeholder="••••••••" />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Загрузка...' : 'Войти' }}
        </button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p class="register-link">
  Нет аккаунта? <NuxtLink to="/register">Зарегистрироваться</NuxtLink>
</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    // 1. Логин (проверка пользователя)
    const loginResponse = await fetch('https://webdev-music-003b5b991590.herokuapp.com/user/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
    const loginData = await loginResponse.json()

    if (!loginResponse.ok) {
      // Если ошибка — показываем страницу ошибки через showError
      throw createError({
        statusCode: loginResponse.status,
        message: loginData.message || 'Неверный email или пароль'
      })
    }

    // 2. Получение токена
    const tokenResponse = await fetch('https://webdev-music-003b5b991590.herokuapp.com/user/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok) {
      throw createError({
        statusCode: tokenResponse.status,
        message: tokenData.message || 'Не удалось получить токен'
      })
    }

    // Сохраняем токен в localStorage
    localStorage.setItem('token', tokenData.access)
    // Если нужно сохранить refresh токен
    if (tokenData.refresh) {
      localStorage.setItem('refreshToken', tokenData.refresh)
    }

    // Редирект на главную без перезагрузки
    router.push('/')
  } catch (err) {
    if (err.statusCode) {
      // showError от Nuxt — покажет страницу ошибки
      showError(err)
    } else {
      // Ошибка сети или другая
      errorMessage.value = err.message || 'Произошла ошибка при входе'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #181818;
  padding: 20px;
}

.login-container {
  background: #2a2a2a;
  padding: 40px 32px;
  border-radius: 12px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.login-container h1 {
  color: #ffffff;
  text-align: center;
  margin-bottom: 28px;
  font-weight: 600;
  font-size: 28px;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  color: #b3b3b3;
  font-size: 14px;
  margin-bottom: 6px;
}

.form-group input {
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #3a3a3a;
  background: #1a1a1a;
  color: #ffffff;
  font-size: 16px;
  outline: none;
  transition: border 0.2s;
}

.form-group input:focus {
  border-color: #7334ea;
}

button {
  width: 100%;
  padding: 12px;
  background: #7334ea;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover:not(:disabled) {
  background: #5a28c7;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.register-link {
  margin-top: 16px;
  color: #b3b3b3;
  text-align: center;
  font-size: 14px;
}
.register-link a {
  color: #7334ea;
  text-decoration: none;
}
.register-link a:hover {
  text-decoration: underline;
}

.error {
  color: #ff6b6b;
  margin-top: 14px;
  text-align: center;
  font-size: 14px;
}
</style>