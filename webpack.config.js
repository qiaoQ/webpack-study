const path = require('path');
const HtmlWebackplugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // webpack5可用
const RemoveCommentsPlugin = require('./remove-comments-plugin.js');

module.exports = {
  entry: './src/index.js',
  mode: 'none',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    // assetModuleFilename: 'image/[contenthash][ext]'
  },
  // devtool: 'inline-source-map',
  plugins: [
    new HtmlWebackplugin({
      template: './index.html',
      filename: 'app.html',
      inject: 'body'
    }),
    new MiniCssExtractPlugin(),
    new RemoveCommentsPlugin()
  ],
  // devServer: {
  //   static: './dist',
  //   compress: true, // 使从服务器传输文件压缩，gzip
  //   port: 8080, // 端口号
  //   // proxy: {
  //   //   '/api': 'http://localhost:9000'
  //   // },
  //   // https: true,
  //   // http2: true,
  //   historyApiFallback: true, // 使使用history路由时，访问任意路由不报错，默认去根路由
  //   host: '0.0.0.0', // 是局域网内小伙伴可以访问到自己机器
  //   hot: true, // 模块热替换，不刷新页面
  //   liveReload: true, // 模块热加载，默认true，刷新浏览器
  //   client: {
  //     overlay: false, // 报错显示层，默认true
  //   },
  // },
  module: {
    rules: [
      // {
      //   test: /\.png$/,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'images/[contenthash][ext]'
      //   }
      // },
      // {
      //   test: /\.png$/,
      //   type: 'asset/inline'
      // },
      {
        test: /\.txt$/,
        type: 'asset/source'
      },
      {
        test: /\.png$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 默认资源大小，超过4kb则采用asset/resource模式，否则使用asset/inline模式
          }
        }
      },
      // {
      //   test: /\.(css|less|scss)$/,
      //   use: ['style-loader', 'css-loader', 'less-loader', 'sass-loader'],
      // },
      {
        test: /\.(css|less|scss)$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: { // css模块化，防止样式冲突
            modules: true
          }
        }, 'less-loader', 'sass-loader'],
      },
      {
        test: /\.md$/,
        use: ['./markdown-loader.js']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-runtime' // 支持async、await等的转换
              ]
            ]
          },
        }
      }
    ]
  },
  // 代码优化
  // optimization: {
  //   // 抽离公共代码模块，防止重复
  //   splitChunks: {
  //     // chunks: 'all'
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendor',
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // },
  // resolve: {
  //   // 配置路径别名
  //   alias: {
  //     '@': path.resolve(__dirname, './src')
  //   },
  //   extensions: ['.js', '.vue', '.json'], // 导入文件未设置扩展名时，优先识别的扩展名，优先级高低从左——>右,.js优先
  // },
  // 添加外部扩展库
  // externalsType: 'script',
  // externals: {
  //   jquery: [
  //     'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js', // 库地址
  //     '$'
  //   ]
  // }
}