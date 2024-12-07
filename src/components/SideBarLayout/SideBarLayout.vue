<script setup>
import TabButton from "../TabButton/TabButton.vue";
import UploadTab from "../UplotadTab/UploadTab.vue";
import { ref, watch } from "vue";
import { useMusicPlayList } from "@/stores/MusicPlayList";
import { useTypeOfPlayList } from "@/stores/TypeOfPlayList";
import SongCard from "../SongCard/SongCard.vue";
const tabStore = useTypeOfPlayList();
const musicPlayListStore = useMusicPlayList();



</script>
<template>
  <div
    class="flex relative resize-x hover:resize h-full w-2/6 max-w-[330px] flex-col border-r border-r-orange-500 bg-amber-500/50"
  >
    <TabButton />
    <div
      class="flex-grow overflow-y-scroll"
      v-if="tabStore.currenTab === 'musicTab'"
    >
      <SongCard
        :isPlaying="song.isPlaying"
        :url="song.url"
        :key="song.track"
        v-for="(song,index) in musicPlayListStore.arrOfSongs"
        :trackName="song.name"
        @playSong="musicPlayListStore.setCurrentPlaying(index)"
      />
    </div>
    <UploadTab />
  </div>
</template>
