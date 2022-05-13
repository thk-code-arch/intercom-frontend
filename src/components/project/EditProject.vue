<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div>
    <!-- Top bar -->
    <div class="flex items-center flex-none px-6 py-2 mb-4 border-b">
      <div class="flex flex-col">
        <h1 class="mb-2 text-2xl font-medium">{{ currentState.title }}</h1>
        <div class="text-sm truncate text-grey-dark">
          {{ currentState.subtitle }}
        </div>
      </div>
    </div>
    <div class="p-8">
      <!-- TEXT -->
      <FormulateForm
        v-if="currentState.state == 'new-project'"
        @submit="submitNewProject"
        v-model="newProject"
        :schema="newProjectSchema"
      />
      <FormulateForm
        v-if="currentState.state == 'project-settings'"
        @submit="submitEditProject"
        v-model="projectinfo"
        :schema="editProjectSchema"
      />
      <UploadIFC v-if="currentState.state == 'project-settings'" />
    </div>
    <div class="p-8" v-if="currentState.state == 'project-settings'">
      <button
        class="border border-red-500 rounded px-3 py-2 leading-none focus:border-red-500 bg-red-400 outline-none border-box mb-1"
        v-if="projectinfo.parentProject !== null"
        @click="deleteSubProject()"
      >
        Delete Subproject
      </button>
    </div>
  </div>
</template>

<script>
import UploadIFC from './UploadIFC';
import projectHeader from '@/services/project-header';
export default {
  name: 'edit-project',
  data: function () {
    return {
      state: [
        {
          state: 'new-project',
          title: 'New Project',
          subtitle: 'Add a new Project.',
        },
        {
          state: 'project-settings',
          title: 'Edit Project',
          subtitle: 'Modify project settings',
        },
      ],
      newProject: {},
      newProjectSchema: [
        {
          label: 'Project name',
          name: 'name',
          validation: 'required|max:17,length',
        },
        {
          label: 'Project description',
          name: 'description',
          validation: 'required',
        },
        {
          type: 'select',
          label: 'Optional: Select parent project',
          name: 'parentProject',
          placeholder: 'Parent project',
          options: {},
        },
        {
          type: 'submit',
          label: 'Save project',
        },
      ],
      projectinfo: {},
      editProjectSchema: [
        {
          label: 'Project name',
          name: 'name',
          validation: 'required|max:17,length',
        },
        {
          label: 'Project description',
          name: 'description',
          validation: 'required',
        },
        {
          type: 'submit',
          label: 'Update Project settings',
        },
      ],
      projects: [],
    };
  },
  computed: {
    currentState: function () {
      return this.state.find((s) => s.state == this.$route.name);
    },
  },
  components: {
    UploadIFC,
  },

  methods: {
    submitNewProject() {
      this.$http.post('/project/add_project', this.newProject).then(
        (response) => {
          this.$store
            .dispatch('curproject/selectProject', response.data)
            .then(() => {
              this.$notify({
                title: 'Success',
                text: 'Project added',
                group: 'info',
              });
              this.$router.push('/project-settings');
            });
        },
        (error) => {
          this.$notify({
            title: 'Ooops...',
            text:
              (error.response && error.response.data) ||
              error.message ||
              error.toString(),
            group: 'error',
          });
        }
      );
    },
    submitEditProject() {
      this.$http
        .post('/project/edit_project', {
          name: this.projectinfo.name,
          description: this.projectinfo.description,
          id: this.projectinfo.id,
        })
        .then(
          (response) => {
            this.$store.dispatch('curproject/selectProject', response.data);
            this.$notify({
              title: 'Success',
              text: 'Project details changed',
              group: 'info',
            });
          },
          (error) => {
            this.$notify({
              title: 'Ooops...',
              text:
                (error.response && error.response.data) ||
                error.message ||
                error.toString(),
              group: 'error',
            });
          }
        );
    },
    deleteSubProject() {
      if (
        confirm(
          'Do you really want to delete? Chatlog & Project will be deleted.'
        )
      ) {
        this.$http
          .post('/project/delete_subproject', {
            projectid: this.projectinfo.id,
          })
          .then(
            (response) => {
              this.$store.dispatch('curproject/unselect');
              this.$store.dispatch('viewport/clear');
              this.$router.push('/projects');
              this.$notify({
                title: 'Success',
                text: 'Project deleted' + JSON.stringify(response.data),
                group: 'info',
              });
            },
            (error) => {
              this.$notify({
                title: 'Ooops...',
                text:
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString(),
                group: 'error',
              });
            }
          );
      }
    },
  },
  mounted() {
    if (this.currentState.state !== 'new-project') {
      this.$http.get('/project/get_projectinfo/' + projectHeader()).then(
        (response) => {
          this.projectinfo = response.data;
        },
        (error) => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    }
    this.$http.get('/project/get_projects').then(
      (response) => {
        const projects = response.data.filter((p) => p.parentProject === null);
        this.newProjectSchema[2].options = projects.map(({ id, name }) => ({
          label: name,
          value: id,
        }));
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
