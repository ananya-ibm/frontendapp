/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable */


const webpack = require('webpack');
const path = require('path');
const WebpackBar = require('webpackbar');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const fs = require('fs');
const { resolveTheme } = require('./buildUtils/theme/themeUtils');
const LoadablePlugin = require('@loadable/webpack-plugin');
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;
const { getProviders, getOverrides, getOverridden, getEnv } = require('./buildUtils/lib/aliases');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');

const { NODE_ENV, CUSTOM_ENV, PORT, GTMID, HTTPS, HTTPS_KEY, HTTPS_CERT } = process.env;

const getStaticEnvironment = (e, buildMode) => {
  const dynamicEntries = (e.DYNAMIC_ENV_KEYS ?? '').split(',');
  const res = Object.fromEntries(Object.entries(e).filter(([k]) => !dynamicEntries.includes(k)));
  res.BUILD_MODE = buildMode ?? '';
  return res;
};

const getDynamicEnvironment = (e) => {
  const dynamicEntries = (e.DYNAMIC_ENV_KEYS ?? '').split(',');
  const res = Object.fromEntries(dynamicEntries.map(
    k => [
      `process.env.${k}`,
      // You can use this definition for debugging if needed
      // `(() => { const v = window.__${k}__ || "${e[k]}"; console.log("${k} = " + v); return v; })()`
      `(() => { const v = window.__${k}__ || "${e[k]}"; return v; })()`
    ]));
  return res;
};

const findRepoRoot = () => {
  let p = process.cwd();
  while (true) {
    const dir = fs.readdirSync(p);
    if (dir.includes('packages') && dir.includes('lerna.json')) {
      return p;
    }
    p = path.resolve(p, '..');
  }
};

const findAllPackageLock = () => {
  const arr = [];
  const findAllPackageLockRecurse = (dir) => {
    const files = fs.readdirSync(dir);
    if (files.includes('package-lock.json')) {
      arr.push(path.join(dir, 'package-lock.json'));
    }
    for (const file of files) {
      const fullFilePath = path.join(dir, file);
      if (file !== 'node_modules' && file[0] !== '.' && fs.statSync(fullFilePath).isDirectory()) {
        findAllPackageLockRecurse(fullFilePath);
      }
    }
  };
  findAllPackageLockRecurse(findRepoRoot());
  return arr;
};

const if_development_mode = (arr) => NODE_ENV === 'development' ? arr : [];

const if_production_mode = (arr) => NODE_ENV !== 'development' ? arr : [];

const if_not_in_ssr_server = (arr) => {
  if (process.argv.length <= 1 || process.argv[1].indexOf('server.bundle.js') < 0) return arr;
  return [];
};

const currentPath = path.join(process.cwd());
const repoRoot = findRepoRoot();

// TODO: Why do we do this, I assume it was to make configurable, but we cannot change it?
const envFile = '.env';

const effectiveEnv = dotenvExpand({
  ...dotenv.config({ path: `${repoRoot}/globalenv` }).parsed,
  ...dotenv.config({ path: `${repoRoot}/client-packages/globalenv` }).parsed,
  ...dotenv.config({ path: `${currentPath}/.env` }).parsed,
  ...dotenv.config({ path: `${currentPath}/${envFile}` }).parsed,
  ...process.env
});

effectiveEnv.PROVIDERS_CONTENT_PROVIDER = effectiveEnv.PROVIDERS_CONTENT_PROVIDER 
  ?? 'packages/features/content/content-provider-noop/lib/index.ts';

const if_env = (key, value, arr) => effectiveEnv[key] === value ? arr : [];

const defaultTheme = 'packages/themes/default-theme/src/index.ts';
const theme = resolveTheme(repoRoot, effectiveEnv.PROVIDERS_THEME ?? effectiveEnv.THEME ?? defaultTheme);
const themeAssetFolders = [path.resolve(repoRoot, path.join(path.dirname(effectiveEnv.PROVIDERS_THEME ?? effectiveEnv.THEME ?? defaultTheme), 'assets'))];
for (let i = 0; i < 10; i++) {
  if (effectiveEnv[`PROVIDERS_THEME_${i}`]) {
    themeAssetFolders.push(path.resolve(repoRoot, path.join(path.dirname(effectiveEnv[`PROVIDERS_THEME_${i}`]), 'assets')));
  }
}

const resolveFile = (f) => path.resolve(currentPath, f);

