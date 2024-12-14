import { ref, computed ,watch} from "vue";
import { defineStore } from "pinia";

export const useMusicPlayList = defineStore("musicPlayList", () => {
  const currentPlaying = ref(0);
  const currentPlayingIndex = ref(0);
  const arrOfSongs = ref([]);

  const resetPlaying=()=>{
    currentPlaying.value=0;
    currentPlayingIndex.value=undefined;
    arrOfSongs.value=arrOfSongs.value.map((song)=>{
      song.isPlaying=false;
      return song;
    })
  }
  const addNewAudioFile = (audioObj) => {
    arrOfSongs.value.push(audioObj);
  };

  const setCurrentPlaying = (newCurrentSongIndex) => {
   
    if (arrOfSongs.value.length > newCurrentSongIndex) {
      currentPlayingIndex.value = newCurrentSongIndex;
      currentPlaying.value = arrOfSongs.value[newCurrentSongIndex];
    }

    arrOfSongs.value = arrOfSongs.value.map((item, index) => {
      item.isPlaying = index === currentPlayingIndex.value;
      return item;
    });
  };

  const getNext = () => {
    if (currentPlayingIndex.value < arrOfSongs.value.length - 1) {
      setCurrentPlaying(currentPlayingIndex.value + 1);
    } else {
      setCurrentPlaying(0); // Resetuje na početak ako je poslednja pesma
    }
  };
  
  const getPrevius = () => {
    if (currentPlayingIndex.value > 0) {
      setCurrentPlaying(currentPlayingIndex.value - 1);
    } else {
      setCurrentPlaying(arrOfSongs.value.length - 1); // Prebaci na poslednju pesmu ako je trenutni indeks 0
    }
  };
  
  const getAllSongs = () => {
    return arrOfSongs.value;
  };

  return {
    getPrevius,
    getNext,
    currentPlayingIndex,
    getAllSongs,
    arrOfSongs,
    addNewAudioFile,
    setCurrentPlaying,
    currentPlaying,
    resetPlaying,
  };
});
