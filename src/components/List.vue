<script setup lang="ts">
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { FlagIcon } from '@heroicons/vue/24/solid';
</script>

<template>
  <div class="flex items-center justify-between">
    <h1 class="mt-3 text-xl md:text-3xl font-extrabold tracking-tight pt-5 pb-10">Tasks</h1>
    <button
      class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      @click="openSlide">
      Add new task
    </button>
  </div>
  <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <li
      v-for="task in formattedDates"
      :key="task.id"
      class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-xl border border-gray-200">
      <div class="flex w-full items-center justify-between space-x-6 p-6">
        <div class="flex-1 truncate">
          <div class="flex items-center space-x-3 pb-3">
            <span
              v-for="category in task.categories"
              :key="category"
              class="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {{ category }}
            </span>
          </div>
          <h3 class="truncate text-sm font-medium text-gray-900">{{ task.title }}</h3>
          <p class="mt-1 truncate text-sm text-gray-500">{{ task.descr }}</p>
          <div class="flex items-center mt-2">
            <FlagIcon class="h-4 w-4 text-gray-700" />
            <p class="ml-1 truncate font-normal text-xs text-gray-700 ">{{ task.createdAt }}</p>
          </div>
        </div>
      </div>
      <div>
        <div class="-mt-px flex divide-x divide-gray-200">
          <div class="flex w-0 flex-1">
            <button class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold hover:bg-gray-100">
              <PencilIcon class="h-5 w-5 text-blue-500" />
            </button>
          </div>
          <div class="-ml-px flex w-0 flex-1">
            <button
              @click="openModal"
              class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold hover:bg-gray-100">
              <TrashIcon class="h-5 w-5 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import Multiselect from '@vueform/multiselect';
import { format, parseISO } from 'date-fns';

type TaskType = {
  id: number,
  categories: string[],
  title: string,
  descr: string,
  createdAt: string,
}

export default {
  components: {
    Multiselect
  },
  props: {
    tasks: {
      type: Array<TaskType>,
      required: true,
      default: []
    }
  },
  methods: {
    openSlide() {
      this.$emit('openSlide');
    },
    openModal() {
      this.$emit('openModal');
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
<style src="@vueform/multiselect/themes/default.css"></style>