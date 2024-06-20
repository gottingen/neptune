
<script setup>
import { ref, reactive, onMounted } from "vue";
import PageHeader from "@/components/PageHeader/index.vue";
import {defineComponent} from "vue";

const loading = ref(true);
</script>


<template>
  <PageHeader :loading="loading" />
  这是配置服务页面
</template>
