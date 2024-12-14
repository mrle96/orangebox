<script setup>
import { ref, watch } from "vue";
import Play from "../icons/Play.vue";
import Pause from "../icons/Pause.vue";
import Forward from "../icons/Forward.vue";
import Backward from "../icons/Backward.vue";
import Unmute from "../icons/Unmute.vue";
import Mute from "../icons/Mute.vue";
import { useMusicPlayList } from "@/stores/MusicPlayList";

const musicPlayListStore = useMusicPlayList();
const audioTag = ref();
const trackLengthDIV = ref();
const currentPrecente = ref(0);
const currentSongValue = ref();
const songDuration = ref();
const audioTagVolume = ref(100);
const isAudioPlaying = ref(false);
const isAudioMuted = ref(false);

// Praćenje promene trenutne pesme koja se pušta
watch(
  () => musicPlayListStore.currentPlaying,
  (newSong) => {
    console.log("FIRE SONG")
    audioTag.value.src = newSong.path;
    audioTag.value.play();
    isAudioPlaying.value = true;
  }
);

// Ažuriranje trenutnog vremena pesme
function updateCurrentSongValue(e) {
  currentSongValue.value = e.target.currentTime;
}

// Dohvatanje trajanja pesme
function getSongDuration(e) {
  songDuration.value = e.target.duration;
}

// Ažuriranje trenutnog vremena pesme kada korisnik klikne na progres bar
function userUpdateSongCurrentValue(e) {
  const boundingRect = trackLengthDIV.value.getBoundingClientRect();
  const width = boundingRect.width;
  const offsetX = e.offsetX;
  const percent = Math.round((offsetX / width) * 100);
  const newCurrentSongTime = (percent * songDuration.value) / 100;
  audioTag.value.currentTime = newCurrentSongTime;
}

// Promena jačine zvuka na osnovu klizne kontrole
function changeVolume() {
  audioTag.value.volume = audioTagVolume.value / 100;
}

// Prebacivanje između zvučnog isključivanja (mute) i uključenosti zvuka
function toggleAudioVolume() {
  isAudioMuted.value = !isAudioMuted.value;
  audioTag.value.muted = isAudioMuted.value;
}

// Ažuriranje procenta trenutnog vremena pesme
watch(currentSongValue, () => {
  currentPrecente.value = Math.round(
    (currentSongValue.value / songDuration.value) * 100
  );
});

// Funkcija za pauziranje i pokretanje pesme
const togglePause = () => {
  if (isAudioPlaying.value) {
    audioTag.value.pause();
    isAudioPlaying.value = false;
  } else {
    audioTag.value.play();
    isAudioPlaying.value = true;
  }
};

// Funkcija za kraj peseme
const isEnded=()=>{
  isAudioPlaying.value=false;
}
</script>

<template>
  <div class="p-5 flex flex-col items-center bg-orange-800/25 rounded-2xl border-orange-500 drop-shadow-md self-end w-full gap-4">
  
    <!-- Audio element -->
    <audio @ended="isEnded" :controls="false" @canplay="getSongDuration" ref="audioTag" @timeupdate="updateCurrentSongValue" />
  
    <!-- Progres bar -->
    <div class="w-full relative">
      <div 
        @click="userUpdateSongCurrentValue" 
        ref="trackLengthDIV" 
        class="w-full  hover:cursor-pointer bg-orange-500  h-1 absolute rounded-lg">
      </div>
      <div 
        :style="{ width: `${currentPrecente}%` }" 
        class="   pointer-events-none bg-orange-700 rounded-lg h-1  absolute">
      </div>
    </div>
  
    <!-- Dugmadi za kontrolu -->
    <div class="flex w-7/12 mr-auto">
      <div class="flex items-center gap-3">
        <!-- Mute/Unmute dugme -->
        <button @click="toggleAudioVolume">
          <Mute v-if="isAudioMuted" />
          <Unmute v-else />
        </button>
        <!-- Klizna kontrola za jačinu zvuka -->
        <input @input="changeVolume" v-model="audioTagVolume" type="range" class="accent-orange-800" />
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
          <Pause v-if="isAudioPlaying" />
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
