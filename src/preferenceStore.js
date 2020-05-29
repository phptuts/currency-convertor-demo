import { writable } from 'svelte/store';
import _ from 'lodash';
let preferences = { from: 'CAD', to: 'AUD' };

if (localStorage.getItem('pref')) {
  preferences = JSON.parse(localStorage.getItem('pref'));
  console.log('saved', preferences);
}

const preferenceStore = writable(preferences);

const set = (from, to) => {
  if (!_.isEmpty(from) && !_.isEmpty(to)) {
    console.log(from, to, 'saving preferences');
    preferenceStore.set({ from, to });
  }
};
preferenceStore.subscribe((pref) => {
  localStorage.setItem('pref', JSON.stringify(pref));
});

export default {
  subscribe: preferenceStore.subscribe,
  set,
};
