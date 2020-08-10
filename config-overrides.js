const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin, 
  addWebpackAlias,
  addDecoratorsLegacy,
  overrideDevServer
} = require('customize-cra');

const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

function resolve (pathUrl) {
  return path.join(__dirname, pathUrl);
}

const addCustomize = () => (config) => {
  // 配置打包后的文件位置
  // config.output.path = resolve('dist');
  if (config.output.publicPath) {
    config.output.publicPath = '/';
      // isProduction ? '/react-ts-antd-admin/' : '/';
  }

  if (config.resolve) {
    config.resolve.extensions = ['.js', '.tsx', '.less', '.css'];
  }

  // 添加js、css打包gzip配置
  config.plugins.push(
    new CompressionWebpackPlugin({
      algorithm: 'gzip', // 算法
      test: /\.js$|\.css$/,  // 压缩 js 与 css
      threshold: 1024, // 只处理比这个值大的资源，按字节计算
      // minRatio: 0.8 // 只有压缩率比这个值小的资源才会被处理
    }),
  )

  return config;
};

// 设置代理
const devServerConfig = () => config => {
  return {
    ...config,
    proxy: {
      '/api': {
        target: 'http://106.55.168.13:9000',
        changeOrigin: true,
        secure: false
      }
    }
  };
};

// 关掉 sourceMap
process.env.GENERATE_SOURCEMAP = isProduction ? 'false' : 'true';

module.exports = {
  webpack: override(
    // 判断环境，只有在生产环境的时候才去使用这个插件
    isProduction && addWebpackPlugin(new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_debugger: true,
          drop_console: true
        }
      }
    })),
    
    // 启用装饰器语法
    addDecoratorsLegacy(),
      
    // 配置antd按需引入
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true, // 自动打包相关的样式
    }),
  
    // 使用less-loader对源码中的less的变量进行重新指定
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#2d8cf0' },
    }),
  
    // 配置路径别名
    addWebpackAlias({
      '@': resolve('src'),
    }),

    // 压缩JS、CSS等
    addCustomize()
  ),

  // 本地启动配置，可以设置代理
  devServer: overrideDevServer(devServerConfig())
};
  