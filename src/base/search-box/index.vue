<template>
  <div class="mine-search-box-wrapper">
    <i class="iconfont icon-search"></i>
    <div class="mine-search-box" v-if="fake">{{placeholder}}</div>
    <input
      class="mine-search-box"
      type="text"
      title="搜索框"
      :placeholder="placeholder"
      ref="input"
      v-model="query"
      v-if="!fake"
    >
    <i
      class="iconfont icon-close"
      v-show="query"
      @click="reset"
    ></i>
  </div>
</template>

<script>
  import {debounce} from 'assets/js/util';
  export default {
    name: 'MeSearchBox',
    props: {
      placeholder: {
        type: String,
        default: '暑假大放送，好货五折起'
      },
      fake: { // 为false显示假搜索框，为true显示真实搜索框
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        query: ''// 数据双向绑定
      };
    },
    watch: {
      query: debounce(function () {
        this.$emit('query', this.query);
      })
    },
    methods: {
      focus() {
        this.$refs.input && this.$refs.input.focus();
      },
      clear() {
        this.query = '';
      },
      reset() {
        // console.log(this.query);
        this.clear();
        this.focus();
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  $search-box-height: 30px;

  .mine-search-box-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: $search-box-height;
    padding: 0 7px;
    background-color: #fff;
    border-radius: $search-box-height / 2;
  }

  .iconfont {
    color: $icon-color;
    font-size: $icon-font-size-sm;
    font-weight: bold;
  }

  .mine-search-box {
    flex: 1;
    background: none;
    border: none;
    margin: 0 6px;
    color: #666;
    line-height: 1.5;
  }
</style>
