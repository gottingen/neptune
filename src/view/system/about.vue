<template>
  <div class="about">
    <div class="top">
      <i class="iconfont icon-k"></i>
      <div class="info">
        <div class="title">{{ about.title }}</div>
        <div class="version">{{ about.version }}</div>
      </div>
    </div>
    <!--
    <div class="badges">
      <img src="https://svg.hamm.cn/gitee.svg?type=star&user=hamm&project=mac-ui&logo=yes" />
      <img src="https://svg.hamm.cn/gitee.svg?user=hamm&project=mac-ui&type=issue&logo=yes" />
    </div>
    -->
    <div class="copyright">{{ about.copyright }}</div>
  </div>
</template>

<style scoped lang="scss">
.about {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  color: #333;
  text-shadow: none;
  font-weight: 300;
  .top {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    padding: 20px 40px;
    .iconfont {
      font-size: 48px;
      margin-right: 20px;
    }
    .info {
      flex-grow: 1;

      .title {
        font-size: 24px;
      }

      .version {
        font-size: 14px;
        color: #999;
      }
    }
  }
  .badges {
    text-align: center;
    img {
      margin: 0px 3px;
    }
  }
  .copyright {
    font-size: 12px;
    color: #999;
    padding: 20px;
    text-align: center;
  }
}
</style>
<script setup>
import { reactive } from 'vue'
const about = reactive({
  title: "Kumo Search WebUI",
  version: "v0.2.0 2024-07-10",
  copyright: "本项目基于 Elastic Architecture(EA) 平台开发，由 Kumo Search 团队维护。",
})
</script>