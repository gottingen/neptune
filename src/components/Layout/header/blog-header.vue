<script setup>
import { onMounted, computed, reactive, h } from "vue";
import { useRoute, useRouter } from "vue-router";
import { user } from "@/store/index.js";
import { storeToRefs } from "pinia";
import { ElNotification } from "element-plus";
import MessageBox from "@/components/MessageBox/message-box.vue";
import { _setLocalItem } from "@/utils/tool";
import SwitchTheme from "@/components/SwitchTheme/index.vue";

const router = useRouter();
const route = useRoute();
const userStore = user();
const { getBlogAvatar, getUserInfo } = storeToRefs(userStore);
const headerState = reactive({
  drawerShow: false,
  startScrollTop: 0,
  headerClass: "",
  activeIndex: 0,
});

const getPath = computed(() => {
  return route.path;
});

// 切换menu
const handleSelect = async (val, type) => {
  if (val == "/logout") {
    await logOut();
    ElNotification({
      offset: 60,
      title: "提示",
      message: h("div", { style: "color: #7ec050; font-weight: 600;" }, "退出成功"),
    });
  } else if (val == "/login") {
    userStore.setShowLogin(true);
  } else {
    router.push(val);
  }
  if (type == "mobile") {
    headerState.drawerShow = false;
  }
};

// 切换抽屉
const handleClose = () => {
  headerState.drawerShow = false;
};

// 去登录
const toLogin = () => {
  userStore.setShowLogin(true);
  headerState.drawerShow = false;
  _setLocalItem("blogLastRouter", route.fullPath);
};

// 去个人中心
const toPersonal = () => {
  router.push("/userCenter");
  headerState.drawerShow = false;
};

// 退出登录
const logOut = () => {
  userStore.clearUserInfo();
  if (route.path == "/userCenter") {
    router.push("/home");
  }
};

// 顶部导航固定
const scroll = () => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const { startScrollTop } = headerState;
  if (scrollTop <= 50) {
    headerState.headerClass = "fixed-header";
    headerState.startScrollTop = scrollTop;
    return;
  }
  if (startScrollTop > scrollTop) {
    headerState.headerClass = "fixed-header";
  } else if (startScrollTop <= scrollTop) {
    headerState.headerClass = "hide-header";
  }
  headerState.startScrollTop = scrollTop;
};

onMounted(() => {
  // 页面增加滚动事件
  window.addEventListener("scroll", scroll);
});
</script>

<template>
  <div class="header_box" :class="headerState.headerClass">
    <div class="pc_menu flex_r_between">
      <div class="sub-avatar">
        <router-link v-if="getBlogAvatar" to="/"
          ><el-avatar class="el-avatar" :src="getBlogAvatar" />
        </router-link>
        <MessageBox class="ml-[10px]" v-if="getUserInfo.id" :user-id="getUserInfo.id" type="pc" />
      </div>
      <div class="flex_r_around">
        <BlogSearch></BlogSearch>
        <el-menu
          class="sub-menu"
          mode="horizontal"
          :default-active="getPath"
          :ellipsis="false"
          @select="(val) => handleSelect(val, 'pc')"
        >
          <el-menu-item index="/home"><i class="iconfont icon-home"></i> 主页</el-menu-item>
          <el-menu-item index="/kv"><i class="iconfont icon-icon"></i> 键值</el-menu-item>
          <el-menu-item index="/vsearch"><i class="iconfont icon-sort"></i> V搜</el-menu-item>
          <el-menu-item index="/conf"><i class="iconfont icon-paper"></i> 配置</el-menu-item>
          <el-menu-item index="/sirius"><i class="iconfont icon-speechbubble"></i> 服务发现</el-menu-item>
          <el-menu-item index="/resource"><i class="iconfont icon-pengyouquan"></i> 资源</el-menu-item>
          <el-menu-item index="/archives"><i class="iconfont icon-icon"></i> 里程碑</el-menu-item>
        </el-menu>
        <SwitchTheme />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header_box {
  .sub-avatar {
    padding: 5px 0 0 0;
    display: flex;
    align-items: center;
  }

  .sub-menu {
    height: 53px;

    .icon-sort {
      font-size: 1.2rem;
    }

    .icon-icon,
    .icon-label_fill {
      font-size: 1.3rem;
    }
  }
}

.pc_menu {
  :deep(.el-sub-menu__icon-arrow) {
    display: none;
  }
}

:deep(.el-menu--horizontal > .el-sub-menu .el-sub-menu__title:hover) {
  background-color: transparent;
}

.iconfont {
  font-size: 1.2rem;
  margin-right: 5px;
}

.icon-menu2 {
  font-size: 1.4rem;
}

.icon-menu {
  font-size: 1.1rem;
}

.icon-pengyouquan {
  font-size: 1.3rem;
}
.icon-timerauto {
  font-size: 1.1rem;
}

.icon-houduankaifa {
  font-size: 1.2rem;
}

.icon-tuichudenglu {
  font-size: 1.3rem;
}

.icon-liuyan {
  font-size: 1.3rem;
}

:deep(.el-drawer__close-btn .el-icon) {
  font-size: 22px;
}

.hide-header {
  animation-name: hideHeader;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
}

.fixed-header {
  animation-name: header;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
}

@keyframes header {
  0% {
    transform: translateY(-52px);
  }

  100% {
    transform: translateY(0px);
  }
}

@keyframes hideHeader {
  0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(-52px);
  }
}
</style>
