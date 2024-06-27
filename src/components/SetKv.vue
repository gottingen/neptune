<script>

import axios from "axios/dist/axios";

export default {
  data() {
    return {
      key: '',
      value: '',
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
    setKV(endpoint) {
      axios.post('http://' + endpoint + '/ea/cache/set?key=' + this.key,this.value).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
        if(this.server.code === 0) {
          this.$notify({
            message: '设置成功！' + this.server.msg,
            type: 'success',
          });
        } else {
          this.$notify({
            message: '设置失败！' + this.server.msg,
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
      <el-tag size="medium">缓存键</el-tag>
      <el-input type="text" v-model.lazy.trim="key" size="small" placeholder="key" style="width: 40%"
                clearable></el-input>
    </p>
    <el-divider></el-divider>
    <p>
      <el-button type="success" size="small" @click="setKV(serverEndpoint)">设置缓存</el-button>
    </p>
    <p>
      返回值 ： {{ server.code }}
      返回信息： {{ server.msg }}
    </p>
    <el-input type="textarea" v-model.lazy.trim="value" size="small" placeholder=“value” style="width: 80%"
              clearable>
    </el-input>
  </div>
</template>

<style scoped lang="scss">


</style>