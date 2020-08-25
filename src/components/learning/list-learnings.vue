<template>
    <div>
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
import LearningCard from "./card";
export default {
  name: 'list-learnings',
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
