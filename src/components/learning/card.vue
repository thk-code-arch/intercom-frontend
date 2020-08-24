<template>
<div class="max-w-sm overflow-hidden bg-white rounded">
    <video-embed css="w-full" :src="url"></video-embed>
  <div class="px-6 py-4">
    <div class="mb-2 text-xl font-bold">The Coldest Sunset</div>
    <p class="text-base text-gray-700">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#photography</span>
    <span class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#travel</span>
    <span class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#winter</span>
  </div>
</div>
</template>

<script>
export default {
  name:'Learning-Card',
  component:{
  },
  data() {
    return {
          url: "https://www.youtube.com/watch?v=HOUjTyOWQ7U",
    }
  }
}
</script>
<style>
.embed-responsive-item{
width:100%
}
</style>
