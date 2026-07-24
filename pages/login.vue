<template>
  <div class="auth-form">
   <NuxtImg src="/img/logo_modal.png" alt="skypro" class="logo-img" />
    
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <input id="email" v-model="email" type="email" required placeholder="Почта" />
      </div>
      <div class="form-group">
        <input id="password" v-model="password" type="password" required placeholder="Пароль" />
      </div>

      <div class="button-group">
        <button type="submit" :disabled="loading" class="btn btn-primary">
          {{ loading ? 'Загрузка...' : 'Войти' }}
        </button>
        <NuxtLink to="/register" class="btn btn-secondary">
          Зарегистрироваться
        </NuxtLink>
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({ layout: 'auth' })

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    const loginResponse = await fetch('https://webdev-music-003b5b991590.herokuapp.com/user/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
    const loginData = await loginResponse.json()

    if (!loginResponse.ok) {
      throw createError({
        statusCode: loginResponse.status,
        message: loginData.message || 'Неверный email или пароль'
      })
    }

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

    localStorage.setItem('token', tokenData.access)
    if (tokenData.refresh) localStorage.setItem('refreshToken', tokenData.refresh)

    router.push('/')
  } catch (err) {
    if (err.statusCode) {
      showError(err)
    } else {
      errorMessage.value = err.message || 'Произошла ошибка при входе'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-form {
  width: 368px;                    
  padding: 40px 24px;             
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;            
}

.logo-img {
  width: 120px;                  
  height: 41px;                 
  margin: 0 auto 12px;           
  display: block;
  object-fit: contain;           
}

form {
  width: 100%;                  
}



.form-group {
  margin-bottom: 20px;
   
}
.form-group input {
  width: 100%;
  border: none;
  border-bottom: 1px solid #d0d0d0;
  padding: 8px 0;
  font-size: 16px;
  outline: none;
  background: transparent;
  color: #1a1a1a;
  transition: border-color 0.2s;
}
.form-group input:focus {
  border-bottom-color: #ad61ff;
}
.form-group input::placeholder {
  color: #a0a0a0;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
}

.btn {
  display: block;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.25s, color 0.25s, border-color 0.25s;
}

.btn-primary {
  background: #ad61ff;
  color: #ffffff;
  border: 1px solid #ad61ff;
}

.btn-secondary {
  background: #ffffff;
  color: #1a1a1a;
  border: 1px solid #d0d0d0;
}

/* При наведении на любую кнопку – меняем стили обеих */
.button-group:hover .btn-primary {
  background: #ffffff;
  color: #1a1a1a;
  border-color: #d0d0d0;
}
.button-group:hover .btn-secondary {
  background: #ad61ff;
  color: #ffffff;
  border-color: #ad61ff;
}

.error {
  color: #ff6b6b;
  margin-top: 14px;
  text-align: center;
  font-size: 14px;
}
.logo-img {
align-items: center;
  display: block;
  width: 180px;
  height: auto;
  margin-bottom: 12px;
}
</style>