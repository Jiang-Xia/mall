import axios from 'axios';
import jsonp from 'assets/js/jsonp';
import {SUCC_CODE, TIMEOUT, HOME_RECOMMEND_PAGESIZE, jsonpOtptins} from './config';
// 获取幻灯片数据 --ajax
export const getHomeSlider = () => {
  return axios.get('http://www.imooc.com/api/home/slider', {timeout: TIMEOUT}).then(res => {
    if (res.data.code === SUCC_CODE) {
      return res.data.slider;
    }
    throw new Error('没有成功获取到数据！');
  }).catch(err => {
    if (err) {
      console.log(err);
    }

    return [
      {
        linkUrl: 'https://www.imooc.com',
        picUrl: require('assets/img/404.png')
      }
    ];
  }).then(data => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  });
};

// 获取热门推荐数据 --jsonp
export const getHomeRecommend = (page = 1, psize = HOME_RECOMMEND_PAGESIZE) => {
  // 淘宝的接口
  const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json';
  const params = {
    page,
    psize,
    type: 0,
    frontCatId: ''
  };

  return jsonp(url, params, jsonpOtptins).then(res => {
    console.log(res);
    if (res.code === '200') {
      return res;
    }
    throw new Error('没有成功获取到数据！');
  }).catch(err => {
    if (err) {
      console.log(err);
    }
  }).then(data => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  });
};
