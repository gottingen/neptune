<script>
import axios from "axios/dist/axios";

export default {
  data() {
    return {
      filterZone: '',
      filterApp: '',
      currentPage: 1,
      loading: false,
      pagesize: 5,
      total: 0,
      servletArray: [],
      filteredArray: [],
      filteredIndex: [],
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
    servletList(endpoint) {
      axios.post('http://' + endpoint + '/ea/discovery/servlet/list', {}).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
        if ('servlets' in response.data) {
          this.servletArray = response.data.servlets;
          this.total = this.servletArray.length;
        } else {
          this.servletArray = [];
          this.total = 0;
        }
        this.handleFilterArray();
      })
    },

    servletOffline(endpoint, index) {
      axios.post('http://' + endpoint + '/ea/discovery/servlet/offline', {
        app_name: this.filteredArray[index].app_name,
        zone_name: this.filteredArray[index].zone_name,
        servlet_name: this.filteredArray[index].servlet_name,
      }).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
        this.filteredArray[index].manager_status = 2;
        this.servletArray[this.filteredIndex[index]].manager_status = 1;
      })
    },
    servletOnline(endpoint, index) {
      axios.post('http://' + endpoint + '/ea/discovery/servlet/online', {
        app_name: this.filteredArray[index].app_name,
        zone_name: this.filteredArray[index].zone_name,
        servlet_name: this.filteredArray[index].servlet_name,
      }).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
        this.filteredArray[index].manager_status = 2;
        this.servletArray[this.filteredIndex[index]].manager_status = 0;
      })
    },

    servletTombstone(endpoint, index) {
      axios.post('http://' + endpoint + '/ea/discovery/servlet/tombstone', {
        app_name: this.filteredArray[index].app_name,
        zone_name: this.filteredArray[index].zone_name,
        servlet_name: this.filteredArray[index].servlet_name,
      }).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
        this.filteredArray[index].manager_status = 2;
        this.servletArray[this.filteredIndex[index]].manager_status = 2;
      })
    },

    handleFilterArray() {
      this.filteredArray = [];
      if (this.filterApp === '' && this.filterZone === '') {
        this.filteredArray = this.servletArray;
      } else {
        for (let i = 0; i < this.servletArray.length; i++) {
          if(this.filterApp !== '' && this.servletArray[i].app_name !== this.filterApp) {
            continue;
          }
          if(this.filterZone !== '' && this.servletArray[i].zone_name !== this.filterZone) {
            continue;
          }
          this.filteredArray.push(this.servletArray[i]);
          this.filteredIndex.push(i);
        }
      }
      this.total = this.filteredArray.length;
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
  }
}
}

</script>

<template>
  <el-row>
    <el-col :span="24">
      <div slot="header" class="clearfix">
        <el-tag>应用</el-tag>
        <el-input type="text" v-model.lazy.trim="filterApp" placeholder="image" clearable></el-input>
        <el-tag>集群</el-tag>
        <el-input type="text" v-model.lazy.trim="filterZone" placeholder="search-bj04" clearable></el-input>
        <el-button type="success" @click="handleFilterArray">过滤</el-button>
        <p>返回值 ： {{ server.code }}</p>
        <p>返回信息： {{ server.msg }}</p>
        <p>配置列表： {{ total }}</p>
      </div>
      <el-button type="success" @click="servletList(serverEndpoint)">查询</el-button>
      <el-table stripe="stripe" border="border"
                @cell-dblclick="copyText"
                :data="filteredArray.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
                style="width: 100%" v-loading="loading">
        <el-table-column
            prop="servlet_id"
            label="ID"
            width="90">
        </el-table-column>
        <el-table-column
            prop="app_name"
            label="app"
            width="90">
        </el-table-column>
        <el-table-column
            prop="zone_name"
            label="zone"
            width="90">
        </el-table-column>
        <el-table-column
            prop="servlet_name"
            label="名称"
            width="90">
        </el-table-column>
        <el-table-column
            prop="env"
            label="env"
            width="90">
        </el-table-column>
        <el-table-column
            prop="color"
            label="color"
            width="90">
        </el-table-column>
        <el-table-column
            prop="status"
            label="status"
            width="90">
        </el-table-column>
        <el-table-column
            prop="manager_status"
            label="mstatus"
            width="90">
        </el-table-column>
        <el-table-column
            prop="ctime"
            label="ctime"
            width="120">
        </el-table-column>
        <el-table-column
            prop="mtime"
            label="mtime"
            width="120">
        </el-table-column>
        <el-table-column
            prop="address"
            label="address"
            width="180">
        </el-table-column>
        <el-table-column
            label="操作"
            width="180">
          <template #default="{ row, $index }">
            <el-button v-if="row.manager_status === 0" type="success"
                       size="mini"
                       @click="servletOffline(serverEndpoint, $index)">offline
            </el-button>
            <el-button v-else-if="row.manager_status === 1" type="success"
                       size="mini"
                       @click="servletOnline(serverEndpoint, $index)">online
            </el-button>
            <el-button v-else type="success"
                       size="mini" disabled>online
            </el-button>
            <el-button type="success"
                       @click="servletTombstone(serverEndpoint, $index)"
                       size="mini" :disabled="row.manager_status === 2">移除
            </el-button>
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
