import { defineStore, acceptHMRUpdate } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    allLocales: ['en', 'ru'],
    currentLocale: 'ru',
  }),

  actions: {
    async init() {
      if (!localStorage.getItem('locale')) {
        localStorage.setItem('locale', this.currentLocale);
      } else {
        this.currentLocale = localStorage.getItem('locale') as string;
      }
    },
  },
});

const meta = import.meta as any;
if (meta.hot) meta.hot.accept(acceptHMRUpdate(useMainStore, meta.hot));
if (meta.webpackHot)
  meta.webpackHot.accept(acceptHMRUpdate(useMainStore, meta.webpackHot));
