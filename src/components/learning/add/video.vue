<template>
  <div>
  <FormulateForm @submit="handleFetch">
      <FormulateInput
        label="Paste Video URL"
        type="text"
        name="scrapeurl"
        v-model="scrapeurl"
        placeholder="paste Video URL e.g https://www.youtube.com/watch?v=5qap5aO4i9A"
        validation="required"
      />
      <FormulateInput label="Fetch!" type="submit" />
  </FormulateForm>
  <div v-if="scrapedObject" class="flex flex-row">
    <div class="w-1/2">
      <img class="p-4" :src="scrapedObject.cachedImage">
    </div>
    <div class="w-1/2">
      <FormulateForm @submit="handlePostVideo">
        <FormulateInput
          label="Set Title"
          type="text"
          name="VideoTitle"
          v-model="scrapedObject.title"
          validation="required"
        />
        <FormulateInput
          label="Set Description"
          type="textarea"
          validation="required"
          name="VideoDescription"
          v-model="scrapedObject.description"
        />
  <pre> // TODO Add #TAGS </pre>
     <FormulateInput class="btn btn-blue" label="Publish Learning" type="submit" />
     </FormulateForm>
    </div>
  </div>
  </div>
</template>
<script>
import FetchService from "@/services/fetch.service.js"
export default {
  name:'AddVideo',
  components:{
  },
  computed: {
  },
  methods: {
    handleFetch(){
      FetchService.fetchVideo(this.scrapeurl)
        .then(response => {
          this.scrapedObject = response.data;
        })
        .catch(() => {
          console.log("error");
        });
    }
  },
  data() {
    return {
      scrapeurl:"",
      scrapedObject:null
    }
  }
}
</script>
