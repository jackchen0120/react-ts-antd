const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias,
    addDecoratorsLegacy,
    overrideDevServer
  } = require('customize-cra');

  const path = require('path');
  const webpack = require('webpack');

  function resolve (pathUrl) {
    return path.join(__dirname, pathUrl);
  }

  const addCustomize = () => (config) => {
    if (config.output.publicPath) {
      config.output.publicPath =
        process.env.NODE_ENV === 'production'
          ? '/react-admin/'
          : '/';
    }

    if (config.resolve) {
      config.resolve.extensions.push('.tsx');
    }

    return config;
  };

  const devServerConfig = () => config => {
    return {
      ...config,
      proxy: {
        '/api': {
          target: 'http://106.55.168.13:8082',
          changeOrigin: true,
          secure: false
        }
      }
    };
  };

  // 关掉 sourceMap
  process.env.GENERATE_SOURCEMAP = process.env.NODE_ENV === 'development' ? 'true' : 'false';

  module.exports = {
    webpack: override(
    // 针对antd实现按需打包: 根据import来打包(使用babel-plugin-import)
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

    addCustomize()
  ),
  devServer: overrideDevServer(devServerConfig())
};
  