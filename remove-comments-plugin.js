class RemoveCommentsPlugin {
  apply(compiler){
    //  emit hooks
    compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
      // compilation =>可以理解为此次打包的上下文
      for(const name in compilation.assets) {
        if (name.endsWith(',js')) {
          // console.log(name); // 输出文件名称
          // console.log(compilation.assets[name].source()) // 输出文件内容
          const contents = compilation.assets[name].source();
          const noComments = contents.replace(/\/\*{2.}\/\s?/g, '');

          compilation.assets[name] = {
            source: () => noComments, // 处理后的资源
            size: () => noComments.length
          }
        }
      }
    })
  }
}

module.exports = RemoveCommentsPlugin