
<template>
  <div class="demo">
    <div class="title">
      配置内容
    </div>
    <div> {{ app && app.data }}</div>
  </div>
</template>

<style scoped lang="scss">
.demo {
  display: flex;
  height: 100%;
  width: 100%;
  color: #333;
  text-shadow: none;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 16px;
    text-align: left;
    margin: 10%;
  }
}
</style>
<script>
export default {
  data() {
    return {};
  },
  props: {
    app: Object,
  },
  created() {},
};
</script>