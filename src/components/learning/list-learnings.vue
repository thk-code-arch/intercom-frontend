<template>
    <div class="py-4">
      <div class="py-4">
         <router-link class="float-right" to="/learning/add"><button class="inline-block px-3 py-1 mb-2 mr-2 font-semibold text-white bg-gray-800 rounded-full">+ Add Learning</button></router-link>
      </div>
            <div>
                <h2 class="text-2xl font-semibold leading-tight">Public</h2>
            </div>
            <div class="grid lg:grid-cols-6 gap-2 sm:grid-cols-2">
              <div class="" v-for="(theLearning, theLearning_idx) in learnings" :key="theLearning_idx">
                  <Learning-Card v-bind:theLearning="theLearning"/>
        </div>
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
import LearningService from "@/services/learning.service"
export default {
  name: 'list-learnings',
  components: {
    LearningCard
  },
  computed: {
  },
  mounted(){
      //get actaual chatroomid
      LearningService.getAllLearningPublic().then(
      response => {
        // connect to room
        this.learnings = response.data;
        console.log("learning response",this.learnings);
      },
      error => {
        console.log(error);
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
 data(){
  return {
    learnings: {},
  }
 },
};
</script>
