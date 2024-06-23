<script>
export default {
  data() {
    return {
      confName: 'conf_name',
      confVersion: '0.1.2',
      confTime: 0,
      confContent: '',
      confType: '',
      currentPage: 1,
      loading: false,
      pagesize: 20,
      currentOpConf: 'none',
      currentOpVersion: '1.2.3',
      lastVersion: false,
      disableEditVersion: false,
      total: 0,
      configArray: [],
      versionArray: [],
      totalVersion: 0,
      currentVersionPage: 1,
      server: {
        code: 0,
        msg: 'null',
        configs: [],
        varray: []
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
    configList(endpoint) {
      this.$axios.post('http://' + endpoint + '/ea/config/list', {}).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
        this.server.configs = response.data.config
        this.total = response.data.config.length;
        this.configArray = [];
        //this.server.configs.sort();
        for (let i = 0; i < this.total; i++) {
          this.configArray.push({name: this.server.configs[i], index: i})
        }
        this.loading = false;
      })
    },
    configVersionList(endpoint) {
      this.$axios.post('http://' + endpoint + '/ea/config/version', {
        name: this.currentOpConf
      }).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
        this.versionArray = [];
        this.totalVersion = response.data.versions.length;
        this.server.varray = response.data.versions;
        //this.server.varray.sort();
        for (let i = 0; i < this.totalVersion; i++) {
          this.versionArray.push({version: this.server.varray[i], index: i})
        }
        console.log(this.versionArray)
      })
    },
    configQuery(endpoint) {
      this.$axios.post('http://' + endpoint + '/ea/config/query', {
        name: this.currentOpConf,
        version: this.currentOpVersion
      }).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
        this.confContent = response.data.content;
        this.confType = response.data.type;
        this.confTime = response.data.createtime;
        this.confVersion = response.data.version;
        console.log(response.data)
      })
    },
    current_change(currentPage) {
      this.currentPage = currentPage;
    },
    currentVersionChange(currentPage) {
      this.currentVersionPage = currentPage;
    },
    OnChangeAllVersion() {
      if (this.lastVersion) {
        this.currentOpVersion = '';
        this.disableEditVersion = true;
      } else {
        this.currentOpVersion = '0.1.2';
        this.disableEditVersion = false;
      }
    },
    checkDetail(name) {
      this.currentOpConf = name;
    },
    modifyUser(name) {
      this.currentOpConf = name;
    },
    deleteUser(name) {
      this.currentOpConf = name;
    },
  }
}

</script>

<template>
  <el-row>
    <el-col :span="8">
      <div slot="header" class="clearfix">
        <el-button type="success" @click="configList(serverEndpoint)">获取列表</el-button>
        <p>返回值 ： {{ server.code }}</p>
        <p>返回信息： {{ server.msg }}</p>
        <p>配置列表： {{ total }}</p>
      </div>
      <el-table stripe="stripe" border="border"
                :data="configArray.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
                style="width: 100%" v-loading="loading">
        <el-table-column
            prop="index"
            label="序号"
            width="90">
        </el-table-column>
        <el-table-column
            prop="name"
            label="配置名称"
            width="180">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
            layout="prev, pager, next"
            @current-change="current_change"
            :page-size="pagesize"
            :total="total">
        </el-pagination>
      </div>
    </el-col>
    <el-col :span="8">
      <div slot="header" class="clearfix">
        <el-tag>查询配置</el-tag>
        <el-input type="text" v-model.lazy.trim="currentOpConf"></el-input>
        <el-button type="success" @click="configVersionList(serverEndpoint)">版本列表</el-button>
        <p>返回值 ： {{ server.code }}</p>
        <p>返回信息： {{ server.msg }}</p>
        <p>版本数量： {{ totalVersion }}</p>
      </div>
      <el-table
          :data="versionArray.slice((currentVersionPage - 1) * pagesize, currentVersionPage * pagesize)"
          style="width: 100%" v-loading="loading">
        <el-table-column
            prop="index"
            label="序号"
            width="90">
        </el-table-column>
        <el-table-column
            prop="version"
            label="版本"
            width="180">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
            layout="prev, pager, next"
            @current-change="currentVersionChange"
            :page-size="pagesize"
            :total="totalVersion">
        </el-pagination>
      </div>
    </el-col>
    <el-col :span="8">
      <div slot="header" class="clearfix">
        <el-tag>版本</el-tag>
        <el-checkbox v-model="lastVersion" @click="OnChangeAllVersion" @change="OnChangeAllVersion">最新版本
        </el-checkbox>
        <el-input type="text" v-model.lazy.trim="currentOpVersion" :disabled="disableEditVersion"></el-input>
        <el-button type="success" @click="configQuery(serverEndpoint)">版本信息</el-button>
        <p>返回值 ： {{ server.code }}</p>
        <p>返回信息： {{ server.msg }}</p>
      </div>
      <el-card>
        <p>配置类型： {{ confType }}</p>
        <p>配置时间： {{ confTime }}</p>
        <p>配置版本： {{ confVersion }}</p>
        <p>配置内容： {{ confContent }}</p>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">


</style>