const baseConfig = function (env, opts, additionalAliases, name) {
  opts = opts || {};
  return {
    mode: NODE_ENV || 'production',
    experiments: {
      backCompat: false
    },
    cache: {
      type: "filesystem",
      compression: 'brotli',
      buildDependencies: {
        config: [__filename],
        env: [`${currentPath}/.env`, `${currentPath}/${envFile}`]
      },
      name: name.split('-')[0]
    },
    module: {
      unsafeCache: true,
      rules: [
        // Fixes https://github.com/graphql/graphql-js/issues/1272
        {
          test: /\.mjs$/,
          resolve: {
            fullySpecified: false
          }
        },
        {
          test: /\.(js|ts|tsx)$/,
          exclude: /(node_modules|__snapshots__|dist|webpack\.config\.js|\.stories\.js|mocks)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                rootMode: 'upward',
                plugins: [
                  ...if_production_mode([
                    [
                      "babel-plugin-jsx-remove-data-test-id",
                      {
                        attributes: "data-testid"
                      }
                    ]
                  ]),
                  ...if_development_mode([
                    require.resolve('react-refresh/babel')
                  ])
                ]
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|webp|gif|woff|woff2|eot|ttf|otf)$/,
          exclude: /node_modules/,
          use: ['file-loader']
        },
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          use: ['@svgr/webpack']
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader'
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json', '.mjs', '.gql', '.graphql'],
      alias: {
        react: path.resolve(repoRoot, 'node_modules/react'),
        'styled-components': path.resolve(repoRoot, 'node_modules/styled-components'),

        ...(Object.fromEntries(getProviders(getEnv(repoRoot, 'WEBPACK', effectiveEnv), repoRoot, true).map(e =>
          [e.package, path.resolve(repoRoot, e.entry)]))),

        ...(Object.fromEntries(getOverrides(getEnv(repoRoot, 'WEBPACK', effectiveEnv), repoRoot, true).map(e =>
          [e.overriddenPackage, path.resolve(repoRoot, e.override)]))),

        ...(Object.fromEntries(getOverridden(getEnv(repoRoot, 'WEBPACK', effectiveEnv), repoRoot, true).map(e =>
          [e.originalPackage, path.resolve(repoRoot, e.path)]))),

        ...additionalAliases
      }
    },
    output: {
      path: path.resolve(currentPath, 'dist'),
      publicPath: '/'
    },
    plugins: [
      // TODO: Why do we need to provide React
      new webpack.ProvidePlugin({
        React: 'react'
      }),
      new webpack.BannerPlugin({
        banner: `Licensed Materials - Property of IBM\n694906Hn© Copyright IBM Corp.  ${new Date().getYear() +
          1900} All Rights Reserved\nUS Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.`
      }),
      ...if_development_mode([
        new ReactRefreshWebpackPlugin({ overlay: false })
      ])
    ],
    stats: false
  };
};

const clientConfig = function (env, additionalAliases, buildMode) {
  const base = baseConfig(env, {
    styleLoader: 'style-loader'
  }, additionalAliases, `client-${currentPath}`);

  return {
    name: 'Client',
    mode: base.mode,
    cache: base.cache,
    externals: [
      {
        // This is used for the AEM SSR - and should not be included in build
        'http-proxy-middleware': "{}" 
      }
    ],
    entry: [
      resolveFile('./client/index.js')
    ],
    devtool: NODE_ENV === 'development' ? 'eval-cheap-source-map' : 'cheap-module-source-map',
    devServer: {
      hot: true,
      static: {
        directory: path.resolve(currentPath, 'dist'),
      },
      compress: true,
      host: 'localhost',
      port: PORT || 3000,
      historyApiFallback: true,
      ...(HTTPS === 'true' ? {
        https: {
          key: fs.readFileSync(HTTPS_KEY),
          cert: fs.readFileSync(HTTPS_CERT)
        }
      } : {}),
      onListening: function (server) {
        const { port } = server.server.address();
        server.compiler.hooks.done.tap('done', () => {
          setImmediate(() => {
            console.log();
            if (HTTPS === 'true') {
              console.log(`EXO Frontend app running on https://localhost:${port}  🚀`);
            } else {
              console.log(`EXO Frontend app running on http://localhost:${port}  🚀`);
            }
          });
        });
      }
    },
    module: { ...base.module },
    resolve: { ...base.resolve },
    output: {
      ...base.output,
      filename: 'client.bundle.js',
      chunkFilename: '[name].chunk.js'
    },
    plugins: [
      ...base.plugins,
      new WebpackBar({ name: 'Client    ', color: 'blue' }),
      new webpack.DefinePlugin({
        process: {
          env: {}
        }
      }),
      new webpack.EnvironmentPlugin(getStaticEnvironment(effectiveEnv, buildMode)),
      new webpack.DefinePlugin(getDynamicEnvironment(effectiveEnv)),
      new LoadablePlugin(),

      ...if_not_in_ssr_server([
        new CopyPlugin({
          patterns: [
            {
              from: './client/static',
              to: 'static',
              noErrorOnMissing: true
            },
            ...(themeAssetFolders.map(a => ({
              from: a,
              to: 'static/theme'
            }))),
            {
              from: './client/static/favicon.ico',
              to: '',
              noErrorOnMissing: true
            },
            {
              from: './client/static/robots.txt',
              to: '',
              noErrorOnMissing: true
            },
            {
              from: './manifest.json',
              to: '',
              noErrorOnMissing: true
            }
          ]
        })
      ]),

      new HtmlWebpackPlugin({
        inject: true,
        template: resolveFile('client/index.ejs'),
        gtmid: GTMID
      }),

      ...if_development_mode([new webpack.HotModuleReplacementPlugin()]),

      ...if_production_mode([
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/,
        }),
        new CompressionPlugin({
          algorithm: "brotliCompress",
          test: /\.js$|\.css$|\.html$/,
          compressionOptions: {
            params: {
              [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
            },
          }
        })
      ])
    ]
  };
};

