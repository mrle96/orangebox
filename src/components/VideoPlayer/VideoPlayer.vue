<script setup>
import { ref, watch } from "vue";
import Play from "../icons/Play.vue";
import Pause from "../icons/Pause.vue";
import Forward from "../icons/Forward.vue";
import Backward from "../icons/Backward.vue";
import Unmute from "../icons/Unmute.vue";
import Mute from "../icons/Mute.vue";
import { useMusicPlayList } from "@/stores/MusicPlayList";
import { useVideoPlayList } from "@/stores/VideoPlayList";
const videoPlayListStore = useVideoPlayList();
const videoTag = ref();
const trackLengthDIV = ref();
const currentPrecente = ref(0);
const currentVideoValue = ref();
const videoDuration = ref();
const videoTagVolume = ref(100);
const isVideoPlaying = ref(false);
const isVideoMuted = ref(false);

// Praćenje promene trenutnog videa koji se pušta
watch(
  () => videoPlayListStore.currentPlaying,
  (newVideo) => {
    videoTag.value.src = newVideo.path;
    videoTag.value.play();
    isVideoPlaying.value = true;
  }
);

// Ažuriranje trenutnog vremena videa
function updateCurrentVideoValue(e) {
  currentVideoValue.value = e.target.currentTime;
}

// Dohvatanje trajanja videa
function getVideoDuration(e) {
  videoDuration.value = e.target.duration;
}

// Ažuriranje trenutnog vremena videa kada korisnik klikne na progres bar
function userUpdateVideoCurrentValue(e) {
  const boundingRect = trackLengthDIV.value.getBoundingClientRect();
  const width = boundingRect.width;
  const offsetX = e.offsetX;
  const percent = Math.round((offsetX / width) * 100);
  const newCurrentVideoTime = (percent * videoDuration.value) / 100;
  videoTag.value.currentTime = newCurrentVideoTime;
}

// Promena jačine zvuka na osnovu klizne kontrole
function changeVolume() {
  videoTag.value.volume = videoTagVolume.value / 100;
}

// Prebacivanje između zvučnog isključivanja (mute) i uključenosti zvuka
function toggleVideoVolume() {
  isVideoMuted.value = !isVideoMuted.value;
  videoTag.value.muted = isVideoMuted.value;
}

// Ažuriranje procenta trenutnog vremena videa
watch(currentVideoValue, () => {
  currentPrecente.value = Math.round(
    (currentVideoValue.value / videoDuration.value) * 100
  );
});

// Funkcija za pauziranje i pokretanje videa
const togglePause = () => {
  if (isVideoPlaying.value) {
    videoTag.value.pause();
    isVideoPlaying.value = false;
  } else {
    videoTag.value.play();
    isVideoPlaying.value = true;
  }
};

</script>

<template>
  <div class="p-5 flex flex-col items-center bg-orange-800/25 rounded-2xl border-orange-500 drop-shadow-md self-end w-full gap-4">
  
    <!-- Video element -->
    <video :controls="false" @canplay="getVideoDuration" ref="videoTag" @timeupdate="updateCurrentVideoValue"    />
  
    <!-- Progres bar -->
    <div class="w-full relative">
      <div 
        @click="userUpdateVideoCurrentValue" 
        ref="trackLengthDIV" 
        class="w-full hover:cursor-pointer bg-orange-500 h-1 absolute rounded-lg">
      </div>
      <div 
        :style="{ width: `${currentPrecente}%` }" 
        class="pointer-events-none bg-orange-700 rounded-lg h-1 absolute">
      </div>
    </div>
  
    <!-- Dugmadi za kontrolu -->
    <div class="flex w-7/12 mr-auto">
      <div class="flex items-center gap-3">
        <!-- Mute/Unmute dugme -->
        <button @click="toggleVideoVolume">
          <Mute v-if="isVideoMuted" />
          <Unmute v-else />
        </button>
        <!-- Klizna kontrola za jačinu zvuka -->
        <input @input="changeVolume" v-model="videoTagVolume" type="range" class="accent-orange-800" />
      </div>

      <!-- Dugmadi za navigaciju -->
      <div class="flex gap-1 ml-auto">
        <button
          @click="musicPlayListStore.getPrevius"
          class="p-2 border rounded-xl border-orange-500/30 bg-orange-400/40 hover:scale-105 transition-all active:bg-orange-500"
        >
          <Backward />
        </button>
        <button 
          @click="togglePause"
          class="p-2 border rounded-xl border-orange-500/30 bg-orange-400/40 hover:scale-105 transition-all active:bg-orange-500"
        >
          <Pause v-if="isVideoPlaying" />
          <Play v-else />
        </button>
        <button
          @click="musicPlayListStore.getNext"
          class="p-2 border rounded-xl border-orange-500/30 bg-orange-400/40 hover:scale-105 transition-all active:bg-orange-500"
        >
          <Forward />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
