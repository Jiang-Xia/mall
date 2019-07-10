<template>
 <me-navbar class="header">
   <i class="iconfont icon-back" slot="left"
      @click="goToHome"
   ></i>
   <span class="title" slot="center">商品详情</span>
   <i class="iconfont icon-cart" slot="right"
   @click="goToCart"
   ></i>
 </me-navbar>
</template>

<script>
  import MeNavbar from 'base/navbar';
  export default {
    name: 'Productheader',
    components: {
      MeNavbar
    },
    methods: {
      goToHome() {
        this.$router.push('/home');
      },
      goToCart() {
        this.$router.push('/cart');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .header{
    background-color: $header-bgc-translucent;
    .title{
      @include flex-center();
      color: $icon-color-default;
      font-size: $font-size-l;
    ;
    }
    .iconfont {
      color:$icon-color-default;
      font-size: $icon-font-size;
    }
  }
</style>
