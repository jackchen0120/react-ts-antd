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
        test: /\.js$|\.css$/,
        threshold: 1024,
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
    
    // 支持装饰器
    addDecoratorsLegacy(),

    // 压缩JS等
    addCustomize()
  ),

  // 本地启动配置，可以设置代理
  devServer: overrideDevServer(devServerConfig())
};
  