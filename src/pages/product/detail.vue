<template>
    <div class="product-detail">
      <div class="price">
        <span class="price-1">￥53.9<span class="price-num"></span></span>
        <span class="sells">1477件已售</span>
      </div>
      <div class="title-box">
        <p class="title-box-heading">{{proDetails.title}}</p>
        <p class="title-box-detail">
          <span class="title-detail-item post">快递包邮</span>
          <span class="title-detail-item month-sells">7415月销量件</span>
          <span class="title-detail-item seller-adress">浙江嘉兴</span>
        </p>
      </div>
      <div class="evaluate">
        <div class="evaluate-heading">商品评价(3010)</div>
        <div class="evaluate-keyword">
          <div class="evaluate-keyword-item">东西很好,超级棒(201)</div>
          <div class="evaluate-keyword-item">值得购买(302)</div>
          <div class="evaluate-keyword-item">价格实惠(123)</div>
          <div class="evaluate-keyword-item">服务满分(45)</div>
          <div class="evaluate-keyword-item">售后贴心(326)</div>
          <div class="evaluate-keyword-item">售后贴心(326)</div>
        </div>
      </div>
      <div class="detail-img">
        <img @load="updateScroll" src="./detail1.jpg" alt="detail1">
      </div>
    </div>
</template>

<script>
  export default {
    name: 'ProductDetail',
    props: {
      proDetails: {
        type: [Array, Object]
      }
    },
    methods: {
      updateScroll() {
        this.$emit('loaded');
      }
    }
  };
</script>

<style lang="scss" scoped >
  @import "~assets/scss/mixins";

  .product-detail{
    background-color: $bgc-theme;
    .price{
      height: 40px;
      @include flex-between();
      background-color: #ef3469;
      color: $icon-color-default;
      padding: 7px 10px;
    }
    .price-num{
      font-size: 16px;
    }
    .sells{
      background-color: rgba(9,9,9,0.2);
      border-radius: 5px;
      padding: 7px 10px;
    }
    .title-box{
      font-size: 12px;
    }
    .title-box-heading{
      @include ellipsis();
      color: #333;
    }
    .title-box-detail{
      @include flex-between();
      color: #999;
    }
    .title-detail-item{
      padding: 15px 0 0;
    }
    .title-box,.evaluate,.seller{
      background-color: #fff;
      padding: 7px 10px;
    }

    .evaluate,.detail-img{
      margin-top: 10px;
    }
    .evaluate-heading{
      color: #666;
      line-height: 22px;
    }
    .evaluate-keyword{
      display: flex;
      flex-wrap: wrap;
    }
    .evaluate-keyword-item{
      padding: 8px;
      background-color: #ffEEEE;
      border-radius: 10px;
      margin-right: 10px;
      margin-bottom: 8px;
    }
    .detail-img img{
      width: 100%;
      height: 250px;
    }
}
</style>
