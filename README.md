# cloud os fe project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost
npm start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

test

4555
## TODO
- [ ] .babelrc add component plugin.

# 多语

1.i18n_addTags: 加上标记的源码文件，执行i18n_tool_2删除
2.i18n: 里面是需要翻译的json文件以及手动添加其他语言翻译json文件
3.en: 生成的en源码，除了语言不同，其他与src一样
4.en_US,cn_ZH: 与之前的dist目录性质相同，打包后的文件

5.export: 导出所有的.cn.i18n 或者 .en.i18n文件
6.import: 将翻译的文件对应生成.en.i18n
7.os_fe1.xlsx: 翻译人员给的翻译后的文件