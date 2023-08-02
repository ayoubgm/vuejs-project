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
              <form
                class="relative h-full"
                @submit.prevent="submit">
                <div class="relative mt-6 flex-1 px-4 sm:px-6">
                  <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-full">
                      <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
                      <div class="mt-2">
                        <input
                          v-model="form.title"
                          id="title"
                          type="text"
                          name="title"
                          autocomplete="title"
                          class="block w-full rounded-md py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ring-1 ring-inset ring-gray-300"
                          placeholder="Enter a title for your task" />
                      </div>
                      <div v-if="errors.title" class="text-red-500 text-xs mt-2">{{ errors.title[0] }}</div>
                    </div>
                    <div class="col-span-full">
                      <label for="descr" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                      <div class="mt-2">
                        <textarea
                          v-model="form.descr"
                          id="descr"
                          name="descr"
                          rows="3"
                          class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Describe your task" />
                      </div>
                      <div v-if="errors.descr" class="text-red-500 text-xs mt-2">{{ errors.descr[0] }}</div>
                    </div>
                    <div class="col-span-full">
                      <label for="descr" class="block text-sm font-medium leading-6 text-gray-900">Categories</label>
                      <Multiselect
                        v-model="form.categories"
                        :options="options"
                        :classes="{
                          container: 'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-gray-300 rounded bg-white text-base leading-snug outline-none mt-2',
                          placeholder: 'flex items-center h-full absolute left-0 top-0 text-sm pointer-events-none bg-transparent leading-snug pl-3.5 text-gray-400 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5'
                        }"
                        mode="tags"
                        searchable="true"
                        placeholder="Choose some categories for your task"
                      ></Multiselect>
                      <div v-if="errors.categories" class="text-red-500 text-xs mt-2">{{ errors.categories[0] }}</div>
                    </div>
                  </div>
                </div>
                <div class="absolute bottom-0 flex w-full justify-center">
                  <button
                    class="w-64 items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                    {{ submitBtnText }}
                  </button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import Multiselect from '@vueform/multiselect';
import { mapActions } from 'vuex';
import { z } from 'zod';
import type { TaskErrors, TaskForm } from '../types';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  descr: z.string().min(1, 'Description is required'),
  categories: z.array(z.string()).min(1, 'At least one category is required'),
});

export default {
  components: {
    Multiselect
  },
  props: {
    isSlideOpen: {
      type: Boolean,
      default: true
    },
    operation: {
      type: String,
      default: true
    },
    data: {
      default: null
    }
  },
  data (): { submitBtnText: string, form: TaskForm; errors: TaskErrors; options: any[] } {
    return {
      submitBtnText: "Create",
      options: [
        { value: 'Front-end', label: 'Front-end' },
        { value: 'Back-end', label: 'Back-end' },
        { value: 'UI/UX', label: 'UI/UX' },
        { value: 'Deployement', label: 'Deployement' },
        { value: 'Unit testing', label: 'Unit testing' },
        { value: 'E2E Testing', label: 'E2E Testing' },
      ],
      form: {
        title: '',
        descr: '',
        categories: [],
      },
      errors: {}
    }
  },
  watch: {
    operation(newVal) {
      this.submitBtnText = newVal == "create" ? "Create" : "Update";
      if (newVal == "update") {
        this.form.title = this.data.title
        this.form.descr = this.data.descr
        this.form.categories = this.data.categories
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['addTask', 'updateTask']),
    close() {
      this.$emit('close', "create");
    },
    validate() {
      const result = taskSchema.safeParse(this.form);

      if (!result.success) {
        this.errors = result.error.formErrors.fieldErrors;
      } else {
        this.errors = {};
      }
      return result.success;
    },
    submit() {
      if (this.validate()) {
        if (this.operation == "create") {
          this.addTask({ ...this.form, isdone: false, createdAt: new Date()})
        } else {
          this.updateTask({
            ...this.data,
            title: this.form.title,
            descr: this.form.descr,
            categories: this.form.categories,
            createdAt: new Date()
          })
        }
        this.$emit('close');
      }
    },
  },
}
</script>