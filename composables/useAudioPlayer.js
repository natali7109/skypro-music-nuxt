import { ref, watch } from 'vue'
import { usePlayerStore } from '~/stores/player'

export function useAudioPlayer() {
  const playerStore = usePlayerStore()
  const isReady = ref(false)

  // === БЕЗОПАСНОЕ ВОСПРОИЗВЕДЕНИЕ ===
  const safePlay = async (audio) => {
    if (!audio) return false
    try {
      await audio.play()
      return true
    } catch (error) {
      if (error.name === 'AbortError') {
        // Ожидаемое поведение при переключении трека
        return false
      }
      console.error('Ошибка воспроизведения:', error)
      return false
    }
  }

  // === ИНИЦИАЛИЗАЦИЯ ===
  const initPlayer = (element) => {
    if (!element) {
      console.error('Плеера нет :(')
      return
    }
    playerStore.setAudioRef(element)
    element.addEventListener('canplay', () => {
      isReady.value = true
    })
    if (element.readyState >= 3) {
      isReady.value = true
    }
  }

  // === ВОСПРОИЗВЕДЕНИЕ ТРЕКА ===
  const playTrack = async (track) => {
    const audio = playerStore.audioRef
    if (!audio) {
      console.error('Плеер не инициализирован')
      return
    }

    try {
      // Если тот же трек — переключаем паузу
      if (playerStore.currentTrack && playerStore.currentTrack._id === track._id) {
        if (playerStore.isPlaying) {
          audio.pause()
          playerStore.setPlaying(false)
        } else {
          const success = await safePlay(audio)
          if (success) playerStore.setPlaying(true)
        }
        return
      }

      // Новый трек
      playerStore.setCurrentTrack(track)
      audio.src = track.track_file
      audio.load()

      const canPlayHandler = () => {
        audio.removeEventListener('canplay', canPlayHandler)
        safePlay(audio).then((success) => {
          if (success) playerStore.setPlaying(true)
        })
      }
      audio.addEventListener('canplay', canPlayHandler)

      if (audio.readyState >= 3) {
        audio.removeEventListener('canplay', canPlayHandler)
        const success = await safePlay(audio)
        if (success) playerStore.setPlaying(true)
      }
    } catch (error) {
      console.error('Ошибка воспроизведения:', error)
      playerStore.setPlaying(false)
    }
  }

  // === PLAY/PAUSE ===
  const togglePlay = () => {
    const audio = playerStore.audioRef
    if (!audio || !isReady.value) {
      console.warn('Плеер не готов или отсутствует')
      return
    }
    if (playerStore.isPlaying) {
      audio.pause()
      playerStore.setPlaying(false)
    } else {
      safePlay(audio).then((success) => {
        if (success) playerStore.setPlaying(true)
      })
    }
  }

  // === ОБНОВЛЕНИЕ ПРОГРЕССА ===
  const handleTimeUpdate = () => {
    const audio = playerStore.audioRef
    if (!audio) return
    const current = audio.currentTime
    const total = audio.duration
    if (total) {
      const progress = (current / total) * 100
      playerStore.setProgress(progress)
    }
  }

  // === ОКОНЧАНИЕ ТРЕКА ===
  const handleTrackEnd = () => {
    const audio = playerStore.audioRef
    if (!audio) return

    if (playerStore.repeat) {
      audio.currentTime = 0
      safePlay(audio).then(() => {
        playerStore.setPlaying(true)
      })
    } else {
      playerStore.setPlaying(false)
      playerStore.setProgress(0)
      const next = playerStore.getNextTrack()
      if (next) playTrack(next)
    }
  }

  // === ПЕРЕМОТКА ===
  const seekTo = (percentage) => {
    const audio = playerStore.audioRef
    if (!audio || !playerStore.currentTrack) return
    const newTime = (percentage / 100) * audio.duration
    audio.currentTime = newTime
    playerStore.setProgress(percentage)
  }

  // === ГРОМКОСТЬ ===
  const updateVolume = () => {
    const audio = playerStore.audioRef
    if (!audio) return
    audio.volume = playerStore.volume / 100
  }

  // === ПЕРЕКЛЮЧЕНИЕ ТРЕКОВ ===
  const nextTrack = () => {
    const track = playerStore.getNextTrack()
    if (track) playTrack(track)
  }

  const prevTrack = () => {
    const track = playerStore.getPrevTrack()
    if (track) playTrack(track)
  }

  // === REPEAT / SHUFFLE ===
  const toggleRepeat = () => playerStore.toggleRepeat()
  const toggleShuffle = () => playerStore.toggleShuffle()

  // === АВТОМАТИЧЕСКАЯ ЗАГРУЗКА ПРИ СМЕНЕ ТРЕКА ===
  watch(() => playerStore.currentTrack, (newTrack) => {
    const audio = playerStore.audioRef
    if (!newTrack || !audio) return

    isReady.value = false
    playerStore.setPlaying(false)
    playerStore.setProgress(0)
    audio.src = newTrack.track_file
    audio.load()

    const handler = () => {
      isReady.value = true
      audio.removeEventListener('canplay', handler)
      safePlay(audio).then((success) => {
        if (success) playerStore.setPlaying(true)
      })
    }
    audio.addEventListener('canplay', handler)
    if (audio.readyState >= 3) handler()
  }, { immediate: false })

  return {
    initPlayer,
    playTrack,
    togglePlay,
    handleTimeUpdate,
    handleTrackEnd,
    seekTo,
    updateVolume,
    nextTrack,
    prevTrack,
    toggleRepeat,
    toggleShuffle,
    isReady,
  }
}