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
      @handleDone="handleTaskDone"
      @setTaskToUpdate="setTaskToUpdate"/>
    <SlideOver
      :operation="operation"
      :isSlideOpen="isUpsertSlideOpen"
      :data="taskToUpdate"
      @close="handleSlideOver"/>
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

export default {
  data() {
    return {
      operation: "create",
      isUpsertSlideOpen: ref(false),
      isModalConfirmOpen: ref(false),
      taskToUpdate: null,
      taskToDelete: ref(null),
    }
  },
  methods: {
    ...mapActions('tasks', ['fetchTasks', 'deleteTask', 'updateTask']),
    handleSlideOver(operation: string) {
      this.operation = operation;
      if (this.isUpsertSlideOpen)
        this.taskToUpdate = null;
      this.isUpsertSlideOpen = !this.isUpsertSlideOpen;
    },
    handleConfirmModal(id: number) {
      this.taskToDelete = id;
      if (this.isModalConfirmOpen)
        this.taskToDelete = null;
      this.isModalConfirmOpen = !this.isModalConfirmOpen;
    },
    setTaskToUpdate(task: TaskType) {
      this.operation = "update"
      this.taskToUpdate = task;
      this.isUpsertSlideOpen = !this.isUpsertSlideOpen;
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
          this.$toast.open({ ...toastConfig, message: 'No task has been provided !', type: 'warning' })
        }
      } catch (e) {
        this.$toast.open({ ...toastConfig, message: 'Something went wrong!', type: 'error' })
      }
    },
    handleTaskDone (task: TaskType) {
      try {
        if (task) {
          // * in this case the createdAt used at updatedAt
          this.updateTask({ ...task, isdone: task.isdone, createdAt: new Date() });
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