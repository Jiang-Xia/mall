<template>
    <div class="product">
      <header class="g-header-container">
        <product-header class="header"></product-header>
      </header>
      <div class="g-content-container">
        <product-content></product-content>
      </div>
    </div>
</template>

<script>
  import ProductHeader from './header';
  import ProductContent from './content';
  export default {
    name: 'MeProduct',
    components: {
      ProductHeader,
      ProductContent
    }
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
