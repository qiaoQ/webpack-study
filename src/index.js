const {add} = require('@tencent/firefox-add');
import imgSrc from './assets/large_pop_bg.png';
import './style/global.scss';

console.log(add(1,2))

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
