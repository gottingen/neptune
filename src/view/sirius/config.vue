<template>
  <div class="setting">
    <el-container>
      <el-header>
        <span>{{ "当前地址: " + $store.state.backendAddr }}</span>
      </el-header>
      <el-main>
        <CreateConf :serverEndpoint="$store.state.backendAddr"></CreateConf>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios/dist/axios";
import CreateConf from "@/components/CreateConf";

export default {
  components: {
    CreateConf
  },
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
        axios.get('http://' + this.serverEndpoint + '/ea')
            .then(response => {
              console.log(response)
              this.testResult = '成功'
              this.labelType = false
              this.buttonType = 'success'
            }).catch(error => {
          console.log(error)
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
  },
  created() {
  },
};
</script>

<style scoped lang="scss">
.setting {
  display: flex;
  flex-direction: column;
  height: 100%;
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
  height: 480px;
  background: #cce8cf;
}

.splitter {
  margin: 2px;
  background: black;
}
</style>
