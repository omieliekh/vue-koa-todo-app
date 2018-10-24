<template>
  <div class="todos">
    <b-row>
      <b-col cols="6" offset="2">
        <b-form-input
          v-model="todoDescr"
          @keyup.enter.native="addTodo"
          placeholder="Enter your task description ...">
        </b-form-input>
      </b-col>
      <b-col cols="2">
        <b-button
          variant="primary"
          @click="addTodo"
          block
        >Add</b-button>
      </b-col>
    </b-row>
    <b-row v-for="todo in todos" class="todo">
      <b-col class="todo-checkbox">
        <b-form-checkbox
          v-model="todo.checked"
          @change="updateTodo(todo)"
        ></b-form-checkbox>
      </b-col>
      <b-col
        cols="8"
        class="todo-description"
        :class="{ 'is-done': todo.checked }">
        {{ todo.description }}
      </b-col>

      <b-col class="todo-actions">
        <b-button
          size="sm"
          variant="danger"
          @click="removeTodo(todo)"
        >X</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: 'Todos',
  data() {
    return {
      todoDescr: '',
      todos: []
    };
  },

  mounted () {
    this.getTodos();
  },

  methods: {
    getTodos () {
      this.$http.get('/api/todos')
        .then(({ body: todos }) => this.todos = todos);
    },

    addTodo () {
      const description = this.todoDescr.trim();

      if (!description) {
        return;
      }

      this.$http.post(`/api/todos`, {
        description,
        checked: false
      })
        .then(({ body: todo }) => {
        this.todos.push(todo);
        this.todoDescr = '';
      });
    },

    updateTodo (todo) {
      setTimeout(() => {
        this.$http.put(`/api/todos/${todo.id}`, todo);
      });
    },

    removeTodo (todo) {
      const index = this.todos.indexOf(todo);

      if (index === -1) {
        return;
      }

      this.$http.delete(`/api/todos/${todo.id}`)
        .then(() => this.todos.splice(index, 1));
    }
  }
}
</script>

<style scoped>
  .row {
    margin-bottom: 0.5rem;
  }

  .is-done {
    text-decoration: line-through;
  }

  .todo-description {
    text-align: left;
  }

  .todo-checkbox {
    text-align: right;
  }

  .todo-checkbox .custom-checkbox {
    margin: 0;
  }

  .todo-actions {
    text-align: left;
  }
</style>
