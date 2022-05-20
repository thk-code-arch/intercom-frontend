<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="w-full px-4 sm:px-8">
    <div class="flex p-4 flex-row w-3/4 mx-auto">
      <INTERCOM class="p-12 border-gray-400 border-r-2" />
      <CODEARCH class="p-12" />
    </div>
    <div class="w-3/4 mx-auto">
      <Changelog />
    </div>
  </div>
</template>
<script>
import Changelog from '../components/about/Changelog';
import CODEARCH from '../assets/LOGO_CODEARCH';
import INTERCOM from '../assets/LOGO_INTERCOM';
export default {
  name: 'home',
  components: {
    Changelog,
    CODEARCH,
    INTERCOM,
  },
};
</script>
