import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTypeOfPlayList = defineStore('typeofPlayList', () => {
  const currenTab = ref('musicTab');
  const showSideBar=ref(true)

  const avelibeTabs = ['musicTab', 'videoTab'];

  const changeTab = (newTabValue) => {
    const isCorrectNewTabValue = avelibeTabs.some((item) => item === newTabValue)
    if (isCorrectNewTabValue) {
      currenTab.value = newTabValue;
    } else {
      throw new Error('Invalide Tab Value')
    }
  }
  
 const toggleShowSideBar=()=>{showSideBar.value=!showSideBar}

  return { currenTab, changeTab }
})
