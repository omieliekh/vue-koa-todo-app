import { expect, assert } from 'chai';

export function tick() {
  return new Promise(resolve => setTimeout(resolve));
}

export function elementExists(wrapper, selector) {
  assert(wrapper.find(selector).exists(), `'${selector}' element does not exists, but it should`);
}

export function elementNotExists(wrapper, selector) {
  assert(!wrapper.find(selector).exists(), `'${selector}' element exists, but it shouldn\'t`);
}
