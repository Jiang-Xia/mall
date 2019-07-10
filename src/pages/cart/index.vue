<template>
    <div class="cart">
      <header class="g-header-container">
        <div class="cart-header">
          <div class="mycart" slot="center">我的购物车</div>
          <i class="cart-icon iconfont icon-msg" slot="right"></i>
        </div>
      </header>

      <div class="g-content-container">
        <me-loading v-if="!isLoading"></me-loading>
        <me-scroll ref="scroll">
          <div class="container-img">
            <img @load="updateScroll" src="./cart.png" alt="">
          </div>
        </me-scroll>
      </div>
    </div>
</template>

<script>
  import MeScroll from 'base/scroll';
  import MeLoading from 'base/loading';
  export default {
    name: 'index',
    components: {
      MeScroll,
      MeLoading
    },
    data() {
      return {
        isLoading: false
      };
    },
    methods: {
      updateScroll() {
        this.isLoading = true;
        this.$refs.scroll && this.$refs.scroll.update();
      }
    }
  };
</script>

<style  lang="scss">
  @import "~assets/scss/mixins";
  .cart{
    width: 100%;
    height: 100%;
  }
  /*.content-wrapper {*/
  /*  position: relative;*/
  /*  height: 100%;*/
  /*}*/
  .cart-header{
    @include flex-between();
    background-color: #fff;
    height: 50px;
    padding: 0 10px;
  }
  .mycart{
    text-align: center;
    flex: 1;
    font-size: $font-size-l+2;
  }
.container-img{
  width: 100%;
}
.container-img img{
  width: 100%;
}
  .g-backtop-container {
    bottom: 10px;
  }
</style>
