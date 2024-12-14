<script setup>
import { useMusicPlayList } from '@/stores/MusicPlayList';
import { ref, watch } from 'vue';
import { uuid } from 'vue-uuid';
import { useVideoPlayList } from '@/stores/VideoPlayList';
const inputFile=ref(null)
const musicPlayListStore=useMusicPlayList()
const videoPlayList=useVideoPlayList()
const getAudioFile = (e) => {
  


  const inputFiles = e.target.files; // Direktno uzmi `files` objekat
  

  for (let i = 0; i < inputFiles.length; i++) { // Ispravi uslov petlje
   const path=URL.createObjectURL(inputFiles[i]);
   const name=inputFiles[i].name;
   const type=inputFiles[i].type;
   if(type.startsWith('audio')){
    musicPlayListStore.addNewAudioFile({path,name,isPlaying:false})
   }
   if(type.startsWith('video')){
    
    
    videoPlayList.videoAddNewVideoFile({path,name,isPlaying:false})
   }

   
};

}

</script>
<template>
  <div class="mt-auto flex w-full opacity-80 hover:opacity-100">
    <button
      class="text-sm flex flex-1 items-center gap-1 bg-gradient-to-br via-amber-600 px-2 py-1 text-white hover:via-orange-600 active:via-amber-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99"
        />
      </svg>
      New playlist
    </button>
    <label
      for="inputSongFile"
      type="file"
      class="text-sm flex flex-1 items-center gap-1 bg-gradient-to-br via-amber-600 px-2 py-1 text-white hover:via-orange-600 active:via-amber-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
        />
      </svg>
      Upload new file
    </label>
    <input
      multiple
      @change="getAudioFile"
      v-show="false"
      id="inputSongFile"
      type="file"
      accept="audio/*,video/*"
    />
  </div>
</template>
