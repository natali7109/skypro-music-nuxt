<template>
  <div class="centerblock__content">
    <h2 class="centerblock__h2">Треки</h2>
    <!-- ... -->
    <div class="content__playlist">
  <Track
    v-for="track in filteredTracks"
    :key="track.id"
    :track="track"
    @select="$emit('select', track)"
  />
</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Track from './Track.vue'

const props = defineProps({
  tracks: {
    type: Array,
    required: true
  },
  searchQuery: {
    type: String,
    default: ''
  },
  filterBy: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['select'])


const filteredTracks = computed(() => {
 console.log('🎵 Треки получены:', props.tracks) 
  let result = [...props.tracks]
  console.log('🔍 filteredTracks:', result)

  if (props.searchQuery) {
    const query = props.searchQuery.toLowerCase()
    result = result.filter(track =>
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query)
    )
  }

  if (props.filterBy === 'artist') {
    result.sort((a, b) => a.artist.localeCompare(b.artist))
  } else if (props.filterBy === 'year') {
    result.sort((a, b) => new Date(b.date) - new Date(a.date))
  } else if (props.filterBy === 'title') {
    result.sort((a, b) => a.title.localeCompare(b.title))
  }

  return result
})
</script>