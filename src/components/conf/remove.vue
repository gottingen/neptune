<script>

export default {
  data() {
    return {
      confName: 'conf_name',
      confVersion: '0.1.2',
      allVersion:false,
      disableEditVersion: false,
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
    configRemove(endpoint) {

      this.$axios.post('http://' + endpoint + '/ea/config/remove', {
        name: this.confName,
        version: this.confVersion,
      }).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
      })
    },
    OnChangeAllVersion() {
      if (this.allVersion) {
        this.confVersion = '';
        this.disableEditVersion = true;
      } else {
        this.confVersion = '0.1.2';
        this.disableEditVersion = false;
      }
    }
  }
}

</script>

<template>
  <div slot="header" class="clearfix">
    <el-tag>配置名</el-tag>
    <el-input type="text" v-model.lazy.trim="confName"> </el-input>
    <el-tag>版本</el-tag>
    <el-checkbox v-model="allVersion" @click="OnChangeAllVersion" @change="OnChangeAllVersion">全部版本</el-checkbox>
    <el-input type="text" v-model.lazy.trim="confVersion" :disabled="disableEditVersion"> </el-input>
    <el-button type="success" @click="configRemove(serverEndpoint)">删除</el-button>
    <p>返回值   ： {{ server.code }}</p>
    <p>返回信息： {{ server.msg }}</p>
  </div>
</template>

<style scoped lang="scss">


</style>