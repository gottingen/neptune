<script>

import axios from "axios/dist/axios";
export default {
  data() {
    return {
      confName: 'conf_name',
      confVersion: '0.1.2',
      confContent: 'content',
      confType: 'json',
      typeList:[{value: 'json', label: 'json'},
        {value: 'gflags', label: 'gflags'},
        {value: 'text', label: 'text'},
        {value: 'toml', label: 'toml'},
        {value: 'xml', label: 'xml'},
        {value: 'yaml', label: 'yaml'},
        {value: 'ini', label: 'ini'}],
      server: {
        code: 0,
        msg: 'null'
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
    configCreate(endpoint) {
      axios.post('http://' + endpoint + '/ea/config/create', {
        name: this.confName,
        version: this.confVersion,
        content: this.confContent,
        type: this.confType
      }).then(response => {
        this.server.code = response.data.code;
        this.server.msg = response.data.message;
      })
    },
    querySearch(queryString, cb) {
      var restaurants = this.typeList;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
  }
}

</script>

<template>
  <div>
    <p>
    <el-tag size="big">配置名</el-tag>
    <el-input type="text" v-model.lazy.trim="confName" size="small" style="width: 40%" clearable></el-input>
    </p>
    <p>
    <el-tag size="big">版本</el-tag>
    <el-input type="text" v-model.lazy.trim="confVersion" size="small" style="width: 40%" clearable> </el-input>
    </p>
    <p>
    <el-tag size="">类型</el-tag>
    <el-autocomplete
        class="inline-input"
              v-model.lazy.trim="confType"
              size="small"
              :fetch-suggestions="querySearch"
              placeholder="json"
              style="width: 20%" clearable>
    </el-autocomplete>
    </p>
    <el-divider></el-divider>
    <p>
    <el-tag>配置内容</el-tag>
    <el-button type="success" size="small" @click="configCreate(serverEndpoint)">创建</el-button>
    </p>
    <p>
    返回值   ： {{ server.code }}
    返回信息： {{ server.msg }}
    </p>
    <el-input type="textarea" v-model.lazy.trim="confContent" style="width: 80%;overflow:scroll"> </el-input>
  </div>
</template>

<style scoped lang="scss">


</style>