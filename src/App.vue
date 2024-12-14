<script setup>
import { RouterLink, RouterView } from "vue-router";
import AppLayout from "./components/AppLayout/AppLayout.vue";
import MainLayout from "./components/MainLayout/MainLayout.vue";
import Navbar from "./components/Navbar/Navbar.vue";
import SideBarLayout from "./components/SideBarLayout/SideBarLayout.vue";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer.vue";
import Logo from "./components/icons/Logo.vue";
import AudioPlayerPage from "./views/AudioPlayerPage.vue";
import AboutPage from "./views/AboutPage.vue";

</script>

<template>
  <MainLayout>
    <Navbar />
    <AppLayout>
      <SideBarLayout />
      <RouterView>
      </RouterView>
      
    </AppLayout>
  </MainLayout>
</template>
