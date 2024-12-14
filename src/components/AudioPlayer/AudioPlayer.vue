<script setup>
import {
  ref,
  useTemplateRef,
  watch,
  onUnmounted,
  onUpdated,
  watchEffect,
  onMounted,
} from "vue";
import Play from "../icons/Play.vue";
import Pause from "../icons/Pause.vue";
import Forward from "../icons/Forward.vue";
import Backward from "../icons/Backward.vue";
import Unmute from "../icons/Unmute.vue";
import Mute from "../icons/Mute.vue";
import s1 from '../../assets/ZVONKO BOGDAN I SERBUS - U tom Somboru.mp3'
import { useMusicPlayList } from "@/stores/MusicPlayList";
import { AVBars } from "vue-audio-visual";
import Logo from "../icons/Logo.vue";


const indexSong=ref(0)
const musicPlayListStore = useMusicPlayList()
const trackLengthDIV = ref();
const currentPrecente = ref(0);
const currentSongValue = ref();
const songDuration = ref();
const audioTagVolume = ref(100);
const audioTag = ref();
const isAudioPlaying = ref(false);
const isAudioMuted = ref(false);
const src = ref('')

watch(
  () => musicPlayListStore.currentPlaying,
  (newSong, oldSong) => {
    audioTag.value.src = newSong.path
    audioTag.value.play()
    isAudioPlaying.value = true;
    src.value = newSong.path
  }
);


function updateCurrentSongValue(e) {
  currentSongValue.value = e.target.currentTime;
}
function getSongDuration(e) {
  songDuration.value = e.target.duration;
}
function userUpdateSongCurrentValue(e) {
  const Bounding = trackLengthDIV.value.getBoundingClientRect();
  const width = Bounding.width;
  const offsetX = e.offsetX;
  const p = Math.round((offsetX / width) * 100);
  const newCurrentSongTime = (p * songDuration.value) / 100;
  audioTag.value.currentTime = newCurrentSongTime;
}
function changeVolume(e) {
  audioTag.value.volume = audioTagVolume.value / 100;
}
function toggleAudioVolume() {
  isAudioMuted.value = !isAudioMuted.value;
  audioTag.value.muted = isAudioMuted.value;
}
watch(currentSongValue, () => {
  currentPrecente.value = Math.round(
    (currentSongValue.value / songDuration.value) * 100
  );
});




const togglePause = () => {
  console.log(musicPlayListStore.name)
  if (isAudioPlaying.value) {
    audioTag.value.pause();
    isAudioPlaying.value = false;
  } else {
    audioTag.value.play();
    isAudioPlaying.value = true;
  }
};




</script>

<template>
  <div class="p-5 flex flex-col items-center bg-orange-800/25 rounded-2xl border-orange-500 drop-shadow-md self-end w-full  gap-4">

  
    <audio :controls="false" @canplay="getSongDuration" ref="audioTag" @timeupdate="updateCurrentSongValue" />


    <div class="w-full relative ">

      <div @click="userUpdateSongCurrentValue" ref="trackLengthDIV"
        class="w-full h-1 hover:cursor-pointer bg-orange-500 p-1 absolute rounded-lg "></div>
      <div :style="{ width: `${currentPrecente}%` }"
        class=" h-1 pointer-events-none bg-orange-700 rounded-lg p-1 absolute"></div>
    </div>

    <div class="flex w-7/12 mr-auto">
      <div class="flex items-center gap-3">
        <button @click="toggleAudioVolume">
          <Mute v-if="isAudioMuted" />
          <Unmute v-else />
        </button>
        <input @input="changeVolume" v-model="audioTagVolume" type="range" class="accent-orange-800" />
      </div>

      <div class="flex gap-1 ml-auto">
        <button
        @click="musicPlayListStore.getPrevius"
          class="p-2 border rounded-xl border-orange-500/30 bg-orange-400/40 hover:scale-105 transition-all active:bg-orange-500">
          <Backward />
        </button>
        <button @click="togglePause"
          class="p-2 border rounded-xl border-orange-500/30 bg-orange-400/40 hover:scale-105 transition-all active:bg-orange-500">
          <Pause v-if="isAudioPlaying" />
          <Play v-else />
        </button>
        <button 
          @click="musicPlayListStore.getNext"
          class="p-2 border rounded-xl border-orange-500/30 bg-orange-400/40 hover:scale-105 transition-all active:bg-orange-500">
          <Forward />
        </button>
      </div>
    </div>
  </div>
</template>
