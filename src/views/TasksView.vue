<script setup lang="ts">
import ConfirmationModal from '../components/ConfirmationModal.vue';
import ListView from '../components/List.vue';
import SlideOver from '../components/SlideOver.vue';
</script>

<template>
  <main>
    <ListView
      :tasks="tasks"
      @openSlide="handleSlideOver"
      @openModal="handleConfirmModal"
      />
    <SlideOver
      :isSlideOpen="isUpsertSlideOpen"
      @close="handleSlideOver" />
    <ConfirmationModal
      :isModalOpen="isModalConfirmOpen"
      @close="handleConfirmModal"/>
  </main>
</template>
<script lang="ts">
import { format, parseISO } from 'date-fns';
import { ref } from 'vue';

export default {
  data() {
    return {
      isUpsertSlideOpen: ref(false),
      isModalConfirmOpen: ref(false),
      tasks: [
        {
          id: 1,
          categories: ["Backend", "Frontend"],
          title: "Regional Paradigm Technician",
          descr: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
          createdAt: "2023-08-01T00:00:00.000Z",
        },
        {
          id: 2,
          categories: ["Frontend"],
          title: "Regional Paradigm Technician",
          descr: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
          createdAt: "2023-07-10T00:00:00.000Z",
        },
        {
          id: 3,
          categories: ["UI/UX"],
          title: "Regional Paradigm Technician",
          descr: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
          createdAt: "2023-06-01T00:00:00.000Z",
        },
        {
          id: 4,
          categories: ["Deployement"],
          title: "Regional Paradigm Technician",
          descr: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
          createdAt: "2023-05-01T00:00:00.000Z",
        },
        {
          id: 5,
          categories: ["DB"],
          title: "Regional Paradigm Technician",
          descr: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
          createdAt: "2023-04-01T00:00:00.000Z",
        },
        {
          id: 6,
          categories: ["Frontend"],
          title: "Regional Paradigm Technician",
          descr: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
          createdAt: "2023-03-01T00:00:00.000Z",
        },
      ],
    }
  },
  methods: {
    handleSlideOver() {
      this.isUpsertSlideOpen = !this.isUpsertSlideOpen;
    },
    handleConfirmModal() {
      this.isModalConfirmOpen = !this.isModalConfirmOpen;
    }
  },
  computed: {
    formattedDates() {
      return this.tasks.map(task => ({
        ...task,
        createdAt: format(parseISO(task.createdAt), 'MMM dd, yyyy')
      }));
    }
  }
}
</script>