
import type { TaskType } from '@/types';
import axios from 'axios';
import type { ActionTree, MutationTree } from 'vuex';
const API_ENDPOINT = 'http://localhost:3000';

const state = {
  tasks: []
}

const actions: ActionTree<{ tasks: TaskType[] }, any> = {
  async fetchTasks(
    { commit }: any
  ) {
    const response = await axios.get(`${API_ENDPOINT}/tasks`);
    
    commit('setTasks', response.data);
  },
  async addTask(
    { commit }: any,
    task: TaskType
  ) {
    const response = await axios.post(`${API_ENDPOINT}/tasks`, task);
  
    commit('addTask', response.data);
  },
  async updateTask(
    { commit }: any,
    task: TaskType
  ) {
    const response = await axios.put(`${API_ENDPOINT}/tasks/${task.id}`, task);
  
    commit('updateTask', response.data);
  },
  async deleteTask(
    { commit }: any,
    taskId: number
  ) {
    await axios.delete(`${API_ENDPOINT}/tasks/${taskId}`);
  
    commit('deleteTask', taskId);
  },
};

const mutations: MutationTree<{ tasks: TaskType[] }>  = {
  setTasks(
    state: any,
    tasks: TaskType[]
  ) {
    state.tasks = tasks;
  },
  addTask(
    state: any,
    task: TaskType
  ) {
    state.tasks.push(task);
  },
  updateTask(
    state: any,
    updatedTask: TaskType
  ) {
    const index = state.tasks.findIndex((task: TaskType) => task.id === updatedTask.id);
    if (index !== -1) {
      state.tasks[index] = updatedTask;
    }
  },
  deleteTask(
    state: any,
    taskId: number
  ) {
    state.tasks = state.tasks.filter((task: TaskType) => task.id !== taskId);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};