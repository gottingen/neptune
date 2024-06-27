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
      <el-button size="small" type="primary" @click="openInNewTab('https://github.com/gottingen/kumo-search')">kumo
        search
      </el-button>
      <el-button size="small" type="primary" @click="openInNewTab('https://github.com/gottingen/turbo')">turbo
      </el-button>
      <el-button size="small" type="primary" @click="openInNewTab('https://github.com/gottingen/melon')">melon
      </el-button>
      <el-button size="small" type="primary" @click="openInNewTab('https://github.com/gottingen/flare')">flare
      </el-button>
      <el-button size="small" type="primary" @click="openInNewTab('https://github.com/gottingen/hercules')">hercules
      </el-button>
      <el-button size="small" type="primary" @click="openInNewTab('https://github.com/gottingen/alkaid')">alkaid
      </el-button>
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
        title: "Kumo search",
        desc: "Kumo Search Projects",
        bgImage: require("@/asset/img/kumo_search.png")
      },
    };
  },
  created() {
  },
  methods: {
    openInNewTab(url) {
      window.open(url, '_blank');
    }
  },
};
</script>