// 获取商品详情数据 --jsonp
import {jsonpOptions} from './config';
import jsonp from 'assets/js/jsonp';

export const getProductDetails = (id) => {
  // console.log(id);
  // 淘宝的接口
  const url = `https://unszacs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/`;
  const params = {
    api: 'mtop.taobao.detail.getdetail',
    ttid: '2017%40taobao_h5_6.6.0',
    data: `%7B"itemNumId"%3A"${id}"%7D`, // 之前的是  编码问题
    appKey: 12574478,
    dataType: 'jsonp',
    type: 'jsonp',
    v: '6.0'
  };
  return jsonp(url, params, jsonpOptions).then(res => {
    // console.log(res.data);
    if (res.ret[0] === 'SUCCESS::调用成功') {
      // console.log(res.data.item);
      return res.data;
    }
  }).catch(err => {
    if (err) {
      console.log(err);
    }
  });
//  .then(data => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(data);
//       }, 1000);
//     });
//   });
};
