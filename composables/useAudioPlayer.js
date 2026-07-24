import { ref, watch } from 'vue'
import { usePlayerStore } from '~/stores/player'

export function useAudioPlayer() {
  const playerStore = usePlayerStore()

  const initPlayer = (element) => {
    if (!element) {
      console.error('Плеера нет :(')
      return
    }
    playerStore.setAudioRef(element)
  }

  const playTrack = async (track) => {
    const audio = playerStore.audioRef
    if (!audio) {
      console.error('Плеер не инициализирован')
      return
    }

    try {
       
      if (playerStore.currentTrack && playerStore.currentTrack._id === track._id) {
        if (playerStore.isPlaying) {
          audio.pause()
          playerStore.setPlaying(false)
        } else {
          await audio.play()
          playerStore.setPlaying(true)
        }
        return
      }

      // Новый трек
      playerStore.setCurrentTrack(track)
      audio.src = track.track_file
      audio.load()

      // Ждём загрузки
      await new Promise((resolve) => {
        const onCanPlay = () => {
          audio.removeEventListener('canplay', onCanPlay)
          resolve()
        }
        audio.addEventListener('canplay', onCanPlay)
        if (audio.readyState >= 3) resolve()
      })

      await audio.play()
      playerStore.setPlaying(true)
    } catch (error) {
      if (error.name === 'AbortError') {
         
        return
      }
      console.error('Ошибка воспроизведения:', error)
      playerStore.setPlaying(false)
    }
  }

  const togglePlay = () => {
    const audio = playerStore.audioRef
    if (!audio) {
      console.warn('Плеер не инициализирован')
      return
    }

    if (playerStore.isPlaying) {
      audio.pause()
      playerStore.setPlaying(false)
    } else {
      audio.play()
        .then(() => playerStore.setPlaying(true))
        .catch((err) => {
           
          if (err.name === 'NotSupportedError' || err.name === 'AbortError') {
            if (playerStore.currentTrack) {
              playTrack(playerStore.currentTrack)
            }
          } else {
            console.warn('Не удалось воспроизвести:', err)
            playerStore.setPlaying(false)
          }
        })
    }
  }

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

  const handleTrackEnd = () => {
    const audio = playerStore.audioRef
    if (!audio) return

    if (playerStore.repeat) {
      audio.currentTime = 0
      audio.play().catch(() => {})
      playerStore.setPlaying(true)
    } else {
      playerStore.setPlaying(false)
      playerStore.setProgress(0)
      const next = playerStore.getNextTrack()
      if (next) {
        playTrack(next)
      }
    }
  }

  const seekTo = (percentage) => {
    const audio = playerStore.audioRef
    if (!audio || !playerStore.currentTrack) return
    const newTime = (percentage / 100) * audio.duration
    if (!isNaN(newTime) && isFinite(newTime)) {
      audio.currentTime = newTime
      playerStore.setProgress(percentage)
    }
  }

  const updateVolume = () => {
    const audio = playerStore.audioRef
    if (!audio) return
    audio.volume = playerStore.volume / 100
  }

  const nextTrack = () => {
    const track = playerStore.getNextTrack()
    if (track) playTrack(track)
  }

  const prevTrack = () => {
    const track = playerStore.getPrevTrack()
    if (track) playTrack(track)
  }

  const toggleRepeat = () => playerStore.toggleRepeat()
  const toggleShuffle = () => playerStore.toggleShuffle()

   
  watch(() => playerStore.currentTrack, (newTrack, oldTrack) => {
    if (newTrack && newTrack._id !== oldTrack?._id) {
      const audio = playerStore.audioRef
      if (!audio) return

      playerStore.setPlaying(false)
      playerStore.setProgress(0)
      audio.src = newTrack.track_file
      audio.load()

      const onCanPlay = () => {
        audio.removeEventListener('canplay', onCanPlay)
        audio.play()
          .then(() => playerStore.setPlaying(true))
          .catch(() => playerStore.setPlaying(false))
      }
      audio.addEventListener('canplay', onCanPlay)
      if (audio.readyState >= 3) onCanPlay()
    }
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
  }
}