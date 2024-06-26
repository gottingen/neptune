<script>
import axios from "axios/dist/axios";

export default {
  data() {
    return {
      queryVersion: '',
      queryConfig: '',
      queryConfigContent: '',
      currentPage: 1,
      loading: false,
      pagesize: 5,
      total: 0,
      configArray: [],
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
    configQueryProxy(endpoint) {
      this.loading = true;
      if(this.queryVersion !== '' && this.queryConfig !== '') {
        this.configQuery(endpoint);
      } else if(this.queryVersion === '' && this.queryConfig !== '') {
        this.configVersionList(endpoint);
      } else {
        this.configList(endpoint);
      }
      this.loading = false;
    },
    configList(endpoint) {
      axios.post('http://' + endpoint + '/ea/config/list', {}).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
        if ('configs' in response.data) {
          this.configArray = response.data.configs;
          this.total = this.configArray.length;
        } else {
          this.configArray = [];
          this.total = 0;
        }
      })
    },

    configVersionList(endpoint) {
      axios.post('http://' + endpoint + '/ea/config/version', {
        name: this.queryConfig
      }).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
        if ('configs' in response.data) {
          this.configArray = response.data.configs;
          this.total = this.configArray.length;
        } else {
          this.configArray = [];
          this.total = 0;
        }
      })
    },
    configQuery(endpoint) {
      axios.post('http://' + endpoint + '/ea/config/query', {
        name: this.queryConfig,
        version: this.queryVersion
      }).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
        if ('configs' in response.data) {
          this.configArray = response.data.configs;
          this.total = this.configArray.length;
        } else {
          this.configArray = [];
          this.total = 0;
        }
      })
    },
    handleQuery(index, row) {
      this.queryConfigContent = row.content;
    },
    copyText(row, column, cell, event){
      let save = function (e){
        e.clipboardData.setData('text/plain',event.target.innerText);
        e.preventDefault();
      }
      document.addEventListener('copy',save);//添加一个copy事件
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
         <el-tag>配置名</el-tag> <el-input type="text" v-model.lazy.trim="queryConfig" placeholder="config name" clearable> </el-input>
          <el-tag>版本</el-tag> <el-input type="text" v-model.lazy.trim="queryVersion" placeholder="0.0.1" clearable> </el-input>
        <el-button type="success" @click="configQueryProxy(serverEndpoint)">查询</el-button>
        <p>返回值 ： {{ server.code }}</p>
        <p>返回信息： {{ server.msg }}</p>
        <p>配置列表： {{ total }}</p>
      </div>
      <el-table stripe="stripe" border="border"
                @cell-dblclick="copyText"
                :data="configArray.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
                style="width: 100%" v-loading="loading">
        <el-table-column
            prop="id"
            label="配置ID"
            width="90">
        </el-table-column>
        <el-table-column
            prop="name"
            label="配置名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="version"
            label="版本"
            width="90">
        </el-table-column>
        <el-table-column
            prop="type"
            label="类型"
            width="90">
        </el-table-column>
        <el-table-column
            label="操作"
            width="90">
            <template #default="{ row, $index }">
              <el-button type="success"
                  size="mini"
                  @click="handleQuery($index, row)">查看</el-button>
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
    <el-col :span="12">
      <el-input type="textarea" v-model.lazy.trim="queryConfigContent" placeholder="" clearable> </el-input>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">


</style>
