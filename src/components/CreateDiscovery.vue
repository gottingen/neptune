<script>

import axios from "axios/dist/axios";

export default {
  data() {
    return {
      appName: '',
      zoneName: '',
      server: {
        code: 0,
        msg: 'null'
      }
    }
  },
  props: {
    serverEndpoint: {
      type: String,
      required: true
    }
  },
  methods: {
    appCreate(endpoint) {
        axios.post('http://' + endpoint + '/ea/discovery/app/create', {
          app_name: this.appName,
          quota: 0,
        }).then(response => {
          this.server.code = response.data.code;
          this.server.msg = response.data.message;
          if(this.server.code === 0) {
          this.$notify({
            message: '创建成功！' + this.server.msg,
            type: 'success',
          });
          } else {
            this.$notify({
              message: '创建失败！' + this.server.msg,
              type: 'warning',
            });
          }
        }).catch(error => {
          this.$notify({
            message: '连接失败！',
            type: 'error',
          });
        });
    },
    zoneCreate(endpoint) {
      axios.post('http://' + endpoint + '/ea/discovery/zone/create', {
        app_name: this.appName,
        zone_name: this.zoneName,
        quota: 0,
      }).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
        if(this.server.code === 0) {
          this.$notify({
            message: '创建成功！' + this.server.msg,
            type: 'success',
          });
        } else {
          this.$notify({
            message: '创建失败！' + this.server.msg,
            type: 'warning',
          });
        }
      }).catch(error => {
        this.$notify({
          message: '连接失败！',
          type: 'error',
        });
      });
    },
  }
}

</script>

<template>
  <div>
    <p>
      <el-tag size="medium">应用名</el-tag>
      <el-input type="text" v-model.lazy.trim="appName" size="small" placeholder="kumo" style="width: 40%"
                clearable></el-input>
      <el-button type="success" size="small" @click="appCreate(serverEndpoint)">创建应用</el-button>
    </p>
    <el-divider></el-divider>
    <p>
      <el-tag size="medium">集群</el-tag>
      {{ appName + '.'}}
      <el-input type="text" v-model.lazy.trim="zoneName" size="small" placeholder=“电信机房-集群” style="width: 40%"
                clearable>
      </el-input>
      <el-button type="success" size="small" @click="zoneCreate(serverEndpoint)">创建集群</el-button>
    </p>
    <p>
      返回值 ： {{ server.code }}
      返回信息： {{ server.msg }}
    </p>
  </div>
</template>

<style scoped lang="scss">


</style>