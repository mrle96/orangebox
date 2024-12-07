import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useMusicPlayList = defineStore("musicPlayList", () => {
  const currentPlaying = ref();
  const currentPlayingIndex = ref(0);
  const arrOfSongs = ref([]);

  const addNewAudioFile = (audioObj) => {
    arrOfSongs.value.push(audioObj);
  };
  
  const setCurrentPlaying = (newCurrentSongIndex) => {
    if (arrOfSongs.value.length > newCurrentSongIndex) {
      currentPlaying.value = arrOfSongs.value.find((item, index) => {
        if (index === newCurrentSongIndex) {
          return item;
        }
      });
    }
    arrOfSongs.value=arrOfSongs.value.map((item,index)=>{
      if(index===newCurrentSongIndex){
        item.isPlaying=true;
      }else{
        item.isPlaying=false;
      }
      return item;
    }) 
  };

  const getAllSongs = () => {
    return arrOfSongs.value;
  };
  return {
    getAllSongs,
    arrOfSongs,
    addNewAudioFile,
    setCurrentPlaying,
    currentPlaying,
  };
});