const csrConfig = function (env, additionalAliases, buildMode) {
  const base = baseConfig(env, {}, additionalAliases, `csr-${currentPath}`);
  return {
    name: 'CSR Server',
    mode: base.mode,
    cache: base.cache,
    target: 'node',
    externals: [nodeExternals({ allowlist: [/@(tuscany|ixl-frontend|exo)/] }),
    {
      express: "require(\"express\")",
    }
    ],
    entry: resolveFile('server/csr.js'),
    module: { ...base.module },
    resolve: { ...base.resolve },
    output: {
      ...base.output,
      filename: 'csr-server.bundle.js'
    },
    plugins: [
      ...base.plugins,
      new WebpackBar({ name: 'CSR Server' }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  };
};

// Due to webpack error in production build process, this is currently built with development
// mode hardcoded:
// https://github.ibm.com/ixliberty/ixl-frontend/pull/472?email_source=notifications&email_token=AABOPQG6KLZWEQRUT4IVPJLR4AOJZA5CNFSM4AHH2WU2YY3PNVWWK3TUL52HS4DFWFIHK3DMKJSXC5LFON2FEZLWNFSXPKTDN5WW2ZLOORPWSZGOABKG3KQ#discussion_r3604095
const ssrConfig = function (env, additionalAliases, buildMode) {
  const base = baseConfig(env, {}, additionalAliases, `ssr-${currentPath}`);
  return {
    name: 'SSR Server',
    mode: 'development',
    cache: base.cache,
    target: 'node',
    externals: [
      nodeExternals({ allowlist: [/@(tuscany|ixl-frontend|exo)/] }),
      { fsevents: "require('fsevents')", express: "require(\"express\")" }
    ],
    entry: resolveFile('server/ssr.js'),
    module: { ...base.module },
    resolve: { ...base.resolve },
    output: {
      filename: 'server.bundle.js',
      ...base.output
    },
    optimization: {
      minimize: false,
      nodeEnv: false
    },
    plugins: [
      ...base.plugins,
      new CopyPlugin({
        patterns: [
          {
            from: './client/static',
            to: 'static',
            noErrorOnMissing: true
          },
          {
            from: './client/static/robots.txt',
            to: '',
            noErrorOnMissing: true
          },
          {
            from: './manifest.json',
            to: '',
            noErrorOnMissing: true
          }
        ]
      }),
      new WebpackBar({ name: 'SSR Server' }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ],
    node: {
      __dirname: false,
      __filename: true
    }
  };
};

module.exports = function (env, additionalAliases = {}) {
  let dest = [];
  const buildMode = CUSTOM_ENV || 'client';
  for (const e of buildMode.split(',')) {
    if (e === 'ssr') {
      dest.push(ssrConfig(env, additionalAliases, buildMode));
    } else if (e === 'csr') {
      dest.push(csrConfig(env, additionalAliases, buildMode));
    } else if (e === 'analyze') {
      const cfg = clientConfig(env, additionalAliases, buildMode);
      cfg.plugins.push(new BundleAnalyzerPlugin());
      /*cfg.plugins.push(new StatoscopeWebpackPlugin({
        saveReportTo: 'dist/statoscope.html',
      }));*/
      dest.push(cfg);
    } else {
      if (process.env.CMS_NAME === "aem") {
        effectiveEnv.PRELOAD_ALL = true;
        const cfg = clientConfig(env, additionalAliases, buildMode);
        cfg.plugins.push(new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1
        }));
        dest.push(cfg);
      } else {
        dest.push(clientConfig(env, additionalAliases, buildMode));
      }
    }
  }
  return dest;
};
