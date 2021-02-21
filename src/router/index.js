import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/index',
    component: Layout,
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: { title: '主页', icon: 'form' }
      }
    ]
  },
  {
    path: '/person',
    component: Layout,
    redirect: '/person/teacher',
    name: 'Person',
    meta: { title: '人员管理', icon: 'example' },
    children: [
      {
        path: 'teacher',
        name: 'Teacher',
        component: () => import('@/views/person/teacher/teacher'),
        meta: { title: '老师管理', icon: 'table' }
      },
      {
        path: 'educationteacher',
        name: 'Educationteacher',
        component: () => import('@/views/person/educationteacher/educationteacher'),
        meta: { title: '教务老师管理', icon: 'tree' },
        hidden: true
      },
      {
        path: 'student',
        name: 'Student',
        component: () => import('@/views/person/student/student'),
        meta: { title: '学生管理', icon: 'tree' }
      }
    ]
  },

  {
    path: '/sign',
    component: Layout,
    redirect: '/sign/signdata',
    name: 'Sign',
    meta: { title: '签到管理', icon: 'example' },
    children: [
      {
        path: 'signdata',
        name: 'Signdata',
        component: () => import('@/views/sign/signdata'),
        meta: { title: '签到数据统计', icon: 'table' },
        children: [
        ]
      },
      {
        path: 'classresult',
        name: 'Classresult',
        component: () => import('@/views/sign/classresult'),
        meta: { title: '课堂签到统计', icon: 'tree' },
        hidden: true
      },
      {
        path: 'labresult',
        name: 'Labresult',
        component: () => import('@/views/sign/labresult'),
        meta: { title: '实验室签到统计', icon: 'tree' },
        hidden: true
      },
      {
        path: 'signpoint',
        name: 'Signpoint',
        component: () => import('@/views/sign/signpoint'),
        meta: { title: '签到地点管理', icon: 'tree' }
      },
      {
        path: 'signpointmanagement',
        name: 'Signpointmanagement',
        component: () => import('@/views/sign/signpointmanagement'),
        meta: { title: '测试点管理', icon: 'tree' },
        //hidden: true
      },
      {
        path: 'labsigndetial',
        name: 'Labsigndetial',
        component: () => import('@/views/sign/labsigndetial'),
        meta: { title: '实验室签到', icon: 'tree' },
        hidden: true
      },
      {
        path: 'classsigndetial',
        name: 'Classsigndetial',
        component: () => import('@/views/sign/classsigndetial'),
        meta: { title: '签到详情', icon: 'tree' },
        hidden: true
      },
      {
        path: 'classsignitemlist',
        name: 'Classsignitemlist',
        component: () => import('@/views/sign/classsignitemlist'),
        meta: { title: '教师发起签到记录', icon: 'tree' },
        hidden: true
      }
    ]
  },

  {
    path: '/wifimanage',
    component: Layout,
    redirect: '/showlocalindex',
    name: 'wifi',
    meta: { title: 'Wifi管理', icon: 'example' },
    children: [{
      path: '/showlocal',
      name: 'Wifilocal',
      component: () => import('@/views/dashboard/wifilocal/index'),
      meta: { title: '同一点wifi对比', icon: 'dashboard' },
      children: [{
        path: '/showlocal',
        component: () => import('@/views/dashboard/wifilocal/pages/showlocal'),
        hidden: true
      }, {
        path: '/localPoint',
        component: () => import('@/views/dashboard/wifilocal/pages/localPoint'),
        hidden: true
      }, {
        path: '/contrast',
        component: () => import('@/views/dashboard/wifilocal/pages/contrast'),
        hidden: true
      }]
    }, {
      path: '/contrastlist',
      name: 'Locallist',
      component: () => import('@/views/dashboard/wifiinfo/index'),
      meta: { title: '不同手机数据对比', icon: 'dashboard' },
      // locallistpoint
      children: [{
        path: '/locallist',
        component: () => import('@/views/dashboard/wifiinfo/pages/locallist'),
        hidden: true
      }, {
        path: '/locallistpoint',
        component: () => import('@/views/dashboard/wifiinfo/pages/locallistpoint'),
        hidden: true
      }, {
        path: '/contrastlist',
        component: () => import('@/views/dashboard/wifiinfo/pages/contrastlist'),
        hidden: true
      }]
    }
    ]
  },

  {
    path: '/question',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Question',
        component: () => import('@/views/question/index'),
        meta: { title: '问题反馈', icon: 'form' }
      }
    ]
  },
  {
    path: '/labmanage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'LabManage',
        component: () => import('@/views/labmanage/index'),
        meta: { title: '实验室管理', icon: 'form' }
      },
      {
        path: 'labpersionmanagement',
        component: () => import('@/views/labmanage/labpersionmanagement'),
        name: 'Labpersionmanagement',
        meta: { title: '课程管理' },
        hidden: true
      }
    ]
  },
  {
    path: '/classmanage',
    component: Layout,
    redirect: '/classmanage/courseManagement',
    name: 'Classmanage',
    meta: {
      title: '课程管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'courseManagement',
        component: () => import('@/views/classmanage/coursemanagement/courseManagement'),
        name: 'CourseManagement',
        meta: { title: '课程管理' }
      },
      {
        path: 'roomManagement',
        component: () => import('@/views/classmanage/roommanagement/roomManagement'),
        name: 'RoomManagement',
        meta: { title: '教室管理' }
      },
      {
        meta: { title: '教室座位管理' },
        path: 'roomSeatManagement',
        name: 'RoomSeatManagement',
        component: () => import('@/views/classmanage/roommanagement/roomSeatManagement'),
        hidden: true
      },
      {
        path: 'classManagement',
        component: () => import('@/views/classmanage/classmanagement/classManagement'),
        name: 'ClassManagement',
        meta: { title: '专业-班级管理' },
        hidden: true
      },
      {
        path: 'majorityManagement',
        component: () => import('@/views/classmanage/classmanagement/majorityManagement'),
        name: 'ClassManagement',
        meta: { title: '专业-班级管理' }
      },
      {
        path: 'courseMajorityManagement',
        component: () => import('@/views/coursetable/courseMajorityManagement'),
        name: 'CourseMajorityManagement',
        meta: { title: '课表专业选择' }
      },
      {
        path: 'courseClassManagement',
        component: () => import('@/views/coursetable/courseClassManagement'),
        name: 'ConrseTableManagement',
        meta: { title: '课表班级选择' },
        hidden: true
      },
      {
        path: 'conrseTableManagement',
        component: () => import('@/views/coursetable/conrseTableManagement'),
        name: 'CourseMajorityManagement',
        meta: { title: '课表管理' },
        hidden: true
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
