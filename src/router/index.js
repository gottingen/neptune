//导入 进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/components/Layout/index.vue";
import navPage from "@/views/index.vue";

const routes = [
  {
    path: "/",
    name: "Nav",
    meta: {
      name: "导航",
    },
    component: navPage,
  },
  {
    path: "/",
    name: "Layout",
    meta: {
      name: "Layout",
    },
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          name: "首页",
        },
        component: () => import("@/views/home/home.vue"),
      },
      {
        path: "/archives",
        name: "Archives",
        meta: {
          name: "里程碑",
        },
        component: () => import("@/views/archives/archives.vue"),
      },
      {
        path: "/monitor",
        name: "Monitor",
        meta: {
          name: "监控",
        },
        component: () => import("@/views/monitor/monitor.vue"),
      },
      {
        path: "/kv",
        name: "Kv",
        meta: {
          name: "键值",
        },
        component: () => import("@/views/kv/kv.vue"),
      },
      {
        path: "/vsearch",
        name: "Vsearch",
        meta: {
          name: "向量搜索",
        },
        component: () => import("@/views/vsearch/vsearch.vue"),
      },
      {
        path: "/conf",
        name: "Conf",
        meta: {
          name: "配置",
        },
        component: () => import("@/views/conf/conf.vue"),
      },
      {
        path: "/discovery",
        name: "discovery",
        meta: {
          name: "服务发现",
        },
        component: () => import("@/views/discovery/discovery.vue"),
      },
      {
        path: "/resource",
        name: "Resource",
        meta: {
          name: "资源",
        },
        component: () => import("@/views/links/resource.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    meta: {
      name: "404 not found",
    },
    component: () => import("@/views/404/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

// 不滚动到顶部的路由名单
const whiteList = ["/message/list"];

router.afterEach((to) => {
  // 切换就滚动到顶部
  if (!whiteList.includes(to.path)) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  NProgress.done();
});

export default router;
