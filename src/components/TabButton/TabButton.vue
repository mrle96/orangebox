<script setup>

import { useTypeOfPlayList } from '@/stores/TypeOfPlayList';
import { defineProps,defineEmits } from 'vue';


const  store=useTypeOfPlayList();

const changeTab=(newTabValue)=>{
  console.log(newTabValue,store.currenTab)
 store.changeTab(newTabValue)
}

</script>
<template>
     <div class="flex divide-x divide-orange-400 border-b border-b-orange-500 ">
        <button @click="changeTab('musicTab')" 
         :class="['flex-1 bg-gradient-to-br via-amber-600 px-2 py-1 text-white hover:via-orange-600 active:via-amber-700  text-xs',store.currenTab==='musicTab' && 'via-orange-700' 
          
        ]">Music</button>
        <button  @click="changeTab('videoTab')"  :class="['flex-1 bg-gradient-to-br via-amber-600 px-2 py-1 text-white hover:via-orange-600 active:via-amber-700  text-xs',store.currenTab==='videoTab' && 'via-orange-700']" >Video</button>
      </div>
</template>  W