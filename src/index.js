const {add } = require('@tencent/firefox-add');
import imgSrc from './assets/large_pop_bg.png';
import './style/global.scss';
import about from './about.md';
require('./promise')

import { Card } from 'firefox-ui';

console.log(Card)

console.log(add(1,2))

console.log(about)

const helloWorld = () => {
  return new Promise((resolve)=> {
    setTimeout(() => {
      resolve('Hello World')
    })
  })
}

const init = async () => {
  const res = await helloWorld();
  console.log(res);
}

init();

const img = document.createElement('img');
img.src = imgSrc;
document.body.appendChild(img);

/**
 * beforeCreate——初始化initLifycyle 初始化initEvents 初始化render
 * created——页面数据的初始化，可以访问props、data、methods、computed、wacth
 * beforeMount——找到templete，生成render函数
 * mounted——实例挂载到，可以访问dom，执行一些ajax请求
 * beforUpdate——数据更新前触发，可以对数据进行修改
 * updated——数据更新后触发，可以访问更新后的dom节点
 * beforeDestory——组件销毁前触发，可以执行清除定时器和绑定的事件、销毁插件对象等
 * destoryed——组件销毁后触发
 */
