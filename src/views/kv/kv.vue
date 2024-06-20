
<script setup>
import { ref, reactive, onMounted } from "vue";
import PageHeader from "@/components/PageHeader/index.vue";
import {defineComponent} from "vue";
import kv_get from "@/components/kv/get.vue";
import kv_set from "@/components/kv/set.vue";

const loading = ref(true);
</script>


<template>
  <PageHeader :loading="loading" />
  <div class="kvs">
    <el-row class="center_box">
      <el-col :span="12">
        <el-card class="kv-set">
          <div slot="header" class="clearfix">
            <span>查询缓存</span>
          </div>
          <kv_get/>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="kv-set">
          <div slot="header" class="clearfix">
            <span>设置缓存</span>
          </div>
          <kv_set/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
