<template>
  <div class="demo">
    <div class="top">
      <i class="iconfont icon-k"></i>
      <div class="info">
        <div class="title">{{ demo.title }}</div>
        <div class="desc">{{ demo.desc }}</div>
      </div>
    </div>
    <div class="body">
      <el-button size="small" type="primary" @click="callKv">kv存储</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo {
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
    padding: 20px;

    .info {
      flex-grow: 1;

      .title {
        font-size: 24px;
      }

      .desc {
        font-size: 14px;
        color: #999;
      }
    }

    .iconfont {
      font-size: 48px;
      margin-right: 20px;
    }
  }

  .body {
    padding: 20px;

    button {
      display: inline-block;
      margin: 5px;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      demo: {
        title: "EA半小时",
        desc: "EA半小时系列前端",
        bgImage: require("@/asset/img/kumo_search.png")
      },
    };
  },
  created() {
  },
  methods: {
    callKv() {
      this.$emit("api", {
        event: "openApp",
        app: "sirius_kv",
      });
    },
    openInNewTab(url) {
      window.open(url, '_blank');
    }
  },
};
</script>