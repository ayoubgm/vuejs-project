<script setup lang="ts">
import { mapActions, mapState } from 'vuex';
import ConfirmationModal from '../components/ConfirmationModal.vue';
import ListView from '../components/List.vue';
import SlideOver from '../components/SlideOver.vue';
</script>

<template>
  <main>
    <ListView
      :tasks="$store.state.tasks.tasks"
      @openSlide="handleSlideOver"
      @openModal="handleConfirmModal"
      />
    <SlideOver
      :isSlideOpen="isUpsertSlideOpen"
      @close="handleSlideOver" />
    <ConfirmationModal
      :isModalOpen="isModalConfirmOpen"
      @close="handleConfirmModal"
      @delete="handleDeleteTask"/>
  </main>
</template>
<script lang="ts">
import { format, parseISO } from 'date-fns';
import { ref } from 'vue';
import type { TaskType } from '../types';

const toastConfig = {
  duration: 3000,
  position: "top"
}

// [
//     {
//       "id": 1,
//       "categories": ["Backend", "Frontend"],
//       "title": "Regional Paradigm Technician",
//       "descr": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
//       "createdAt": "2023-08-01T00:00:00.000Z"
//     },
//     {
//       "id": 2,
//       "categories": ["Frontend"],
//       "title": "Regional Paradigm Technician",
//       "descr": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
//       "createdAt": "2023-07-10T00:00:00.000Z"
//     },
//     {
//       "id": 3,
//       "categories": ["UI/UX"],
//       "title": "Regional Paradigm Technician",
//       "descr": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
//       "createdAt": "2023-06-01T00:00:00.000Z"
//     },
//     {
//       "id": 4,
//       "categories": ["Deployement"],
//       "title": "Regional Paradigm Technician",
//       "descr": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
//       "createdAt": "2023-05-01T00:00:00.000Z"
//     },
//     {
//       "id": 5,
//       "categories": ["DB"],
//       "title": "Regional Paradigm Technician",
//       "descr": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
//       "createdAt": "2023-04-01T00:00:00.000Z"
//     },
//     {
//       "id": 6,
//       "categories": ["Frontend"],
//       "title": "Regional Paradigm Technician",
//       "descr": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
//       "createdAt": "2023-03-01T00:00:00.000Z"
//     }
//   ]

export default {
  data() {
    return {
      isUpsertSlideOpen: ref(false),
      isModalConfirmOpen: ref(false),
      taskToDelete: ref(null),
    }
  },
  methods: {
    ...mapActions('tasks', ['fetchTasks', 'addTask', 'updateTask', 'deleteTask']),
    handleSlideOver() {
      this.isUpsertSlideOpen = !this.isUpsertSlideOpen;
    },
    handleConfirmModal(id: number) {
      this.taskToDelete = id;
      this.isModalConfirmOpen = !this.isModalConfirmOpen;
    },
    handleDeleteTask () {
      try {
        if (this.taskToDelete) {
          this.deleteTask(this.taskToDelete)
          this.$toast.open({
            ...toastConfig,
            message: 'The task has been deleted !',
            type: 'success',
          })
        } else {
          this.$toast.open({
            ...toastConfig,
            message: 'No task has been provided !',
            type: 'warning',
          })
        }
      } catch (e) {
        this.$toast.open({
          ...toastConfig,
          message: 'Something went wrong!',
          type: 'error',
        })
      }
    }
  },
  computed: {
    ...mapState(['tasks']),
    formattedDates() {
      return this.tasks.map((task: TaskType) => ({
        ...task,
        createdAt: format(parseISO(task.createdAt), 'MMM dd, yyyy')
      }));
    }
  },
  mounted() {
    this.fetchTasks();
  },
}
</script>