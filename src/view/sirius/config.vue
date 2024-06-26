<template>
  <div class="setting">
    <el-container>
      <el-header>
        <span>{{ "当前地址: " + $store.state.backendAddr }}</span>
        <p>
          <el-button type="success" size="small" @click="callSetting">设置</el-button>
        </p>
      </el-header>
      <el-main>
        <el-tabs type="border-card" class="cardsetting">
          <el-tab-pane label="创建配置">
            <CreateConf :serverEndpoint="$store.state.backendAddr"></CreateConf>
          </el-tab-pane>
          <el-tab-pane label="删除配置">
            <RemoveConfig :serverEndpoint="$store.state.backendAddr"></RemoveConfig>
          </el-tab-pane>
          <el-tab-pane label="查询配置">
            <ListConfig :serverEndpoint="$store.state.backendAddr"></ListConfig>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios/dist/axios";
import CreateConf from "@/components/CreateConf";
import RemoveConfig from "@/components/RemoveConfig";
import ListConfig from "@/components/ListConfig";

export default {
  components: {
    CreateConf,
    RemoveConfig,
    ListConfig
  },
  data() {
    return {
      serverEndpoint: 'localhost:8018',
      labelType: true,
      testResult: '失败',
      buttonType: 'danger'
    };
  },
  methods: {
    callSetting() {
      this.$emit("api", {
        event: "openApp",
        app: "system_setting",
      });
    },
  },
  created() {
  },
};
</script>

<style scoped lang="scss">
.setting {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  color: #333;
  text-shadow: none;
  font-weight: 300;
  overflow: hidden;
  margin: 10px 20px;
}

.cardsetting {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
  color: #333;
  text-shadow: none;
  font-weight: 300;
  overflow: hidden;
  margin: 10px 20px;
  align-content: center;
  align-self: center;
}

.header {
  font-size: 18px;
  color: black;
  font-family: "AR PL UKai CN";
  font-weight: 700;
  letter-spacing: 4px;
}

.spanner {
  font-size: 20px;
  color: black;
  font-family: "Abyssinica SIL";
  font-weight: 800;
  letter-spacing: 6px;
  text-align: center;
}


.address {
  font-size: 16px;
  color: black;
  font-family: "Abyssinica SIL";
  font-weight: 600;
  letter-spacing: 2px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 240px;
  height: 480px;
  background: #cce8cf;
}

.splitter {
  margin: 2px;
  background: black;
}
</style>
