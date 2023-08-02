<template>
  <div class="flex items-center justify-between">
    <h1 class="mt-3 text-3xl font-extrabold tracking-tight pt-5 pb-10">Tasks</h1>
    <button class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add new task</button>
  </div>
  <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="task in tasks" :key="task.id" class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-xl border border-gray-200">
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
        </div>
      </div>
      <div>
        <div class="-mt-px flex divide-x divide-gray-200">
          <div class="flex w-0 flex-1">
            <button class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold hover:bg-gray-100">
              <PencilIcon class="h-5 w-5 text-blue-500" aria-hidden="true" />
            </button>
          </div>
          <div class="-ml-px flex w-0 flex-1">
            <button class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold hover:bg-gray-100">
              <TrashIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { PencilIcon, TrashIcon } from '@heroicons/vue/20/solid';

const tasks = [
  {
    id: 1,
    categories: ["Backend", "Frontend"],
    title: 'Regional Paradigm Technician',
    descr: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur',
  },
  {
    id: 2,
    categories: ["Frontend"],
    title: 'Regional Paradigm Technician',
    descr: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur',
  },
  {
    id: 3,
    categories: ["UI/UX"],
    title: 'Regional Paradigm Technician',
    descr: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur',
  },
  {
    id: 4,
    categories: ["Deployement"],
    title: 'Regional Paradigm Technician',
    descr: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur',
  },
  {
    id: 5,
    categories: ["DB"],
    title: 'Regional Paradigm Technician',
    descr: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur',
  },
  {
    id: 6,
    categories: ["Frontend"],
    title: 'Regional Paradigm Technician',
    descr: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur',
  },
]
</script>