import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App,
  },
  {
    path: '/tugas/1',
    name: 'TugasPertemuan1',
    beforeEnter() { location.href = "https://kayla-projectcv.netlify.app/"; }
  },
  {
    path: '/tugas/2',
    name: 'TugasPertemuan2',
    beforeEnter() { location.href = "https://github.com/aurorakaylasakinahsyah/T2-PBK-Aurora"; }
  },
  {
    path: '/tugas/3',
    name: 'TugasPertemuan3',
    beforeEnter() { location.href = "https://aurorakayla.netlify.app/"; }
  },
  {
    path: '/tugas/4',
    name: 'TugasPertemuan4',
    beforeEnter() { location.href = "https://aurorakayla-sakinahsyah-t4-prakpbk.vercel.app/"; }
  },
  {
    path: '/tugas/5',
    name: 'TugasPertemuan5',
    beforeEnter() { location.href = "https://t5-pbk-kayla.vercel.app/"; }
  },
  {
    path: '/tugas/6',
    name: 'TugasPertemuan6',
    beforeEnter() { location.href = "https://comfy-bubblegum-3de90b.netlify.app/"; }
  },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
