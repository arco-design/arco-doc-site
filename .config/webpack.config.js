const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getPWAConfig } = require('./pwa');

exports.site = (config, env) => {
  const isSubModule = process.env.SUB_MODULE === 'true';
  const isEnvProduction = env === 'prod';

  if (isEnvProduction) {
    config.output.publicPath === '/';
  }

  config.entry = {
    react: path.resolve(__dirname, '../src/index.js'),
    'react-en': path.resolve(__dirname, '../src/index-en.js'),
  };

  config.module.rules[1].use[1].options.demoDir = '__demo__';

  config.module.rules[1].use[1].options.autoHelmet = {
    formatTitle: (value) => `${value} | ArcoDesign`,
  };

  config.plugins[0] = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../public/index.ejs'),
    templateParameters: {
      title: 'Arco Design - 企业级产品的完整设计和开发解决方案',
      lang: 'zh',
      isSubModule,
    },
    chunks: ['react'],
  });

  config.plugins.push(
    new HtmlWebpackPlugin({
      filename: 'react-en.html',
      template: path.resolve(__dirname, '../public/index.ejs'),
      templateParameters: {
        title:
          'Arco Design - Complete design and development solutions for enterprise-level products',
        lang: 'en',
        isSubModule,
      },
      chunks: ['react-en'],
    })
  );
  if (isSubModule) {
    config.resolve.alias['@arco-design/web-react'] = path.resolve(
      __dirname,
      '..'
    );
    config.module.rules.push({
      test: /\.js$/,
      include: path.resolve(__dirname, '../src'),
      use: [
        {
          loader: path.resolve(__dirname, 'webpack_submodule_loader.js'),
        },
      ],
    });
  }

  if (env === 'dev') {
    config.devServer.historyApiFallback = {
      rewrites: [
        {
          from: /^(\/(react|docs|showcase)){0,1}\/en-US/,
          to: '/react-en.html',
        },
        { from: /^\/$/, to: '/index.html' },
      ],
    };
  }
  getPWAConfig(config, env);
};
