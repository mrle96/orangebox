<script setup>
import { RouterLink, RouterView } from "vue-router";
import AppLayout from "./components/AppLayout/AppLayout.vue";
import MainLayout from "./components/MainLayout/MainLayout.vue";
import Navbar from "./components/Navbar/Navbar.vue";
import SideBarLayout from "./components/SideBarLayout/SideBarLayout.vue";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer.vue";
import Logo from "./components/icons/Logo.vue";
import AudioPlayerPage from "./views/AudioPlayerPage.vue";
import { watch, onMounted, ref } from "vue";
import { useTypeOfPlayList } from "./stores/TypeOfPlayList";
import VideoPlayerPage from "./views/VideoPlayerPage.vue";

const tabStore = useTypeOfPlayList();
</script>

<template>
  <MainLayout>
    <Navbar />
    <!-- Dugme za promenu viewport-a -->
    <button @click="tabStore.changeViewport('videoViewport')">{{ tabStore.currentViewport }} V</button>
    <button @click="tabStore.changeViewport('musicViewport')">{{ tabStore.currentViewport }} M</button>
    <AppLayout>
      <SideBarLayout />  
        <!-- Prikazivanje sadržaja na osnovu trenutnog viewport-a -->   
        
          <AudioPlayerPage v-if="tabStore.currentViewport=== 'musicViewport'"/> 
         
        
          <VideoPlayerPage v-if="tabStore.currentViewport=== 'videoViewport'"/>
       
    </AppLayout>
  </MainLayout>
</template>
