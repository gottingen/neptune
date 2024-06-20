<template>
  <!-- 最外层 div 是占位置的 -->
  <div class="footer_box flex flex-col items-center justify-center">
    <!-- eslint-disable-next-line -->
    <div class="footer-color">&copy EA INS 2024</div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.footer-color {
  color: var(--font-color);
  text-align: center;
}

.change-color {
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    color: var(--global-black);
  }
}
</style>
