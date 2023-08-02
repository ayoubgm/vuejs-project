<script setup lang="ts">
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { FlagIcon } from '@heroicons/vue/24/solid';
import type { TaskType } from '../types';
</script>

<template>
  <div class="flex items-center justify-between">
    <h1 class="mt-3 text-xl md:text-3xl font-extrabold tracking-tight pt-5 pb-10">Tasks</h1>
    <button
      class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      @click="openSlide('create')">
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
          <div class="flex items-center justify-between pb-3">
            <div>
              <span
                v-for="category in task.categories"
                :key="category"
                class="inline-flex flex-shrink-0 ml-2 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                {{ category }}
              </span>
            </div>
            <Toggle
              @click="changeToggle(task)"
              v-model="task.isdone"
              :classes="{
                container: 'inline-block rounded-full outline-none focus:ring focus:ring-green-500 focus:ring-opacity-30',
                toggle: 'flex w-8 h-3 rounded-full relative cursor-pointer transition items-center box-content border-2 text-xs leading-none',
                toggleOn: 'bg-green-500 border-green-500 justify-start text-white',
                toggleOff: 'bg-gray-200 border-gray-200 justify-end text-gray-700',
                toggleOnDisabled: 'bg-gray-300 border-gray-300 justify-start text-gray-400 cursor-not-allowed',
                toggleOffDisabled: 'bg-gray-200 border-gray-200 justify-end text-gray-400 cursor-not-allowed',
                handle: 'inline-block bg-white w-3 h-3 top-0 rounded-full absolute transition-all',
                handleOn: 'left-full transform -translate-x-full',
                handleOff: 'left-0',
                handleOnDisabled: 'bg-gray-100 left-full transform -translate-x-full',
                handleOffDisabled: 'bg-gray-100 left-0',
                label: 'text-center w-8 border-box whitespace-nowrap select-none',
              }" />
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
            <button
              @click="handleUpdate(task)"
              class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold hover:bg-gray-100">
              <PencilIcon class="h-4 w-4 text-blue-500" />
            </button>
          </div>
          <div class="-ml-px flex w-0 flex-1">
            <button
              @click="openModal(task.id)"
              class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold hover:bg-gray-100">
              <TrashIcon class="h-4 w-4 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import Multiselect from '@vueform/multiselect';
import Toggle from '@vueform/toggle';
import { format, parseISO } from 'date-fns';

export default {
  components: {
    Multiselect, Toggle
  },
  props: {
    tasks: {
      type: Array<TaskType>,
      required: true,
      default: []
    }
  },
  methods: {
    openSlide(operation: string) {
      this.$emit('openSlide', operation);
    },
    openModal(id: number) {
      this.$emit('openModal', id);
    },
    changeToggle(task: TaskType) {
      this.$emit('handleDone', task);
    },
    handleUpdate(task: TaskType) {
      this.$emit('setTaskToUpdate', task);
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
<style src="@vueform/toggle/themes/default.css"></style>