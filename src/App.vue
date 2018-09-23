<template>
  <div id="app">
    <Adding/>
    <div class="column-wrap">
      <Column :throwData="backlogs" color="#ff4136"></Column>
      <Column :throwData="todos" color="#ffb700"></Column>
      <Column :throwData="doings" color="#19a974"></Column>
      <Column :throwData="dones" color="lightblue"></Column>
    </div>
  </div>
</template>

<script>
import Column from './components/기둥.vue'
import Adding from './components/첨가.vue'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    Column,
    Adding
  },
  methods: {
    ...mapActions([
      'getTasks',
      'getBacklogs',
      'getTodos',
      'getDoings',
      'getDones'
    ]),
    ...mapMutations([
      'setTasks'
    ])
  },
  computed: {
    ...mapState([
      'tasks',
      'backlogs',
      'todos',
      'doings',
      'dones'
    ])
  },
  created () {
    this.getTasks()
    this.getBacklogs()
    this.getTodos()
    this.getDoings()
    this.getDones()
  }
}
</script>

<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* background: #2c3e50; */
}

.column-wrap {
  margin: 5% 5% 0;
  display: flex;
  flex-direction: row;
}
</style>
