<script>
import axios from "axios/dist/axios";

export default {
  data() {
    return {
      queryApp: '',
      queryConfigContent: '',
      currentPage: 1,
      loading: false,
      pagesize: 5,
      total: 0,
      configArray: [],
      appList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
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
    zoneList(endpoint) {
     let param = {};
      if(this.queryApp !== '') {
        param = {app_name: this.queryApp};
      }
      axios.post('http://' + endpoint + '/ea/discovery/zone/list', param).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
        if ('zones' in response.data) {
          let tmpTree = new Map();
          for(let i = 0; i < response.data.zones.length; i++) {
            let zone = response.data.zones[i];
            if (tmpTree.has(zone.app_name)) {
              tmpTree.get(zone.app_name).children.push({
                label: zone.zone_name
              });
            } else {
              tmpTree.set(zone.app_name, {
                children: [{label: zone.zone_name, level: 1}]
              });
            }
          }
          this.appList = [];
          tmpTree.forEach((value, key) => {
            this.appList.push({
              label: key,
              level: 0,
              children: value.children
            });
          });

        } else {
          this.appList = [];
          this.total = 0;
        }
      })
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
    handleNodeClick(data, node) {
      let msg = data.label;
      if(data.level === 1) {
        msg = node.parent.data.label + "." + data.label;
      }
      this.$message(msg);
    }
  }
}

</script>

<template>
  <el-row>
    <el-col :span="24">
      <div slot="header" class="clearfix">
        <el-tag>应用名称</el-tag>
        <el-input type="text" v-model.lazy.trim="queryApp" placeholder="app name" clearable></el-input>
        <el-button type="success" @click="zoneList(serverEndpoint)">查询</el-button>
        <p>返回值 ： {{ server.code }}</p>
        <p>返回信息： {{ server.msg }}</p>
        <p>配置列表： {{ total }}</p>
      </div>
      <el-tree :data="appList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">


</style>
