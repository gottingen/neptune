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
      <el-button type="success" @click="set_cache_value">设置</el-button>
    </p>
    <p>
      <el-tag>返回码</el-tag> <el-input type="number" v-model.lazy="code" disabled> </el-input>
      <el-tag>返回信息</el-tag> <el-input type="text" v-model.lazy="msg" disabled> </el-input>
    </p>
    <p>
      <el-tag>缓存值</el-tag>
      <el-input type="textarea" v-model.lazy="input_value"> </el-input>
    </p>
  </div>
</template>

<script>

import querystring from "querystring";

export default {
  data () {
    return {
      cache_key: 'cachekey',
      input_value: 'cachevalue',
      server: 'localhost:8018',
      code: 0,
      msg: '',
    }
  },
  methods: {
    set_cache_value: function() {
      this.$axios.post('http://' + this.server + '/ea/cache?key=' + this.cache_key,this.input_value)
          .then(response => {
            this.code = response.data.code;
            this.msg = response.data.message;
          })
    }
  }
}
</script>
