<template>
    <div class="product">
      <product-header></product-header>
      <product-content @click.native="getData"></product-content>
    </div>
</template>

<script>
  import ProductHeader from './header';
  import ProductContent from './content';
  import {getProductDetails} from 'api/product';
  export default {
    name: 'MeProduct',
    data() {
      return {
        proId: '',
        proDetails: []
      };
    },
    components: {
      ProductHeader,
      ProductContent
    },
    mounted() {
      this.getId();
    },
    methods: {
      getId() {
        this.proId = this.$route.params.id;
      },
      getData() {
        getProductDetails(this.proId).then((data) => {
          this.proDetails = data;
        });
        console.log(this.proDetails);
      }
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
