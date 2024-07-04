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
      flagAll: false,
      socketInfo: '',
      querySid: '',
      currentPage: 1,
      loading: false,
      pagesize: 5,
      dialogVisible: false,
      total: 0,
      connectionArray: [],
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
    connectionsList(endpoint) {
      let url = 'http://' + endpoint + '/eabi/melon/connections';
      if(this.flagAll) {
        url += '?all=1';
      }
      axios.get(url, {}).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
        if ('connections' in response.data) {
          this.connectionArray = response.data.connections;
          this.total = this.connectionArray.length;
        } else {
          this.connectionArray = [];
          this.total = 0;
        }
        console.log(this.connectionArray)
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

    querySocket() {
      let url = 'http://' + this.serverEndpoint + '/eabi/melon/sockets';
      url += "?id=" + this.querySid;
      console.log(url);
      axios.get(url).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
        this.socketInfo = response.data.data;
        if (this.server.code === 0) {
          this.$notify({
            message: '查询成功！' + this.server.msg,
            type: 'success',
          });
          for(let i = 0; i < this.connectionArray.length; i++) {
            if (this.connectionArray[i].name === this.resetFlagsName) {
              this.connectionArray[i].current_value = this.queryValue;
            }
          }
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
    copyInfo() {
      let oInput = document.createElement('input')
      oInput.value = this.socketInfo
      document.body.appendChild(oInput)
      oInput.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      document.body.removeChild(oInput)
      this.$message.success('复制成功')
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
      this.querySid = row.socket_id;
      this.querySocket();
      this.dialogVisible = true;
    }
  }
}

</script>

<template>
  <el-row>
    <el-col :span="24">
      <div slot="header" class="clearfix">
        <el-button type="success" @click="connectionsList(serverEndpoint)">查询</el-button>
        <p>返回值 ： {{ server.code }}</p>
        <p>返回信息： {{ server.msg }}</p>
        <p>配置列表： {{ total }}</p>
      </div>
      <el-table stripe="stripe" border="border"
                @cell-dblclick="copyText"
                :data="connectionArray.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
                style="width: 100%" v-loading="loading">
        <el-table-column
            prop="created_time"
            label="CreatedTime">
        </el-table-column>
        <el-table-column
            prop="remote_side"
            label="RemoteSide">
        </el-table-column>
        <el-table-column
            prop="ssl_state"
            label="SSL">
        </el-table-column>
        <el-table-column
            prop="protocol"
            label="Protocol">
        </el-table-column>
        <el-table-column
            prop="fd"
            label="FD">
        </el-table-column>
        <el-table-column
            prop="in_bytes_s"
            label="IBytes/s">
        </el-table-column>
        <el-table-column
            prop="in_num_messages_s"
            label="In/s">
        </el-table-column>
        <el-table-column
            prop="in_bytes_m"
            label="IBytes/m">
        </el-table-column>
        <el-table-column
            prop="in_num_messages_m"
            label="I/m">
        </el-table-column>
        <el-table-column
            prop="out_bytes_s"
            label="OBytes/s">
        </el-table-column>
        <el-table-column
            prop="out_num_messages_s"
            label="O/s">
        </el-table-column>
        <el-table-column
            prop="out_bytes_m"
            label="OBytes/m">
        </el-table-column>
        <el-table-column
            prop="out_num_messages_m"
            label="O/m">
        </el-table-column>
        <el-table-column
            prop="rtt"
            label="RTT">
        </el-table-column>
        <el-table-column
            prop="socket_id"
            label="Id">
        </el-table-column>
        <el-table-column
            label="操作">
          <template #default="{ row}">
            <el-button type="success"
                       size="mini"
                       @click="enableDialog(row)">详细
            </el-button>
            <el-dialog
                class="el-dialog-div"
                title="提示"
                :model-value="dialogVisible"
                width="50%"
                :before-close="handleClose">
              <el-input autosize type="textarea" v-model="socketInfo" placeholder="socket info" disabled></el-input>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                <el-button type="primary" @click="copyInfo">复 制</el-button>
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
.el-dialog-div{
  height: 60vh;//如果高度过高，可用max-height
  overflow: auto;
}

</style>
