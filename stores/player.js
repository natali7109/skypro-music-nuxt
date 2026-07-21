import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    currentTrack: null,
    playlist: [],
    shuffledPlaylist: [],
    isPlaying: false,
    progress: 0,
    volume: 50,
    audioRef: null,
    repeat: false,
    shuffle: false,
  }),

  actions: {
    setCurrentTrack(track) {
      this.currentTrack = track
    },
    setPlaylist(tracks) {
      this.playlist = tracks || []
      if (this.shuffle) {
        this.shuffledPlaylist = this.shuffleArray([...this.playlist])
      }
    },
    setPlaying(isPlaying) {
      this.isPlaying = isPlaying
    },
    setProgress(progress) {
      this.progress = progress
    },
    setVolume(volume) {
      this.volume = volume
    },
    setAudioRef(element) {
      this.audioRef = element
      if (this.audioRef) {
        this.audioRef.volume = this.volume / 100
      }
    },
    toggleRepeat() {
      this.repeat = !this.repeat
    },
    toggleShuffle() {
      this.shuffle = !this.shuffle
      if (this.shuffle) {
        this.shuffledPlaylist = this.shuffleArray([...this.playlist])
      } else {
        this.shuffledPlaylist = []
      }
    },
    shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
      return arr
    },
    getCurrentPlaylist() {
      return this.shuffle ? this.shuffledPlaylist : this.playlist
    },
    getNextTrack() {
      const list = this.getCurrentPlaylist()
      if (!list.length) return null
      const currentId = this.currentTrack?._id
      const currentIndex = list.findIndex(t => String(t._id) === String(currentId))
      if (currentIndex === -1) return list[0] || null
      const nextIndex = (currentIndex + 1) % list.length
      return list[nextIndex] || null
    },
    getPrevTrack() {
      const list = this.getCurrentPlaylist()
      if (!list.length) return null
      const currentId = this.currentTrack?._id
      const currentIndex = list.findIndex(t => String(t._id) === String(currentId))
      if (currentIndex === -1) return list[list.length - 1] || null
      const prevIndex = (currentIndex - 1 + list.length) % list.length
      return list[prevIndex] || null
    },
    resetPlayer() {
      this.currentTrack = null
      this.isPlaying = false
      this.progress = 0
      if (this.audioRef) {
        this.audioRef.pause()
        this.audioRef.currentTime = 0
      }
    }
  }
})