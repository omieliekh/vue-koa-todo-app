import Vue from 'vue';
import { expect, assert } from 'chai';
import { mount } from '@vue/test-utils';
import Todos from './Todos.vue';

import '../../test/test.config';
import { tick, elementExists, elementNotExists } from '../../test/test.utils';

describe('Todos.vue', () => {
  beforeEach(() => {
    Vue.httpCases.push({
      method: 'GET',
      url: '/api/todos',

      status: 200,
      body: []
    });
  });

  afterEach(() => {
    Vue.httpCases = [];
  });

  it('should contain disabled Add button', () => {
    const wrapper = mount(Todos, {
      attachToDocument: true
    });
    elementExists(wrapper, '.add-todo .btn-primary[disabled]');
  });

  it('should contain empty new todo input field', () => {
    const wrapper = mount(Todos);
    expect(wrapper.find('.new-todo input').element.value).to.equal('');
  });

  it('should enable Add button on input field change', (done) => {
    const wrapper = mount(Todos);

    wrapper.setData({ todoDescr: 'Todo 1' });

    Vue.config.errorHandler = done;
    Vue.nextTick(() => {
      elementExists(wrapper, '.add-todo .btn-primary:not([disabled])');
      done();
    });
  });

  it('should add new todo', async () => {
    Vue.httpCases.push({
      method: 'POST',
      url: '/api/todos',

      status: 200,
      body: {
        id: 1,
        description: 'My New Todo',
        checked: false
      }
    });

    const wrapper = mount(Todos);

    wrapper.setData({ todoDescr: 'Todo 1' });
    await tick();

    wrapper.find('.add-todo .btn-primary').trigger('click');
    await tick();

    elementExists(wrapper, '.todo');
  });


  it('should check existing todo', async () => {
    Vue.httpCases = [
      {
        method: 'GET',
        url: '/api/todos',

        status: 200,
        body: [{
          id: 1,
          description: 'Todo 1',
          checked: false
        }]
      },
      {
        method: 'POST',
        url: '/api/todos',

        status: 200,
        body: {
          id: 1,
          description: 'Todo 1',
          checked: false
        }
      }
    ];

    const wrapper = mount(Todos);
    await tick();

    elementExists(wrapper, '.todo');

    wrapper.find('.todo .todo-checkbox input').setChecked();
    await tick();

    elementExists(wrapper, '.todo .todo-description.is-done');
  });

  it('should remove new todo', async () => {
    Vue.httpCases = [
      {
        method: 'GET',
        url: '/api/todos',

        status: 200,
        body: [{
          id: 1,
          description: 'Todo 1',
          checked: false
        }]
      },
      {
        method: 'POST',
        url: '/api/todos',

        status: 200,
        body: {
          id: 1,
          description: 'Todo 1',
          checked: false
        }
      }
    ];

    const wrapper = mount(Todos);
    await tick();

    elementExists(wrapper, '.todo');

    wrapper.find('.todo .todo-actions .btn-danger').trigger('click');
    await tick();

    elementNotExists(wrapper, '.todo');
  });

});
