<script>


export default {
}

</script>

<template>
  <div class="endpoint-header">
      <p>当前服务器地址</p>
      <el-divider class="splitter"></el-divider>
      <p class="address">{{ $store.state.backendAddr }}</p>
  </div>

</template>

<style scoped lang="scss">

#no-wrap {
  white-space: nowrap;
}
.endpoint-header {
  font-size: 18px;
  color: black;
  font-family: "AR PL UKai CN";
  font-weight: 700;
  letter-spacing: 4px;
}
.splitter {
  margin: 2px;
  background: black;
}
</style>