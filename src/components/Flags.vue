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
      queryFlags: '',
      resetFlagsName: '',
      queryValue: '',
      currentPage: 1,
      loading: false,
      pagesize: 5,
      dialogVisible: false,
      total: 0,
      flagsArray: [],
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
    enable,
    root() {
      return root
    },
    configQueryProxy(endpoint) {
      this.loading = true;
      this.configList(endpoint);
      this.loading = false;
    },
    configList(endpoint) {
      let url = 'http://' + endpoint + '/eabi/melon/flags';
      if(this.queryFlags !== '') {
        url += '?match=' + this.queryFlags;
      }
      axios.post(url, {}).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
        if ('flags' in response.data) {
          this.flagsArray = response.data.flags;
          this.total = this.flagsArray.length;
        } else {
          this.flagsArray = [];
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
    },

    handleReset() {
      axios.post('http://' + this.serverEndpoint + '/eabi/melon/flags/reset', {
        name: this.resetFlagsName,
        value: this.queryValue
      }).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
        if (this.server.code === 0) {
          this.$notify({
            message: '重置成功！' + this.server.msg,
            type: 'success',
          });
          for(let i = 0; i < this.flagsArray.length; i++) {
            if (this.flagsArray[i].name === this.resetFlagsName) {
              this.flagsArray[i].current_value = this.queryValue;
            }
          }
        } else {
          this.$notify({
            message: '重置失败！' + this.server.msg,
            type: 'warning',
          });
        }
      }).catch(error => {
        this.$notify({
          message: '连接失败！',
          type: 'error',
        });
      });
      this.dialogVisible = false;
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
    enableDialog(row) {
      this.resetFlagsName = row.name;
      this.dialogVisible = true;
    }
  }
}

</script>

<template>
  <el-row>
    <el-col :span="24">
      <div slot="header" class="clearfix">
        <el-tag>flags</el-tag>
        <el-input type="text" v-model.lazy.trim="queryFlags" placeholder="config name" clearable></el-input>
        <el-button type="success" @click="configQueryProxy(serverEndpoint)">查询</el-button>
        <p>返回值 ： {{ server.code }}</p>
        <p>返回信息： {{ server.msg }}</p>
        <p>配置列表： {{ total }}</p>
      </div>
      <el-table stripe="stripe" border="border"
                @cell-dblclick="copyText"
                :data="flagsArray.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
                style="width: 100%" v-loading="loading">
        <el-table-column
            prop="name"
            label="name">
        </el-table-column>
        <el-table-column
            prop="default_value"
            label="默认值">
        </el-table-column>
        <el-table-column
            prop="current_value"
            label="当前值"
        >
          <template #default="{ row}">
            <el-tag v-if="row.current_value === row.default_value">{{ row.current_value }}</el-tag>
            <el-tag v-else type="success">{{ row.current_value }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="help"
            label="描述">
        </el-table-column>
        <el-table-column
            prop="file"
            label="文件">
        </el-table-column>
        <el-table-column
            label="操作"
            width="90">
          <template #default="{ row}">
            <el-button type="success"
                       size="mini"
                       @click="enableDialog(row)" :disabled=!row.reset_able>设置
            </el-button>
            <el-dialog
                title="提示"
                :model-value="dialogVisible"
                width="50%"
                :before-close="handleClose">
              <el-input v-model="queryValue" placeholder="请输入新值"></el-input>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleReset">确 定</el-button>
              </span>
            </el-dialog>
          </template>
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
