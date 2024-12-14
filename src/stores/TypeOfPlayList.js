import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTypeOfPlayList = defineStore('typeofPlayList', () => {
  const currenTab = ref('musicTab');
  const currentViewport=ref('musicViewport')
  const showSideBar=ref(true)
  const avelibeTabs = ['musicTab', 'videoTab'];
  const avelibeViewports=['musicViewport','videoViewport']
  const changeTab = (newTabValue) => {
    const isCorrectNewTabValue = avelibeTabs.some((item) => item === newTabValue)
    if (isCorrectNewTabValue) {
      currenTab.value = newTabValue;
    } else {
      throw new Error('Invalide Tab Value')
    }
  }

  const changeViewport=(newViewportValue)=>{
    
    currentViewport.value=newViewportValue;
  }
  
 const toggleShowSideBar=()=>{showSideBar.value=!showSideBar}

  return { currenTab,currentViewport, changeTab,changeViewport }
})
