<template>
  <b-container class="todos">
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
        <b-form-checkbox v-model="todo.isDone"></b-form-checkbox>
      </b-col>
      <b-col
        cols="8"
        class="todo-description"
        :class="{ 'is-done': todo.isDone }">
        {{ todo.description }}
      </b-col>

      <b-col class="todo-actions">
        <b-button
          size="sm"
          variant="danger"
          @click="deleteTodo(todo)"
        >X</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: 'Todos',
  data() {
    return {
      todoDescr: '',
      todos: [
        {
          description: 'First',
          isDone: false
        },
        {
          description: 'Second',
          isDone: true
        }
      ]
    };
  },

  methods: {
    addTodo () {
      const description = this.todoDescr.trim();

      if (!description) {
        return;
      }

      this.todos.unshift({
        description,
        isDone: false
      });
    },
    deleteTodo (todo) {
      const index = this.todos.indexOf(todo);

      if (index !== -1) {
        this.todos.splice(index, 1);
      }
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
