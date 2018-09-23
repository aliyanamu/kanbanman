<template>
  <section>
    <div class="col m4" v-if="this.throwData">
      <header :style="{backgroundColor: this.color}">
        <strong style="color: white"> {{this.throwData.name}} </strong>
      </header>
      <div v-if="this.throwData.items">
        <div v-for="(single, count) in pushData" :key="count" class="card">
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4"> {{single.title}} </span>
            <p><i class="fas fa-user-tag"></i> {{single.who}}</p>
            <p><i class="fas fa-star"></i> {{single.point}}</p>
          </div>
          <div class="card-action">
            <a @click="prev(single)">Revert</a>
            <a @click="del(single)">Delete</a>
            <a @click="next(single)">Forward</a>
          </div>
        </div>
      </div>
      <div class="card" v-else>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4"> No Task </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import db from '../assets/config.js'

export default {
  name: 'Column',
  props: ['throwData', 'color'],
  data () {
    return {
    }
  },
  computed: {
    pushData () {
      let initD = Object.values(this.throwData)[0]
      let itId = Object.keys(initD)
      let itItem = Object.values(initD)
      let single = {}
      let index = 0
      let items = []

      itItem.forEach(elem => {
        single.index = index
        single.id = itId[index]
        single.title = elem.title
        single.point = elem.point
        single.who = elem.who
        items.push(single)
        index++
        single = {}
      })
      return items
    }
  },
  methods: {
    prev (data) {
      if (this.throwData.name === 'Backlog') {
        console.log('can not revert from backlog')
      } else if (this.throwData.name === 'Todo') {
        db.ref('tasks/backlog/items').push({ title: data.title, point: data.point, who: data.who })
        db.ref(`tasks/todo/items/${data.id}`).remove()
      } else if (this.throwData.name === 'Doing') {
        db.ref('tasks/todo/items').push({ title: data.title, point: data.point, who: data.who })
        db.ref(`tasks/doing/items/${data.id}`).remove()
      } else if (this.throwData.name === 'Done') {
        db.ref('tasks/doing/items').push({ title: data.title, point: data.point, who: data.who })
        db.ref(`tasks/done/items/${data.id}`).remove()
      }
    },
    del (data) {
      if (this.throwData.name === 'Backlog') {
        db.ref(`tasks/backlog/items/${data.id}`).remove()
      } else if (this.throwData.name === 'Todo') {
        db.ref(`tasks/todo/items/${data.id}`).remove()
      } else if (this.throwData.name === 'Doing') {
        db.ref(`tasks/doing/items/${data.id}`).remove()
      } else if (this.throwData.name === 'Done') {
        db.ref(`tasks/done/items/${data.id}`).remove()
      }
    },
    next (data) {
      if (this.throwData.name === 'Backlog') {
        db.ref('tasks/todo/items').push({ title: data.title, point: data.point, who: data.who })
        db.ref(`tasks/backlog/items/${data.id}`).remove()
      } else if (this.throwData.name === 'Todo') {
        db.ref('tasks/doing/items').push({ title: data.title, point: data.point, who: data.who })
        db.ref(`tasks/todo/items/${data.id}`).remove()
      } else if (this.throwData.name === 'Doing') {
        db.ref('tasks/done/items').push({ title: data.title, point: data.point, who: data.who })
        db.ref(`tasks/doing/items/${data.id}`).remove()
      } else if (this.throwData.name === 'Done') {
        console.log('can not forward from done')
      }
    }
  },
  created () {
  }
}
</script>

<style>
.san {
  display: flex;
  justify-content: center;
}

section {
  width: 100%;
  margin: 0 20px;
}

section header {
  padding: 10px 0;
  font-size: large;
  border-radius: 20px 0;
}

.card-content p {
  text-align: left;
  padding: 5px 0;
  text-indent: 10%;
}

.card-content i {
  position: relative;
  margin: 0 10px;
  float: left;
}

.fa-user-tag {
  color: lightsalmon;
}

.fa-star {
  color: darkviolet;
}
</style>
