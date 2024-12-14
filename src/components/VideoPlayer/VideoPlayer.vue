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
import Logo from "../icons/Logo.vue";

const videoRef=ref();
const isAudioPlaying=ref(false)
const currentDurationPercente=ref(0);
const trackLengthDIV=ref();
const videoTagVolume=ref(0)
const isAudioMuted=ref(false)
const playVideo=()=>{
  isAudioPlaying.value=!isAudioPlaying.value
  if(isAudioPlaying.value){
    videoRef.value.play();
  }else{
    videoRef.value.pause();
  }
}
const getCurrentDurationTime=()=>{
  currentDurationPercente.value=Math.round((videoRef.value.currentTime/videoRef.value.duration)*100)
}


function userUpdateSongCurrentValue(e) {

  const Bounding = trackLengthDIV.value.getBoundingClientRect();
  const width = Bounding.width;
  const offsetX = e.offsetX;
  const p = Math.round((offsetX / width) * 100);
  const newCurrentSongTime = (p * videoRef.value.duration) / 100;
  videoRef.value.currentTime = newCurrentSongTime;
}


</script>

<template>
  <div class=" flex flex-col   gap-3 p-3  ">
 
    <video  ref="videoRef"  @timeupdate="getCurrentDurationTime" class=" max-w-5xl relative z-10  block m-auto object-cover">
      <source src="" type="video/webm" />
      <source src="../../assets/230060_small.mp4"  type="video/mp4" />
      <p>
        Your browser doesn't support HTML video. Here is a
        <a href="" download="">link to the video</a> instead.
      </p>
    </video>
    <div
      class="p-5 flex flex-col items-center  bg-orange-800/25 rounded-2xl border-orange-500 drop-shadow-md self-end border-l-red-500 w-full gap-4">
      <div class="w-full relative  ">
        <div ref="trackLengthDIV" @click="userUpdateSongCurrentValue" class="w-full h-1 hover:cursor-pointer bg-orange-500 p-1 absolute rounded-lg "></div>
        <div  :style="{ width: `${currentDurationPercente}%` }"
        class="w-6/12 h-1 pointer-events-none bg-orange-700 rounded-lg p-1 absolute"></div>
      </div>
      <div class="flex w-7/12 mr-auto">
        <div class="flex items-center gap-3">
          <button>
            <Mute v-if="isAudioMuted" />
            <Unmute v-else />
          </button>
          <input  v-model="videoTagVolume" type="range" class="accent-orange-800" />
        </div>
        <div class="flex gap-1 ml-auto">
          <button
            class="p-2 border rounded-xl border-orange-500/30 bg-orange-400/40 hover:scale-105 transition-all active:bg-orange-500">
            <Backward />
          </button>
          <button
            @click="playVideo"
            class="p-2 border rounded-xl border-orange-500/30 bg-orange-400/40 hover:scale-105 transition-all active:bg-orange-500">
            <Pause v-if="isAudioPlaying" />
            <Play v-else />
          </button>
          <button
            class="p-2 border rounded-xl border-orange-500/30 bg-orange-400/40 hover:scale-105 transition-all active:bg-orange-500">
            <Forward />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
