import Vue from 'vue'
import Vuex from 'vuex'
import db from './assets/config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [],
    backlogs: [],
    todos: [],
    doings: [],
    dones: []
  },
  mutations: {
    setTasks (state, payload) {
      state.tasks = payload
    },
    setBacklogs (state, payload) {
      state.backlogs = payload
    },
    setTodos (state, payload) {
      state.todos = payload
    },
    setDoings (state, payload) {
      state.doings = payload
    },
    setDones (state, payload) {
      state.dones = payload
    }
  },
  actions: {
    getTasks (context) {
      db.ref('tasks/').on('value', (snapshot) => {
        context.commit('setTasks', snapshot.val())
      })
    },
    getBacklogs (context) {
      db.ref('tasks/backlog').on('value', (snapshot) => {
        context.commit('setBacklogs', snapshot.val())
      })
    },
    getTodos (context) {
      db.ref('tasks/todo').on('value', (snapshot) => {
        context.commit('setTodos', snapshot.val())
      })
    },
    getDoings (context) {
      db.ref('tasks/doing').on('value', (snapshot) => {
        context.commit('setDoings', snapshot.val())
      })
    },
    getDones (context) {
      db.ref('tasks/done').on('value', (snapshot) => {
        context.commit('setDones', snapshot.val())
      })
    }
  }
})
