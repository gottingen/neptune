<script setup>
</script>

<template>
  <div class="home_center_box">
    <el-row>
      <el-col :xs="24" :sm="18">
        <el-card>
          <div slot="header" class="clearfix">
            <span>EA是什么</span>
          </div>

          `kumo search`
          是一个端到端搜索引擎框架，支持全文检索、倒排索引、正排索引、排序、缓存、索引分层、干预系统、特征收集、离线计算、存储系统等功能。`kumo
          search`
          运行在 `EA`(Elastic automic infrastructure architecture)
          平台上，支持在多机房、多集群上实现`工程自动化`、`服务治理`、`实时数据`、`服务降级与容灾`等功能。

          随着互联网的发展，全网搜索已经不再是获取信息的唯一途径。很多垂直的信息服务，如电商、社交、新闻等，都有自己的搜索引擎。
          这些搜索引擎的特点是：数据量中等，业务复杂，用户体验要求高。这些搜索引擎的开发，需要大量的工程和算法支持。`kumo
          search`旨在
          提供一套开箱即用的搜索引擎框架，帮助用户快速搭建自己的搜索引擎。在这个框架上，用户可以通过项目内的AOT编译器，用
          `python`编写业务逻辑，框架会自动生成`c++`代码，并生成二进制动态库，动态更新到搜索引擎中。从而实现搜索引擎的快速迭代。
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="18">
        <el-card>
          <div slot="header" class="clearfix">
            <span>kumo search是什么</span>
          </div>

          `kumo search`
          是一个端到端搜索引擎框架，支持全文检索、倒排索引、正排索引、排序、缓存、索引分层、干预系统、特征收集、离线计算、存储系统等功能。`kumo
          search`
          运行在 `EA`(Elastic automic infrastructure architecture)
          平台上，支持在多机房、多集群上实现`工程自动化`、`服务治理`、`实时数据`、`服务降级与容灾`等功能。

          随着互联网的发展，全网搜索已经不再是获取信息的唯一途径。很多垂直的信息服务，如电商、社交、新闻等，都有自己的搜索引擎。
          这些搜索引擎的特点是：数据量中等，业务复杂，用户体验要求高。这些搜索引擎的开发，需要大量的工程和算法支持。`kumo
          search`旨在
          提供一套开箱即用的搜索引擎框架，帮助用户快速搭建自己的搜索引擎。在这个框架上，用户可以通过项目内的AOT编译器，用
          `python`编写业务逻辑，框架会自动生成`c++`代码，并生成二进制动态库，动态更新到搜索引擎中。从而实现搜索引擎的快速迭代。
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.mobile-top-card {
  height: 31rem;
  margin: 4px;

  :deep(.info-avatar) {
    padding: 0 2rem;
  }

  :deep(.personal-say) {
    padding-left: 1rem;
  }

  :deep(.info-background) {
    height: 12rem;
    width: 100%;
  }

  :deep(.common-menu) {
    padding: 1rem 5.5rem;
  }

  :deep(.git-ee) {
    padding: 0 4rem;
  }

  :deep(.personal-link) {
    padding: 1rem 6rem;
  }
}

.mobile-bottom-card {
  margin: 4px;
  padding: 1rem;

  .icon-localoffer {
    font-weight: 900;
  }

  span {
    margin-left: 0.3rem;
  }

  .site-info {
    padding: 0.3rem 1rem;
    line-height: 2;
    font-size: 1rem;

    .value {
      font-weight: 600;
    }
  }
}

.group {
  margin-left: 0.3rem;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .img {
    width: 80px;
    height: 80px;
  }
}
</style>
