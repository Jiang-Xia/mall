<template>
    <div class="personal">
      <header class="g-header-container">
        <div class="personal-header">
          <div class="myxia" slot="center">我的夏淘</div>
          <i class="personal-icon iconfont icon-setting" slot="left"></i>
          <i class="personal-icon iconfont icon-msg" slot="right"></i>
        </div>
      </header>

      <div class="g-content-container">
        <me-loading v-if="!isLoading"></me-loading>
        <my-scroll ref="scroll" >
              <header class="container">
                <div class="user-pic">
                  <div class="user-pic-1 iconfont icon-personal"></div>
                </div>
                <div class="login-box">
                  <span class="login">注册</span>
                  <span class="login-sepa">|</span>
                  <span class="resgiter">注册</span>
                </div>
              </header>
              <div class="container-img" >
                <img @load="updateScroll" src="./personal.png" alt="personal">
              </div>
          </my-scroll>
      </div>
    </div>
</template>

<script>
  import MeLoading from 'base/loading';
  import MyScroll from 'base/scroll';
  export default {
    name: 'Personal',
    components: {
      MyScroll,
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

<style scoped lang="scss">
  @import "~assets/scss/mixins";
  .personal{
    width: 100%;
    height: 100%;
  }
  .content-wrapper {
    position: relative;
    height: 100%;
  }
  .personal-header{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: $navbar-height;
    color: $icon-color-default;
  }
  .myxia{
    padding-left: 40px;
    text-align: center;
    /*flex: 1;*/
    width: 100%;
  }
  .personal-icon{
    padding-right:5px;
  }
  .personal-header,.user-pic,.login-box{
    background-color: #de1818;
    padding: 15px 0;
  }
  .user-pic{
    @include flex-center();
  }
  .user-pic-1{
    height: 70px;
    width: 70px;
    border-radius: 50%;
    background-color: #fff;
    text-align: center;
    line-height: 70px;
    font-size: $font-size-l+18;
    color: #de6065 ;
  }
  .login-box{
    text-align: center;
    font-size: $font-size-l+8;
    color: $icon-color-default;
  }
  .login-sepa{
    padding: 0 25px;
  }
  .container-img{
    width: 100%;
  }
  .container-img img{
    width: 100%;
  }
</style>
