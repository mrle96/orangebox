<script setup>
import { defineProps } from 'vue';
import { useMusicPlayList } from '@/stores/MusicPlayList';
import Play from '../icons/Play.vue';
const props = defineProps({
  artist: String,
  trackName: String,
  time: String,
  url: String,
  playSong: Function,
  isPlaying: Boolean,
})
const musicPlayList = useMusicPlayList()

</script>
<template>
  <div :class="[
    'border-b border-b-orange-500  px-1 py-2 drop-shadow-lg',
    isPlaying ? 'bg-orange-600' : 'bg-amber-800/35'
  ]">
    <div class="font-semibold text-white/65 text-sm">{{ trackName }}</div>
    <div class="flex justify-between text-sm">
      <div class="text-white/65 ">3:45</div>
    </div>
    <button class="ml-auto block  opacity-45 border-transparent hover:border-white hover:opacity-100 flex items-center justify-center transition-all scale-105 border rounded-full p-[2px]" @click="$emit('playSong')">
      <Play/>
    </button>
  </div>
</template>