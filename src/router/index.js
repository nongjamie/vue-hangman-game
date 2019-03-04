import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import ScoreRecord from '@/components/Scorerecord'
import BeforeConsole from '@/components/Beforeconsole'
import Console from '@/components/Console'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Homepage
    },
    {
      path: '/scoreRecord',
      component: ScoreRecord
    },
    {
      path: '/beforeConsole',
      component: BeforeConsole
    },
    {
      path: '/gameConsole',
      component: Console
    }
  ]
})
