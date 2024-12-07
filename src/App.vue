<script setup>
import { RouterLink, RouterView } from "vue-router";
import AppLayout from "./components/AppLayout/AppLayout.vue";
import MainLayout from "./components/MainLayout/MainLayout.vue";
import Navbar from "./components/Navbar/Navbar.vue";
import SideBarLayout from "./components/SideBarLayout/SideBarLayout.vue";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer.vue";
import Logo from "./components/icons/Logo.vue";

</script>

<template>
  <MainLayout>
    <Navbar />
    <AppLayout>
      <SideBarLayout />
      <div class="w-full flex pb-10 px-10 flex-col justify-between">
        <div class=" self-stretch flex-1 grid place-content-center  ">
          <Logo/>
        </div>
        <AudioPlayer />
      </div>
    </AppLayout>
  </MainLayout>
</template>
