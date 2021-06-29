<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <!--Modal-->
  <div
    class="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full modal"
  >
    <div
      class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
    ></div>
    <div
      class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded modal-container lg:max-w-4xl md:max-w-md"
    >
      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="px-6 py-4 text-left modal-content">
        <!--Title-->
        <div class="flex items-center justify-between pb-3">
          <p class="text-2xl font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="inline-block w-4 h-4 text-black fill-current"
              viewBox="0 0 24 24"
            >
              <path
                d="M7.074 1.408c0-.778.641-1.408 1.431-1.408.942 0 1.626.883 1.38 1.776-.093.336-.042.695.138.995.401.664 1.084 1.073 1.977 1.078.88-.004 1.572-.408 1.977-1.078.181-.299.231-.658.138-.995-.246-.892.436-1.776 1.38-1.776.79 0 1.431.63 1.431 1.408 0 .675-.482 1.234-1.118 1.375-.322.071-.6.269-.769.548-.613 1.017.193 1.917.93 2.823-1.21.562-2.524.846-3.969.846-1.468 0-2.771-.277-3.975-.84.748-.92 1.555-1.803.935-2.83-.168-.279-.446-.477-.768-.548-.636-.14-1.118-.699-1.118-1.374zm13.485 14.044h2.387c.583 0 1.054-.464 1.054-1.037s-.472-1.037-1.054-1.037h-2.402c-.575 0-1.137-.393-1.227-1.052-.092-.677.286-1.147.765-1.333l2.231-.866c.541-.21.807-.813.594-1.346-.214-.533-.826-.795-1.367-.584l-2.294.891c-.329.127-.734.036-.926-.401-.185-.423-.396-.816-.62-1.188-1.714.991-3.62 1.501-5.7 1.501-2.113 0-3.995-.498-5.703-1.496-.217.359-.421.738-.601 1.146-.227.514-.646.552-.941.437l-2.295-.89c-.542-.21-1.153.051-1.367.584-.213.533.053 1.136.594 1.346l2.231.866c.496.192.854.694.773 1.274-.106.758-.683 1.111-1.235 1.111h-2.402c-.582 0-1.054.464-1.054 1.037s.472 1.037 1.054 1.037h2.387c.573 0 1.159.372 1.265 1.057.112.728-.228 1.229-.751 1.462l-2.42 1.078c-.53.236-.766.851-.526 1.373s.865.753 1.395.518l2.561-1.14c.307-.137.688-.106.901.259 1.043 1.795 3.143 3.608 6.134 3.941 2.933-.327 5.008-2.076 6.073-3.837.261-.432.628-.514.963-.364l2.561 1.14c.529.236 1.154.005 1.395-.518.24-.522.004-1.137-.526-1.373l-2.42-1.078c-.495-.221-.867-.738-.763-1.383.128-.803.717-1.135 1.276-1.135z"
              />
            </svg>
            Bug Report
          </p>
          <div
            v-on:click="exitButton()"
            class="z-50 cursor-pointer modal-close"
          >
            <svg
              class="text-black fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
              ></path>
            </svg>
          </div>
        </div>

        <!--Body-->
        <div class="flex flex-col" v-if="!selType">
          <button
            v-on:click="selType = 'feature'"
            class="px-4 py-2 m-3 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"
          >
            Feature Request - Suggest an idea for this project
          </button>
          <button
            v-on:click="selType = 'bug'"
            class="px-4 py-2 m-3 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"
          >
            Report a bug - Create a report to help us improve
          </button>
        </div>
        <FormulateForm
          v-if="selType == 'feature'"
          @submit="
            sendBugReport(reportFeature, feature.title, 'Feature Request')
          "
        >
          <FormulateInput
            type="text"
            name="Title"
            v-model="feature.title"
            label="Title"
            validation="required"
          />
          <FormulateInput
            type="textarea"
            name="Description"
            v-model="feature.description"
            label="Description"
            validation="required"
          />
          <FormulateInput
            type="textarea"
            name="Context"
            v-model="feature.context"
            label="Context"
            validation="required"
          />
          <FormulateInput
            type="textarea"
            name="Possible Implementation"
            v-model="feature.possibleImplemenation"
            label="Possible Implementation"
          />
          <FormulateInput class="py-1 rounded" label="Send!" type="submit" />
        </FormulateForm>
        <FormulateForm
          v-if="selType == 'bug'"
          @submit="sendBugReport(reportBug, bug.title, 'Bug')"
        >
          <FormulateInput
            type="text"
            name="Title"
            v-model="bug.title"
            label="Title"
            validation="required"
          />
          <FormulateInput
            type="textarea"
            name="Description"
            v-model="bug.description"
            label="Description"
            validation="required"
          />
          <FormulateInput
            type="textarea"
            name="Expected Behavior"
            v-model="bug.expectedBehavior"
            label="Expected Behavior"
            validation="required"
          />
          <FormulateInput
            type="textarea"
            name="Actual Behavior"
            v-model="bug.actualBehavior"
            label="Actual Behavior"
            validation="required"
          />
          <FormulateInput
            type="textarea"
            name="Possible Fix"
            v-model="bug.possibleFix"
            label="Possible Fix"
          />
          <FormulateInput
            type="textarea"
            name="Steps to Reproduce"
            v-model="bug.steps"
            label="Steps to Reproduce"
            placeholder="1.2.3.4."
            validation="required"
          />
          <FormulateInput class="py-1 rounded" label="Send!" type="submit" />
        </FormulateForm>

        <div v-if="response">
          <span
            >Thanks for submitting, Incident can be found at
            {{ response.html_url }} (Access is restricted)</span
          >
        </div>
        <!--Footer-->
        <div v-if="selType == 'sent'" class="flex justify-end pt-2">
          <button
            v-on:click="exitButton()"
            class="p-3 px-4 text-white rounded-lg bg-codearch-500 modal-close hover:bg-codearch-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BugReport",
  data() {
    return {
      selType: null,
      response: null,
      bug: { steps: "1.\n2.\n3.\n4." },
      feature: {},
      context: {},
    };
  },
  computed: {
    reportBug() {
      let yourContext = JSON.stringify(this.context);
      let report = `
## Description
${this.bug.description}
## Expected Behavior
${this.bug.expectedBehavior}
## Actual Behavior
${this.bug.actualBehavior}
## Possible Fix
${this.bug.possibleFix}
## Steps to Reproduce
${this.bug.steps}
## Your Environment
${yourContext}`;
      return report;
    },
    reportFeature() {
      let yourContext = JSON.stringify(this.context);
      let report = `
## Detailed Description
${this.feature.description}
## Context
${this.feature.context}
## Possible Implementation
${this.feature.possibleImplemenation}
## Your Environment
${yourContext}`;
      return report;
    },
  },
  mounted() {
    this.context.browser = navigator.userAgent;
    this.context.url = window.location.href;
    this.context.userid = this.$store.state.auth.user.id;
    this.context.selectedProjectId = this.$store.state.curproject.theproject.id;
  },
  methods: {
    exitButton() {
      this.$emit("exitBugReport");
    },
    sendBugReport(report, title, label) {
      this.$http
        .post("/user/create_issue", {
          title: title,
          label: label,
          context: report,
        })
        .then((response) => {
          this.response = response.data;
          this.selType = "sent";
        })
        .catch(() => {
        });
    },
  },
};
</script>
<style>
.navbar.vue-fixed-header--isFixed {
  position: fixed;
  left: 0;
  top: 0;
}
.modal {
  transition: opacity 0.25s ease;
}
body.modal-active {
  overflow-x: hidden;
  overflow-y: visible !important;
}
</style>

