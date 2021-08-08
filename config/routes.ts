export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: '登录',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
  },
  {
    path: '/system',
    name: '系统管理',
    routes: [
      {
        path: '/system/UserList',
        name: '用户管理',
        component: './system/UserList',
      },
    ],
  },
  { component: './404' },
];
