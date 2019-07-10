<template>
    <me-scroll ref ="scroll">
      <div class="slider-container">
        <me-loading v-if="!sliderImgs.length"></me-loading>
        <div class="slider-wrapper" v-else>
          <Product-slider
            :data="sliderImgs"
            :direction="direction"
            :loop="loop"
            :interval="interval"
            :pagination="pagination"
          >
            <swiper-slide v-for="(item, index) in sliderImgs" :key="index">
              <img :src="item" alt="" class="slider-img">
            </swiper-slide>
          </Product-slider>
        </div>
      </div>
      <div class="pro-detail-container">
        <me-loading v-if="!sliderImgs.length"></me-loading>
        <product-detail :proDetails="proDetails" @loaded="update" v-else></product-detail>
      </div>
    </me-scroll>
</template>

<script>
  import MeScroll from 'base/scroll';
  import ProductSlider from 'base/slider';
  import {getProductDetails} from 'api/product';
  import {swiperSlide} from 'vue-awesome-swiper';
  import {sliderOptions} from './config';
  import MeLoading from 'base/loading';
  import ProductDetail from './detail';
  export default {
    name: 'ProductContent',
    components: {
      MeScroll,
      ProductSlider,
      swiperSlide,
      MeLoading,
      ProductDetail
    },
    data() {
      return {
        proId: '',
        proDetails: {},
        direction: sliderOptions.direction,
        loop: sliderOptions.loop,
        interval: sliderOptions.interval,
        pagination: sliderOptions.pagination,
        sliderImgs: []
      };
    },
    created() { // Vue实例生成之后执行的函数
      this.getId();
      this.getAllDatas(this.proId);
    },
    methods: {
      getId() {
        this.proId = this.$route.params.id;
      },
      getAllDatas(id) {
        this.getData(id).then((data) => {
          return new Promise(resolve => {
            if (data) {
              this.proDetails = data.item;
              this.sliderImgs = data.item.images;
              // console.log(this.proDetails.title);
              resolve();
            }
          });
        });
      },
      getData(id) {
        return getProductDetails(id);
      },
      update() {
        this.$refs.scroll && this.$refs.scroll.update();
      }
    }
  };
</script>

<style lang="scss" scoped>
    .slider-container{
      height: 350px;
      .slider-wrapper{
        height: 100%;
      }
      .slider-img{
        width: 100%;
        height: 100%;
      }
    }
</style>
