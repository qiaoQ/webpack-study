module.exports = source => {
  console.log(source);
  // return js可执行代码
  return 'console.log("hello loader~")'
}