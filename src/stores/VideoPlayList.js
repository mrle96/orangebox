import { ref, computed ,watch} from "vue";
import { defineStore } from "pinia";

export const useVideoPlayList = defineStore("musicPlayList", () => {
  const currentPlaying = ref(0);
  const currentPlayingIndex = ref(0);
  const arrOfvideos = ref([]);

  const videoaddNewVideoFile = (VideooObj) => {
    arrOfvideos.value.push(VideooObj);
  };

  const setCurrentPlaying = (newCurrentvideoIndex) => {
   
    if (arrOfvideos.value.length > newCurrentvideoIndex) {
      currentPlayingIndex.value = newCurrentvideoIndex;
      currentPlaying.value = arrOfvideos.value[newCurrentvideoIndex];
    }

    arrOfvideos.value = arrOfvideos.value.map((item, index) => {
      item.isPlaying = index === currentPlayingIndex.value;
      return item;
    });
  };

  const getNext = () => {
    if (currentPlayingIndex.value < arrOfvideos.value.length - 1) {
      setCurrentPlaying(currentPlayingIndex.value + 1);
    } else {
      setCurrentPlaying(0); // Resetuje na početak ako je poslednja pesma
    }
  };
  
  const getPrevius = () => {
    if (currentPlayingIndex.value > 0) {
      setCurrentPlaying(currentPlayingIndex.value - 1);
    } else {
      setCurrentPlaying(arrOfvideos.value.length - 1); // Prebaci na poslednju pesmu ako je trenutni indeks 0
    }
  };
  
  const getAllvideos = () => {
    return arrOfvideos.value;
  };

  return {
    getPrevius,
    getNext,
    currentPlayingIndex,
    getAllvideos,
    arrOfvideos,
    videoaddNewVideoFile,
    setCurrentPlaying,
    currentPlaying,
  };
});
