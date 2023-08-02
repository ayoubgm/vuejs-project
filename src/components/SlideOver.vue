<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
</script>
<template>
  <TransitionRoot as="template" :show="isSlideOpen">
    <Dialog as="div" class="relative z-40" static>
      <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <TransitionChild
          as="template"
          enter="transform transition ease-in-out duration-500 sm:duration-700"
          enter-from="translate-x-full"
          enter-to="translate-x-0"
          leave="transform transition ease-in-out duration-500 sm:duration-700"
          leave-from="translate-x-0"
          leave-to="translate-x-full">
          <DialogPanel class="pointer-events-auto w-screen max-w-md">
            <div class="flex h-full flex-col bg-white py-6 shadow-2xl">
              <div class="px-4 sm:px-6">
                <div class="flex items-start justify-between">
                  <DialogTitle class="text-base font-semibold leading-6 text-gray-900">Add new task</DialogTitle>
                  <div class="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      @click="close">
                      <span class="absolute -inset-2.5" />
                      <span class="sr-only">Close panel</span>
                      <XMarkIcon class="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
              <div class="relative mt-6 flex-1 px-4 sm:px-6">
                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div class="sm:col-span-full">
                    <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
                    <div class="mt-2">
                      <input
                        id="title"
                        type="text"
                        name="title"
                        autocomplete="title"
                        class="block w-full rounded-md py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ring-1 ring-inset ring-gray-300"
                        placeholder="janesmith" />
                    </div>
                  </div>
                  <div class="col-span-full">
                    <label for="descr" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                    <div class="mt-2">
                      <textarea
                        id="descr"
                        name="descr"
                        rows="3"
                        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>
                  <div class="col-span-full">
                    <label for="descr" class="block text-sm font-medium leading-6 text-gray-900">Categories</label>
                    <Multiselect
                      class="text-sm"
                      v-model="values"
                    ></Multiselect>
                  </div>
                </div>
              </div>
              <button
                class="rounded-md bg-indigo-600 px-3.5 py-2.5 m-3 text-xs md:text-sm font-semibold text-white shadow-sm mb-auto hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Create
              </button>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import Multiselect from '@vueform/multiselect';

export default {
  components: {
    Multiselect
  },
  props: {
    isSlideOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  },
  data () {
    return {
      mode: 'tags',
      values: [],
      options: [
        { value: 'fontend', label: 'Front-end' },
        { value: 'backend', label: 'Back-end' },
        { value: 'ui-ux', label: 'UI/UX' },
        { value: 'deploy', label: 'Deployement' },
        { value: 'unit-testing', label: 'Unit testing' },
        { value: 'e2e-testing', label: 'E2E Testing' },
      ],
      closeOnSelect: false,
      searchable: true,
      createOption: true
    }
  },
}

</script>