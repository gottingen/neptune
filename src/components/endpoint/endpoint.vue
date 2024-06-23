<script>
import axios from "axios/dist/axios";
export default {
  data() {
    return {
      serverEndpoint: 'localhost:8010',
      testResult: '失败',
      labelType: true,
      buttonType: 'danger'
    }
  },
  methods: {
    uptoParent() {
      this.$emit('OnUpdateServer', this.serverEndpoint)
    },
    testConnection() {
      try {
        axios.get('http://' + this.serverEndpoint + '/ea')
            .then(response => {
              this.testResult = '成功'
              this.labelType = false
              this.buttonType = 'success'
            }).catch(error => {
          this.testResult = '失败'
          this.labelType = true
          this.buttonType = 'danger'
        })
      } catch (error) {
        this.testResult = '失败'
        this.labelType = true
        this.buttonType = 'danger'
      }
    }
  }
}

</script>

<template>
  <div id="no-wrap">
        <el-text >服务器地址:</el-text>
        <el-input type="text" v-model="serverEndpoint" clearable></el-input>
        <el-button v-bind:type="buttonType" @click="uptoParent" v-bind:disabled="labelType">提交</el-button>
        <el-button type="success" @click="testConnection">测试</el-button>
        <el-tag v-bind:type="buttonType">测试结果: {{ testResult }}</el-tag>
  </div>

</template>

<style scoped lang="scss">

#no-wrap {
  white-space: nowrap;
}
</style>