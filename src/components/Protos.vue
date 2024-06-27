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
      queryProto: '',
      descValue: '',
      currentPage: 1,
      loading: false,
      pagesize: 5,
      dialogVisible: false,
      total: 0,
      protoArray: [],
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
    protoList(endpoint) {
      this.loading = true;
      let url = 'http://' + endpoint + '/eabi/melon/protobufs';
      if(this.queryProto !== '') {
        url += '?match=' + this.queryProto;
      }
      axios.post(url, {}).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
        if ('protobufs' in response.data) {
          this.protoArray = response.data.protobufs;
          this.total = this.protoArray.length;
        } else {
          this.protoArray = [];
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
    enableDialog(row) {
      this.descValue = row.detail;
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
        <el-input type="text" v-model.lazy.trim="queryProto" placeholder="config name" clearable></el-input>
        <el-button type="success" @click="protoList(serverEndpoint)">查询</el-button>
        <p>返回值 ： {{ server.code }}</p>
        <p>返回信息： {{ server.msg }}</p>
        <p>配置列表： {{ total }}</p>
      </div>
      <el-table stripe="stripe" border="border"
                @cell-dblclick="copyText"
                :data="protoArray.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
                style="width: 100%" v-loading="loading">
        <el-table-column
            prop="proto"
            label="proto">
        </el-table-column>
        <el-table-column
            label="查看"
            width="90">
          <template #default="{ row}">
            <el-button type="success"
                       size="mini"
                       @click="enableDialog(row)">查看
            </el-button>
            <el-dialog
                title="提示"
                :model-value="dialogVisible"
                width="50%"
                :before-close="handleClose">
              <div>
                {{ descValue }}
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
