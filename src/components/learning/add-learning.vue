<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="px-4">
    <div class="container p-8 mx-auto my-8 bg-white rounded-lg">
        <!-- Top bar -->
        <div class="flex items-center flex-none px-6 py-2 mb-4 border-b">
            <div class="flex flex-col">
                <h1 class="mb-2 text-2xl font-medium">Add Learning</h1>
                <div class="text-sm truncate text-grey-dark">
                  Add content
                </div>
            </div>
        </div>
        <!-- TEXT -->
        <div class="px-6 ">
          <FormulateInput
            v-model="selectedCat"
            :options="category"
            type="select"
            placeholder="Select a category"
            label="Which category you want to publish some content"
          />
        <component v-bind:is="selectedCat" />
        </div>
  </div>
  </div>
</template>

<script>
import Link from './add/link';
import PDF from './add/pdf';
import AddVideo from './add/video';
export default {
  name:'Add-Learning',
  components:{
    Link,
    PDF,
    AddVideo
  },
  computed: {
  },
  methods: {
  },
  data() {
    return {
      selectedCat: 'AddVideo',
                   dynamicComponent: {         
                   template: `<p>Wheee</p>`       
                              },
      category:
        {AddVideo: 'Youtube / Vimeo', Link: 'Website Link', PDF: 'PDF File'}
    }
  }
}
</script>
