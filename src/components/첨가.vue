<template>
  <div>
    <button class="plus-btn" @click="openbtn">+</button>
    <div v-if="isOpen === true">
      <div class="overlay"></div>
      <div class="addBox">
        <div class="form">
          <div class="md-form">
            <label for="title"><i class="fa fa-tag"></i>Task name</label>
            <input v-model="title" type="text" id="title" class="form-control" placeholder="e.g. create kanban" required>
          </div>
          <div class="md-form">
            <label for="person"><i class="fas fa-user-tag"></i>Assign to</label>
            <input v-model="who" type="text" id="person" class="form-control" placeholder="e.g. kanbanman">
          </div>
          <div class="md-form">
            <label for="point"><i class="fas fa-star"></i>Prority</label>
            <input v-model="point" type="text" id="point" class="form-control" placeholder="e.g. 1">
          </div>
        </div>
        <button class="add-btn" @click="addTask">Confirm Task</button>
        <button class="x-close" @click="closebtn">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../assets/config.js'

export default {
  name: 'Adding',
  data () {
    return {
      isOpen: false,
      title: '',
      who: '',
      point: ''
    }
  },
  computed: {
  },
  methods: {
    openbtn () {
      this.isOpen = true
    },
    closebtn () {
      this.isOpen = false
      this.title = null
      this.point = null
      this.who = null
    },
    addTask () {
      if (this.title.length > 0) {
        if (this.point.length <= 0) this.point = '0'
        if (this.who.length <= 0) this.point = 'anonymous'

        db.ref('tasks/backlog').once('value', (snapshot) => {
          db.ref('tasks/backlog/items').push({
            title: this.title,
            point: this.point,
            who: this.who
          })
        })
      }
      this.title = null
      this.point = null
      this.who = null
    }
  },
  created () {
    console.log(this.throwData)
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  width: 120%;
  height: 120%;
  margin-top: -10%;
  opacity: 0.5;
  z-index: 1000;
  filter: alpha(opacity=50);
  background-color: #000;
}

.addBox {
  position: fixed;
  color: #000;
  background: #ffffffcc;
  top: 15%;
  left: 35%;
  min-width: 31rem;
  padding: 3rem;
  transition: box-shadow 0.25s;
  z-index: 10000000;
  border-radius: 20px;
}

.plus-btn {
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  bottom: 5%;
  right: 3%;
  background: orange;
  color: white;
  font-size: 30px;
  font-weight: bold;
}

.plus-btn:hover {
  transform: scale(1.5);
  transition: all .2s linear 0.2s
}

.md-form {
  display: table;
}

.md-form input {
  width: 350px;
  margin-left: 15px;
  float: right;
}

.md-form label {
  margin-left: 20px;
  display: inherit;
  font-size: 16px;
}

.fa-tag:before, .fa-user-tag:before, .fa-star:before {
  margin: 0 20px 0 0;
}

.x-close,
.add-btn {
  background: orange;
  padding: 10px 30px;
  border: none;
  margin: 20px 20px 0;
  font-size: 20px;
  font-weight: bold;
  color: #fffccc;
  border-radius: 20px;
}

.x-close:hover,
.x-close:focus,
.add-btn:focus,
.add-btn:hover {
  background: orange;
  opacity: 0.7;
  filter: alpha(opacity=70);
  color: #000;
}

input[type=text]:focus:not([readonly]) {
  border-bottom: 1px solid orange;
  box-shadow: 0 1px 0 0 orange;
}

.fa-tag {
  color: cadetblue;
}

label, ::placeholder {
  color: dimgray;
}
</style>
