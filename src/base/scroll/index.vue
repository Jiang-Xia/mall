<template>
    <swiper :options="swiperOption" ref="swiper">
      <div class="mine-scroll-pull-down" v-if="pullDown">
        <me-loading :text="pullDownText" inline ref="pullDownLoading"></me-loading>
      </div>
      <swiper-slide>
        <slot></slot>
        <!--插槽-->
      </swiper-slide>
        <!--上拉-->
      <div class="mine-scroll-pull-up" v-if="pullUp">
        <me-loading :text="pullUpText" inline ref="pullUpLoading"/>
      </div>
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
    PULL_DOWN_TEXT_END,
    PULL_UP_HEIGHT,
    PULL_UP_TEXT_INIT,
    PULL_UP_TEXT_START,
    PULL_UP_TEXT_ING,
    PULL_UP_TEXT_END
  } from './config';
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
      },
      pullUp: {
        type: Boolean,
        default: false
      }
    },

    watch: {
      data() {
        this.update();
      }
    },
    created() {
      this.init();
    },
    methods: {
      // 更新滚动条高度
      update() {
        // console.log(this.$refs.swiper);
        this.$nextTick(() => { // dom渲染完毕之后 在更新滚动条
          this.$refs.swiper && this.$refs.swiper.swiper.update();
        });
      },
      scrollToTop(speed, runCallbacks) { // 滚动条
        this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0, speed, runCallbacks);
      },
      init() { // 初始化数据
        this.pulling = false; // 是否正在下拉
        this.pullDownText = PULL_DOWN_TEXT_INIT;
        this.pullUpText = PULL_UP_TEXT_INIT;
        this.swiperOption = {
          // 对slider组件，传入你想要的配置
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true,
          setWrapperSize: true,
          scrollbar: {
            el: this.scrollbar ? '.swiper-scrollbar' : null,
            hide: true
          },
          on: {
            sliderMove: this.scroll, // 滑动事件
            touchEnd: this.touchEnd, // 触摸结束
            transitionEnd: this.scrollEnd // 向上滑动时监听scrollEnd
          }
        };
      },
      scroll() {
        const swiper = this.$refs.swiper.swiper;
        // 找到 swiper 组件下的swiper实例对象
        // 触发事件传递数据
        this.$emit('scroll', swiper.translate, swiper, this.pulling);
        if (this.pulling) {
          return;
        }

        // console.log(swiper.translate);
        if (swiper.translate > 0) { // 下拉开始
          if (!this.pullDown) {
            return; // 用户是否设置了pullDown功能
          }

          if (swiper.translate > PULL_DOWN_HEIGHT) {
            //  que:改变pulldownText的值会重新渲染
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START);
            // 调用子组件 loading的setText()方法,设置下拉时的文字
          } else {
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT);
          }
        } else if (swiper.isEnd) { // 上拉
          if (!this.pullUp) {
            return;
          }

          const isPullUp = Math.abs(swiper.translate) + swiper.height -
            PULL_UP_HEIGHT > parseInt(swiper.$wrapperEl.css('height'));

          if (isPullUp) {
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START);
          } else {
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT);
          }
        }
      },
      // 滚动结束时触发
      scrollEnd() {
        const swiper = this.$refs.swiper.swiper;

        this.$emit('scroll-end', swiper.translate, swiper, this.pulling);
      },
      // 触摸结束之后做的事情
      touchEnd() {
        if (this.pulling) {
          return;
        }
        const swiper = this.$refs.swiper.swiper;
        if (swiper.translate > PULL_DOWN_HEIGHT) { // 下拉
          if (!this.pullDown) {
            return; // 用户是否设置了pullDown功能
          }
          this.pulling = true;
          swiper.allowTouchMove = false;//  禁止触摸
          swiper.setTransition(swiper.params.speed);
          swiper.setTranslate(PULL_DOWN_HEIGHT);
          swiper.params.virtualTranslate = true;// 定住不给回弹
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING);
          this.$emit('pull-down', this.pullDownEnd);
        } else if (swiper.isEnd) { // 底部
          const totalHeight = parseInt(swiper.$wrapperEl.css('height'));
          const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight;

          if (isPullUp) { // 上拉
            if (!this.pullUp) {
              return;
            }
            this.pulling = true;
            swiper.allowTouchMove = false; // 禁止触摸
            swiper.setTransition(swiper.params.speed);
            swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height));
            swiper.params.virtualTranslate = true; // 定住不给回弹
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING);
            this.$emit('pull-up', this.pullUpEnd);
          }
        }
      },
      // 下拉结束之后做的事情
      pullDownEnd() {
        const swiper = this.$refs.swiper.swiper;

        this.pulling = false;
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END);
        swiper.params.virtualTranslate = false;// 允许回弹
        swiper.allowTouchMove = true; // 允许触摸（bug下拉结束之后没有设置回来为true造成，无法触摸）
        swiper.setTransition(swiper.params.speed);
        swiper.setTranslate(0);
        setTimeout(() => {
          this.$emit('pull-down-transition-end');
        }, swiper.params.speed);
      },
      // 上拉结束后做的事情
      pullUpEnd() {
        const swiper = this.$refs.swiper.swiper;
        this.pulling = false;
        this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END);
        swiper.params.virtualTranslate = false;
        swiper.allowTouchMove = true;
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
  .mine-scroll-pull-up,
  .mine-scroll-pull-down {
    position: absolute;
    left: 0;
    width: 100%;
  }
  .mine-scroll-pull-down {
    bottom: 100%;
    height: 80px;
  }
  .mine-scroll-pull-up {
    top: 100%;
    height: 30px;
  }
</style>
