<script setup>
import AudioPlayer from '@/components/AudioPlayer/AudioPlayer.vue';
import Logo from '@/components/icons/Logo.vue';
</script>
<template>
    <div class="w-full flex pb-10 px-10 flex-col justify-between  ">
        <div class=" self-stretch flex-1 grid place-content-center  ">
            <Logo />
        </div>
        <AudioPlayer />
    </div>
</template>