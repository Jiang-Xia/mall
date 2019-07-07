<template>
  <div class="home">
    <header class="g-header-container">
      <home-header :class="{'header-transition': isHeaderTransition}" ref="header"></home-header>
    </header>
    <me-scroll
      :data="recommends"
       pullDown
       pullUp
      @pull-down="pullToRefresh"
      @pull-up = "pullToLoadMore"
      @scroll = "scroll"
      @scroll-end = "scrollEnd"
      @pull-down-transition-end = "pullDownTransitionEnd"
      ref="scroll"
    >
      <home-slider ref="slider"></home-slider>
      <home-nav></home-nav>
      <homem-recommend @loaded="getRecommends" ref="recommend"></homem-recommend>
    </me-scroll>
    <div class="g-backtop-container">
      <me-backtop :visible="isBacktopVisible" @backtop="backToTop"></me-backtop>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import HomeHeader from './header';
  import HomeSlider from './slider';
  import MeScroll from 'base/scroll';
  import MeBacktop from 'base/backtop';
  import HomeNav from './nav';
  import HomemRecommend from './recommend';
  import {HEADER_TRANSITION_HEIGHT} from './config';
  export default {
    name: 'index',
    data() {
      return {
        recommends: [],
        // pullDown: true,
        // pullUp: true
        isBacktopVisible: false,
        isHeaderTransition: false
      };
    },
    components: {
      MeScroll,
      HomeHeader,
      HomeSlider,
      HomeNav,
      HomemRecommend,
      MeBacktop
    },
    // 测试Backtop按钮出现
    // created() {
    //   setTimeout(() => {
    //     this.isBacktopVisible = true;
    //   }, 1000);
    // },
    methods: {
      getRecommends(recommends) {
        this.recommends = recommends;
      },
      pullToRefresh(end) {
        // 自定义事件pull-down，触发调用此函数
        // 调用slider组件中的 update 方法
        this.$refs.slider.update().then(end);
        // console.log('我在下拉');
      },
      pullToLoadMore(end) {
        // setTimeout(() => {
        //   console.log('我在上拉');
        //   end();
        // }, 1000);
        // 出路没有更多数据的情况
        // 禁止加载更多数据
        // 替换上拉时的loading 改为没有更多数据
        // 下拉调用 recommend 的update
        this.$refs.recommend.update().then(end).catch(err => {
          if (err) {
            console.log(err);
          }
          end();
        });
      },
      scroll(translate) {
        this.changeHeaderStatus(translate);
      },
      scrollEnd(translate, scroll, pulling) {
        if (!pulling) { // 判断你是否在加载，不在就执行
          this.changeHeaderStatus(translate);
        }
        // console.log(translate);
        // 判断滚动条的往上拉一屏的时候 触发
        this.isBacktopVisible = translate < 0 && -translate > scroll.height;
      },
      pullDownTransitionEnd() {
        this.$refs.header.show();
      },
      backToTop() {
        // 回到顶部
        this.$refs.scroll && this.$refs.scroll.scrollToTop();
      },
      //  改变header状态
      changeHeaderStatus(translate) {
        if (translate > 0) {
          this.$refs.header.hide();
          return;
        }
        this.$refs.header.show();
        this.isHeaderTransition = -translate > HEADER_TRANSITION_HEIGHT;
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .home{
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: $bgc-theme;
  }
</style>
