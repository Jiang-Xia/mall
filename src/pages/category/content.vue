<template>
  <div class="content-wrapper">
    <div class="loading-container" v-if="isLoading">
<!--      <me-loading/>-->
      <div class="loading-wrapper">
      <me-loading/>
    </div>
    </div>

    <me-scroll
      @scroll-end="backTopShow"
      ref="scroll">
      <!-- banner-->
<!--      {{curId}}-->
      <div class="content" v-if="content.banner">
        <div class="pic">
          <a :href="content.banner.linkUrl" class="pic-link">
            <img @load="updateScroll" :src="content.banner.picUrl" alt="" class="pic-img">
          </a>
        </div>

        <div class="section"
             v-for="(section, index) in content.data" :key="index"

        >
          <h4 class="section-title">{{section.name}}</h4>
          <ul class="section-list">
            <li
              class="section-item"
              v-for="(item, i) in section.itemList" :key="i"
            >
              <a :href="item.linkUrl" class="section-link">
                <p class="section-pic" v-if="item.picUrl">
                  <img v-lazy="item.picUrl" alt="" class="section-img" />
                </p>
                <p class="section-name">{{item.name}}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </me-scroll>
    <div class="g-backtop-container">
      <me-backtop @backtop="backToTop" :visible="isBacktopVisible" ref="backtop"/>
    </div>
  </div>
</template>

<script>
  import MeLoading from 'base/loading';
  import MeScroll from 'base/scroll';
  import MeBacktop from 'base/backtop';
  import {getCategoryContent} from 'api/category';
  import storage from 'assets/js/storage';
  import {CATEGORY_CONTENT_KEY, CATEGORY_CONTENT_UPDATE_TIME_INTERVAL} from './config';

  export default {
    name: 'CategoryContent',
    components: {
      MeLoading,
      MeScroll,
      MeBacktop
    },
    props: {
      curId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        content: {},
        isBacktopVisible: false,
        isLoading: false
      };
    },
    watch: {
      curId: function curId(id) {
        // console.log(id);
        this.isLoading = true;
        this.getContent(id).then(() => {
          this.isLoading = false;// 成功只有改变loading状态
          this.$refs.scroll && this.$refs.scroll.update();
          this.backToTop(0);// 调用此函数，切换tab时保持滚动条在顶部
        });
      }
    },
    // id的问题
    methods: {
      getContent(id) {
        let contents = storage.get(CATEGORY_CONTENT_KEY);
        let updateTime;
        let curTime = new Date().getTime();
        if (contents && contents[id]) { // 通过id找内容
          updateTime = contents[id].updateTime || 0;
          if (curTime - updateTime <= CATEGORY_CONTENT_UPDATE_TIME_INTERVAL) {
            // 条件成立走缓存
            return this.getContentByLocalStorage(contents[id]);
          } else { // 走http
            return this.getContentByHTTP(id).then(() => {
              this.updateLocalStorage(contents, id, curTime);
            });
          }
        } else { // 没有缓存内容直接走http
          // http
          return this.getContentByHTTP(id).then(() => {
            this.updateLocalStorage(contents, id, curTime);
          });
        }
        // console.log(this.curId);
      },
      getContentByLocalStorage(content) {
        this.content = content.data;
        return Promise.resolve();
      },
      getContentByHTTP(id) {
        return getCategoryContent(id).then(data => { // 请求数据
          return new Promise(resolve => {
            if (data) {
              this.content = data;
              resolve();// 函数可以自个调用自个
            }
          });
        });
      },
      updateLocalStorage(contents, id, curTime) { // 更新缓存
        contents = contents || {};
        contents[id] = {};
        contents[id].data = this.content;
        contents[id].updateTime = curTime;
        storage.set(CATEGORY_CONTENT_KEY, contents);
      },
      backToTop(speed) {
        this.$refs.scroll && this.$refs.scroll.scrollToTop(speed);
      },
      updateScroll() {
        // this.$refs.scroll && this.$refs.scroll.update();
      },
      backTopShow(translate, scroll) {
        // console.log(translate);
        // 判断滚动条,往上拉一屏的translate 改变isBacktopVisible的值
        this.isBacktopVisible = translate < 0 && -translate > scroll.height;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .content-wrapper {
    position: relative;
    height: 100%;
  }

  .loading-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: $category-popup-z-index;
    @include flex-center();
    width: 100%;
    height: 100%;
    /*background-color: $modal-bgc;*/

    .mine-loading {
      color: #fff;
      font-size: 14px;
    }
  }
  .loading-wrapper {
    width: 50%;
    padding: 30px 0;
    background-color: $modal-bgc;
    border-radius: 4px;
  }

  .content {
    padding: 10px;
  }

  .pic {
    margin-bottom: 12px;

    &-link {
      display: block;
    }

    &-img {
      width: 100%;
    }
  }

  .section {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }

    &-title {
      height: 28px;
      line-height: 28px;
      color: #080808;
      font-weight: bold;
    }

    &-list {
      display: flex;
      flex-wrap: wrap;
      background-color: #fff;
      padding: 10px 10px 0;
    }

    &-item {
      width: (100% / 3);
    }

    &-link {
      display: block;
    }

    &-pic {
      position: relative;
      width: 80%;
      padding-bottom: 80%;
      margin: 0 auto;
    }

    &-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &-name {
      height: 36px;
      line-height: 36px;
      text-align: center;
      @include ellipsis();
    }
  }

  .g-backtop-container {
    bottom: 10px;
  }

</style>
