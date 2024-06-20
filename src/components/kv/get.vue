<template>
  <div>
    <el-tag>服务器</el-tag>
    <el-input type="text" v-model.lazy.trim="server"> </el-input>
  </div>
  <div class="query_table">
    <p>
      <el-tag>缓存键</el-tag>
      <el-input type="text" v-model.lazy.trim="cache_key"> </el-input>
    </p>
    <p>
      <el-button type="success" @click="get_cache_value">查询</el-button>
    </p>
    <p>
      <el-tag>返回码</el-tag> <el-input type="number" v-model.lazy="code" disabled> </el-input>
      <el-tag>返回信息</el-tag> <el-input type="text" v-model.lazy="msg" disabled> </el-input>
    </p>
    <p>
      <el-tag>缓存值</el-tag>
      <el-input type="textarea" v-model.lazy="get_value" disabled> </el-input>
    </p>
  </div>
</template>

<script>

import querystring from "querystring";
import { httpPing } from "@/api/ping";

export default {
  data () {
    return {
      cache_key: 'cachekey',
      get_value: 'cachevalue',
      server: 'localhost:8018',
      code: 0,
      msg: '',
      pingd: "链接成功"
    }
  },
  methods: {
    get_cache_value: function() {
      this.$axios.get('http://' + this.server + '/ea/cache?key=' + this.cache_key)
          .then(response => {
            this.code = response.data.code;
            this.msg = response.data.message;
            this.get_value = response.data.value;
          })
    },
    ping_server: function() {
      try {
        let res = httpPing(this.server);
        if (res === true) {
          this.pingd = "链接成功"
        } else {
          this.pingd = "链接失败"
        }
      } catch (e) {
        this.pingd = "链接失败"
      }
    }
  }
}
</script>
