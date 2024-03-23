const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

const headerUrl = process.env.HEADER_URL
  ? process.env.HEADER_URL
  : "http://localhost:3001";

const cartUrl = process.env.CART_URL
  ? process.env.CART_URL
  : "http://localhost:3002";

const {
  NativeFederationTypeScriptHost,
} = require("@module-federation/native-federation-typescript/webpack");

const {
  NativeFederationTestsHost,
} = require("@module-federation/native-federation-tests/webpack");

const moduleFederationConfig = {
  name: "main",
  remotes: {
    header: `header@${headerUrl}/remoteEntry.js`,
    cart: `cart@${cartUrl}/remoteEntry.js`,
  },
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps.react,
      eager: true,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
      eager: true,
    },
    "react-router-dom": {
      singleton: true,
      requiredVersion: deps["react-router-dom"],
      eager: true,
    },
    antd: {
      singleton: true,
      requiredVersion: deps.antd,
      eager: true,
    },
  },
};

module.exports = {
  mode: "development",
  //   entry: path.resolve(__dirname, "src/index.ts"), // Входной файл
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"), // dist = build
    filename: "bundle.js",
  }, // выходной файл
  resolve: {
    extensions: [".tsx", ".ts", ".js", "jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin(moduleFederationConfig),
    new ExternalTemplateRemotesPlugin(),
<<<<<<< HEAD
    NativeFederationTypeScriptHost({
      moduleFederationConfig,
      deleteTypesFolder: false,
    }),
=======
    NativeFederationTypeScriptHost({ moduleFederationConfig }),
>>>>>>> origin/main
    NativeFederationTestsHost({
      moduleFederationConfig,
      additionalBundlerConfig: { format: "esm" },
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
    historyApiFallback: true,
    compress: true,
  },
};
