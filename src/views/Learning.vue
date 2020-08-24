<template>
    <div class="container px-4 mx-auto sm:px-8">
        <div class="py-8">
            <div>
                <h2 class="text-2xl font-semibold leading-tight">Public</h2>
            </div>
                  <Learning-Card/>
        </div>
        <div class="py-8">
            <div>
                <h2 class="text-2xl font-semibold leading-tight">Project related</h2>
            </div>
        </div>
    </div>
</template>

<script>
import LearningCard from "@/components/learning/card";
export default {
  name: 'Learning',
  components: {
    LearningCard
  },
  computed: {
  },
  mounted() {
  },
 data(){
  return {
  }
 },
  methods: {
     }
};
</script>
