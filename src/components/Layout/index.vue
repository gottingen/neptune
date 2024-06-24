<script setup>
import BlogHeader from "./header/blog-header.vue";
import BlogMain from "./main/blog-main.vue";
import BlogFooter from "./footer/blog-footer.vue";
import BlogSide from "./sider/sider.vue";
import PageHeader from "@/components/PageHeader/index.vue";
</script>
<template>
  <div class="layout">
    <el-container>
      <el-header>
        <BlogHeader></BlogHeader>
      </el-header>
      <el-header>
        <PageHeader loading="true"></PageHeader>
      </el-header>
      <el-container>
        <el-aside class="side" width="collapse">
          <BlogSide></BlogSide>
        </el-aside>
        <el-main>
          <BlogMain></BlogMain>
        </el-main>
      </el-container>
    </el-container>
    <BlogFooter></BlogFooter>
  </div>
</template>

<style lang="scss" scoped></style>
