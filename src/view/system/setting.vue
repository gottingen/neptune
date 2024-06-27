<template>
  <div class="setting">
    <el-row>
      <el-col :span="24" class="spanner">
        <span>服务器地址配置</span>
      </el-col>
      <el-divider class="splitter"></el-divider>
      <el-col :span="2">
      </el-col>
      <el-col :span="10">
        <el-card class="box-card">
          <span class="header">当前地址</span>
          <el-divider class="splitter"></el-divider>
          <p class="address">{{ $store.state.backendAddr }}</p>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="box-card">
          <span class="header">设置地址</span>
          <el-divider class="splitter"></el-divider>
          <el-input type="text" v-model="serverEndpoint" clearable></el-input>
          <el-tag>{{testResult}}</el-tag>
          <el-button :type="buttonType" size="small" @click="uptoParent" :disabled="labelType">提交</el-button>
          <el-button type="success" size="small" @click="testConnection">测试</el-button>
        </el-card>
      </el-col>
      <el-col :span="2">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios/dist/axios";

export default {
  data() {
    return {
      serverEndpoint: 'localhost:8018',
      labelType: true,
      testResult: '失败',
      buttonType: 'danger'
    };
  },
  methods: {
    uptoParent() {
      this.$store.state.backendAddr = this.serverEndpoint;
    },
    testConnection() {
      try {
        axios.get('http://' + this.serverEndpoint + '/ea', {transformResponse: [function (data) {
          return {data: data}
        }]}).then(response => {
              console.log(response)
              this.testResult = '成功'
              this.labelType = false
              this.buttonType = 'success'
          this.$notify({
            message: '连接成功！' + this.serverEndpoint,
            type: 'success',
          });
            }).catch(error => {
          console.log(error)
          this.testResult = '失败'
          this.labelType = true
          this.buttonType = 'danger'
          this.$notify({
            message: '连接失败！' +this.serverEndpoint,
            type: 'error',
          });
        })
      } catch (error) {
        this.testResult = '失败'
        this.labelType = true
        this.buttonType = 'danger'
      }
    }
  },
  created() {
  },
};
</script>

<style scoped lang="scss">
.setting {
  display: flex;
  flex-direction: column;
  height: 350px;
  width: 100%;
  color: #333;
  text-shadow: none;
  font-weight: 300;
  overflow: hidden;
  margin: 10px 20px;
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
  height: 180px;
  background: #cce8cf;
}

.splitter {
  margin: 2px;
  background: black;
}
</style>
