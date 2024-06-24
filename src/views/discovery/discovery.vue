<script setup>
import {ref, reactive, onMounted} from "vue";
import PageHeader from "@/components/PageHeader/index.vue";
import ServerAddr from "@/components/endpoint/endpoint.vue";
import appCreate from "@/components/discovery/create.vue";
import confRemove from "@/components/conf/remove.vue";
import confQuery from "@/components/conf/query.vue";

const server = reactive({
  server_addr: "localhost:8011",
  code: 0,
  msg: "none"
});

const RecvUpdateServer = (addr) => {
  server.server_addr = addr;
  console.log(server.server_addr);
};

const loading = ref(true);

</script>


<template>
  <PageHeader :loading="loading"/>
  <div class="kvs">
    <el-row class="small_center_box">
      <ServerAddr @OnUpdateServer="RecvUpdateServer"/>
    </el-row>
    <el-row class="center_box">
      <el-tabs type="border-card">
        <el-tab-pane label="创建配置">
          <appCreate :serverEndpoint="server.server_addr"/>
        </el-tab-pane>
        <el-tab-pane label="删除配置">
          <el-col :span="24">
            <el-card class="config-remove">
              <confRemove :serverEndpoint="server.server_addr"/>
            </el-card>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="查询配置">
          <confQuery :serverEndpoint="server.server_addr"/>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>
