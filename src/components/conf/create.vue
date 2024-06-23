<script>
export default {
  data() {
    return {
      confName: 'conf_name',
      confVersion: '0.1.2',
      confContent: 'content',
      confType: 'json',
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
    configCreate(endpoint) {
      this.$axios.post('http://' + endpoint + '/ea/config/create', {
        name: this.confName,
        version: this.confVersion,
        content: this.confContent,
        type: this.confType
      }).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
      })
    }
  }
}

</script>

<template>
  <div slot="header" class="clearfix">
    <el-tag>配置名</el-tag><el-input type="text" v-model.lazy.trim="confName"> </el-input>
    <el-tag>版本</el-tag>
    <el-input type="text" v-model.lazy.trim="confVersion"> </el-input>
    <el-tag>类型</el-tag>
    <el-input type="text" v-model.lazy.trim="confType"> </el-input>
    <el-tag>配置内容</el-tag>
    <el-input type="textarea" v-model.lazy.trim="confContent"> </el-input>
    <el-button type="success" @click="configCreate(serverEndpoint)">创建</el-button>
    <p>返回值   ： {{ server.code }}</p>
    <p>返回信息： {{ server.msg }}</p>
  </div>
</template>

<style scoped lang="scss">


</style>