<template>
    <div class="product">
      product
    </div>
</template>

<script>
  export default {
    name: 'index'
  };
</script>

<style scoped lang="scss">
  @import "~assets/scss/mixins";
  .product{
    overflow: hidden;
    position: absolute;
    left: 0;
    top:0;
    z-index: $product-z-index;
    height: 100%;
    width: 100%;
    background-color: $bgc-theme;
  }
</style>
