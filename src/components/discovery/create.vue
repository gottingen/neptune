<script>
export default {
  data() {
    return {
      appName: 'app_name',
      quota: 0,
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
      this.$axios.post('http://' + endpoint + '/ea/discovery/app/create', {
        app_name: this.appName,
        quota: 0
      }).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
      })
    }
  }
}
//import { G } from "@element-plus/icons-vue";
</script>

<template>
  <div slot="header" class="clearfix">
    <el-row>
      <el-col span="24" >
        <el-card class="discovery-set">
          <el-tag>应用</el-tag>
          <el-input type="text" v-model.lazy.trim="appName"></el-input>
          <el-button type="success" @click="appCreate(serverEndpoint)"  icon="Setting" circle></el-button>
          <p>返回值 ： {{ server.code }}</p>
          <p>返回信息： {{ server.msg }}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">

#elcol{
  border:1px solid transparent
}

</style>