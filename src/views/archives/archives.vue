
<script setup>
import { ref, reactive, onMounted } from "vue";
import PageHeader from "@/components/PageHeader/index.vue";
import {defineComponent} from "vue";
import MarkdownIt from 'markdown-it';
const markdown = new MarkdownIt();

const loading = ref(true);
</script>


<template>
  <PageHeader :loading="loading" />
  <div v-html="markdown.render('\n'+
'# 2024年3月\n'+
'\n'+
'升级向量搜索集群。支持新内核。\n'+
'\n'+
'# 2023年7月\n'+
'\n'+
'以开源向量搜索算法为基础，构建向量引擎新内核，为工程自动化提供支持。\n'+
'\n'+
'# 2023年5月\n'+
'\n'+
'升级hercules，支持jupyter notebook，支持python的aot编译，支持python的jit编译。\n'+
'\n'+
'# 2023年2月\n'+
'\n'+
'升级melon，turbo等基础设施，以c++17为最低标准。\n'+
'\n'+
'# 2022年10月\n'+
'初代hercules，python aot编译器，支持将python代码编译为c++代码，以及c++代码的编译。\n'+
'\n'+
'# 2021年8月\n'+
'\n'+
'初代flare，机器学习平台张量计算库诞生。\n'+
'\n'+
'# 2021年7月\n'+
'升级melon，turbo等基础设施，以c++14为最低标准，支持c++17，c++20等标准。\n'+
'\n'+
'# 2021年3月\n'+
'投身建设融合向量引擎，传统搜索引擎与一体，构建综合搜索引擎。\n'+
'\n'+
'# 2020.12\n'+
'初代基于raft的分布式向量引擎，支持向量的存储，检索，以及向量的增量更新。\n'+
'\n'+
'# 2020年1月\n'+
'\n'+
'基于faiss的最初版向量引擎，支持向量的存储，检索，以及向量的增量更新。\n'+
'\n'+
'# 2019.12\n'+
'\n'+
'非常重要的时间节点，有了初步搜索工程自动化创意，构建最初版本的工程自动化思路。\n'+
'确立深做基础设施，螺旋升级的基本战略。\n'+
'\n'+
'# 2019.9\n'+
'\n'+
'carbin诞生，结合国内网络慢等问题，构建基于cmake的工程的构建，依赖管理。\n'+
'\n'+
'# 2019.1\n'+
'\n'+
'创建turbo， 升级gcc支持到c++11，融合了wsl和lestore的优点以及absl等优秀开源库。作为新一代inf的基础库。\n'+
'创建melon，基于turbo,在brpc的基础上，作为新一代inf的网络库。\n'+
'\n'+
'# 2016年\n'+
'\n'+
'lestore诞生，一个分布式存储系统，应用于cdn系列服务，存储管理，p2p下载等。\n'+
'\n'+
'# 2015年\n'+
'\n'+
'wsl诞生，在EASTL基础之上，优化了内存管理，增加了多线程支持，增加了c++03的gcc（4.4.5）上对c++11的支持。\n'+
'\n'+
'# 2014\n'+
'\n'+
'walle (瓦力)，一个多线程的网络服务框架。应用于cdn系列服务，存储管理，p2p下载等。')"></div>
</template>
