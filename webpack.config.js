const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//webpack中的所有配置信息都写在这里
module.exports = {
  //指定入口文件
  entry:"./src/index.ts",

  //指定打包文件所在目录
  output:{
      //指定打包文件的目录
      path:path.resolve(__dirname,'dist'),
      //打包后的文件
      filename:"bundle.js",
      //告诉webpack不适用箭头
      environment:{
        arrowFunction:false
      }
  },
  //指定webpack打包时要用模块
  module:{
    //指定要加载的规则
    rules:[
      {
        //test指定的是规则生效的文件
        test:/\.ts$/,
        use:[
          {
            //指定加载器
            loader:'babel-loader',
            //设置babel
            options:{
              //设置预定义的环境
              presets:[
                [
                  //设置环境
                  "@babel/preset-env",
                  {
                    //要兼容的浏览器
                    targets:{
                      "chrome":"58",
                      "ie":"11"
                    },
                    //指定corejs的版本
                    "corejs":'3',
                    //使用corejs的方法
                    "useBuiltIns":"usage"
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        //要派出的文件
        exclude:/node_modules/
      },
      //less文件处理
      {
        test:/\.less$/,
        use:[
          "style-loader",
          "css-loader",
          {
            loader:'postcss-loader',
            options:{
              postcssOptions:{
                plugins:[
                  ["postcss-preset-env",{browsers:'last 2 versions'}]
                ]
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  //配置webpack插件
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
  ],
  //设置应用模块
  resolve:{
    extensions:['.ts','.js']
  }
}