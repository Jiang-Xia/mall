import storage from 'assets/js/storage';
import {SEARCH_HISTORY_KEYWORD_KEY} from 'pages/search/config';

export const searchMixin = {
  methods: {
    $_search_selectItem(keyword) {
      // $_ 代码风格书写，混合符号
      let keywords = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []);

      if (keywords.length !== 0) {
        keywords = keywords.filter(val => val !== keyword);
        // 数组过滤器   过滤不等于 keyword的保留，相等的替换
      }

      keywords.unshift(keyword);

      storage.set(SEARCH_HISTORY_KEYWORD_KEY, keywords);

      location.href = `https://s.m.taobao.com/h5?event_submit_do_new_search_auction=1&_input_charset=utf-8&topSearch=1&atype=b&searchfrom=1&action=home%3Aredirect_app_action&from=1&sst=1&n=20&buying=buyitnow&q=${keyword}`;
    }
  }
};
