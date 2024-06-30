<script>
import axios from "axios/dist/axios";
import {root} from "../../.eslintrc";
import index from "vuex";
import {enable} from "core-js/internals/internal-metadata";

export default {
  computed: {
    index() {
      return index
    }
  },
  data() {
    return {
      queryEnv: '',
      launchCmd: '',
      launchArgs: '',
      launchDir: '',
      currentPage: 1,
      loading: false,
      pagesize: 5,
      dialogVisible: false,
      total: 0,
      envArray: [],
      server: {
        code: 0,
        msg: 'null',
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
    launchQuery(endpoint) {
      this.loading = true;
      let url = 'http://' + endpoint + '/eabi/melon/launch';
      if(this.queryEnv !== '') {
        url += '?match=' + this.queryEnv;
      }
      axios.get(url, {}).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
        this.launchCmd = response.data.cmd;
        this.launchArgs = response.data.args;
        this.launchDir = response.data.work_dir;
        if ('envs' in response.data) {
          this.envArray = response.data.envs;
          this.total = this.envArray.length;
        } else {
          this.envArray = [];
          this.total = 0;
        }
        if (this.server.code === 0) {
          this.$notify({
            message: '查询成功！' + this.server.msg,
            type: 'success',
          });
        } else {
          this.$notify({
            message: '查询失败！' + this.server.msg,
            type: 'warning',
          });
        }
      }).catch(error => {
        this.$notify({
          message: '连接失败！',
          type: 'error',
        });
      });
      this.loading = false;
    },
    copyText(row, column, cell, event) {
      let save = function (e) {
        e.clipboardData.setData('text/plain', event.target.innerText);
        e.preventDefault();
      }
      document.addEventListener('copy', save);//添加一个copy事件
      document.execCommand("copy");//执行copy方法\
      this.$notify({
        message: '恭喜你，复制成功！' + event.target.innerText,
        type: 'success'
      });
    },
    current_change(currentPage) {
      this.currentPage = currentPage;
    },
    handleCancel() {
      return this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
  }
}

</script>

<template>
  <el-row>
    <el-col :span="24">
      <div slot="header" class="clearfix">
        <el-tag>flags</el-tag>
        <el-input type="text" v-model.lazy.trim="queryEnv" placeholder="env" clearable></el-input>
        <el-button type="success" @click="launchQuery(serverEndpoint)">查询</el-button>
        <p>返回值 ： {{ server.code }}</p>
        <p>返回信息： {{ server.msg }}</p>
        <p>环境变量： {{ total }}</p>
      </div>
      <div>
        <p>服务名称 :{{ launchCmd }}</p>
        <p>服务参数 :{{ launchArgs }}</p>
        <p>服务路径 :{{ launchDir }}</p>
      </div>
      <el-table stripe="stripe" border="border"
                @cell-dblclick="copyText"
                :data="envArray.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
                style="width: 100%" v-loading="loading">
        <el-table-column
            prop="name"
            label="变量名称">
        </el-table-column>
        <el-table-column
            prop="value"
            label="变量值">
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
  </el-row>

</template>

<style scoped lang="scss">


</style>
