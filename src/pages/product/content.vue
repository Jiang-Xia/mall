<template>
    <me-scroll>
      <product-slider></product-slider>
    </me-scroll>
</template>

<script>
  import MeScroll from 'base/scroll';
  import ProductSlider from 'base/slider';
  export default {
    name: 'ProductContent',
    components: {
      MeScroll,
      ProductSlider
    }
  };
</script>

<style lang="scss" scoped>

</style>
