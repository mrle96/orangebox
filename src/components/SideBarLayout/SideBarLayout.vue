<script setup>
import { useRouter } from "vue-router";
import TabButton from "../TabButton/TabButton.vue";
import UploadTab from "../UplotadTab/UploadTab.vue";
import { ref, watch } from "vue";
import { useMusicPlayList } from "@/stores/MusicPlayList";
import { useTypeOfPlayList } from "@/stores/TypeOfPlayList";
import SongCard from "../SongCard/SongCard.vue";
import { nextTick } from 'vue';
import { useVideoPlayList } from "@/stores/VideoPlayList";

const tabStore = useTypeOfPlayList();
const musicPlayListStore = useMusicPlayList();
const videoPlayListStore= useVideoPlayList()
const router = useRouter();


const handleClickCardPlayBtn = (index) => {
  // Menjaj viewport na 'musicViewport'
  tabStore.changeViewport('musicViewport');

  // Nakon što Vue završi sa ažuriranjem DOM-a, pokreni pesmu
  nextTick(() => {
    musicPlayListStore.setCurrentPlaying(index);
  });

}

</script>
<template>
  <div
    class="flex relative resize-x hover:resize h-full w-2/6 max-w-[330px] flex-col border-r border-r-orange-500 bg-amber-500/50">
    <TabButton />
    <div class="flex-grow overflow-y-scroll" v-if="tabStore.currenTab === 'musicTab'">
      <SongCard :isPlaying="song.isPlaying" :url="song.url" :key="song.track"
        v-for="(song, index) in musicPlayListStore.arrOfSongs" :trackName="song.name"
        @playSong="handleClickCardPlayBtn(index)" />
    </div>
    <div class="flex-grow overflow-y-scroll" v-if="tabStore.currenTab === 'videoTab'">
    <SongCard :isPlaying="video.isPlaying" :url="video.url" :key="video.track"
        v-for="(video, videoIndex) in videoPlayListStore.arrOfvideos" :trackName="video.name"
        @playSong="handleClickCardPlayBtn(videoIndex)" />
      </div>
    <UploadTab />
  </div>
</template>
