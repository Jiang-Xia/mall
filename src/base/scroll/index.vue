<template>
    <swiper :options="swiperOption" ref="swiper">
      <div class="mine-scroll-pull-down" v-if="pullDown">
        <me-loading :text="pulldownText" inline ref="pullDownLoading"></me-loading>
      </div>
      <swiper-slide>
        <slot></slot>
      </swiper-slide>
      <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
    </swiper>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import MeLoading from 'base/loading';
  import {
    PULL_DOWN_HEIGHT,
    PULL_DOWN_TEXT_INIT,
    PULL_DOWN_TEXT_START,
    PULL_DOWN_TEXT_ING,
    PULL_DOWN_TEXT_END} from './config';
  // 下拉刷新 数据常量
  export default {
    name: 'MeScroll',
    components: {
      swiper,
      swiperSlide,
      MeLoading
    },
    props: {
      // 是否开启滚动条
      scrollbar: {
        type: Boolean,
        default: true
      },
      data: {
        type: [Array, Object]
      },
      // 是否开始下拉刷新，默认为false
      pullDown: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        pulldownText: 'PULL_DOWN_TEXT_INIT',
        swiperOption: {
          // 对slider组件进行配置
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true,
          setWrapperSize: true,
          scrollbar: {
            el: this.scrollbar ? '.swiper-scrollbar' : null,
            hide: true
          },
          on: {
            sliderMove: this.scroll
          }
        }
      };
    },
    watch: {
      data() {
        this.update();
      }
    },
    methods: {
      // 更新滚动条高度
      update() {
        // console.log(this.$refs.swiper);
        this.$refs.swiper && this.$refs.swiper.update();
      },

      scroll() {
        const swiper = this.$refs.swiper.swiper;
        // 找到swiper组件下的swiper实例对象
        // console.log(swiper.translate);
        if (swiper.translate > 0) { // 下拉开始
          if (!this.pullDown) {
            return; // 用户是否设置了pullDown功能
          }
          if (swiper.translate > PULL_DOWN_HEIGHT) {
            //  que:改变pulldownText的值会重新渲染
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START);
            // 调用子组件 loading的setText()方法
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .swiper-container{
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .swiper-slide{
    height: auto;
  }
  .mine-scroll-pull-down{
    position: absolute;
    left: 0;
    bottom: 100%;
    width: 100%;
    height: 80px;
  }
</style>
