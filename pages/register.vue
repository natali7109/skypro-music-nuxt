<template>
  <div class="register-page">
    <div class="register-container">
      <h1>Регистрация</h1>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="name">Имя</label>
          <input id="name" v-model="name" type="text" required placeholder="Иван Иванов" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" required placeholder="example@mail.ru" />
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input id="password" v-model="password" type="password" required placeholder="••••••••" />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
        </button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p class="login-link">
          Уже есть аккаунт? <NuxtLink to="/login">Войти</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleRegister = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    const response = await fetch('https://webdev-music-003b5b991590.herokuapp.com/user/signup/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: name.value,
        email: email.value,
        password: password.value
      })
    })
    const data = await response.json()

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        message: data.message || 'Ошибка регистрации'
      })
    }

    // После успешной регистрации — сразу логиним пользователя
    const loginResponse = await fetch('https://webdev-music-003b5b991590.herokuapp.com/user/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
    const loginData = await loginResponse.json()

    if (!loginResponse.ok) {
      throw createError({
        statusCode: loginResponse.status,
        message: loginData.message || 'Не удалось войти'
      })
    }

    const tokenResponse = await fetch('https://webdev-music-003b5b991590.herokuapp.com/user/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
    const tokenData = await tokenResponse.json()

    localStorage.setItem('token', tokenData.access)
    router.push('/')
  } catch (err) {
    if (err.statusCode) {
      showError(err)
    } else {
      errorMessage.value = err.message || 'Ошибка регистрации'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #181818;
  padding: 20px;
}

.register-container {
  background: #2a2a2a;
  padding: 40px 32px;
  border-radius: 12px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.register-container h1 {
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

.error {
  color: #ff6b6b;
  margin-top: 14px;
  text-align: center;
  font-size: 14px;
}

.login-link {
  margin-top: 16px;
  color: #b3b3b3;
  text-align: center;
  font-size: 14px;
}

.login-link a {
  color: #7334ea;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>