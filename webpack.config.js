const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { mergeWith } = require("lodash");
const path = require("path");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "sbt-tt",
    projectName: "as-ui",
    webpackConfigEnv,
    argv,
    devtool: "source-map",

    output: {
      filename: "[name].js",
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: "all",
            name: "vendor",
          },
        },
      },
    },
  });

  return merge(defaultConfig, {
    module: {
      rules: [
        {
          test: /\.jsx?/,
          include: path.join(__dirname, "src"),
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.tsx?/,
          include: path.join(__dirname, "src"),
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        },
        // {
        //   test: /\.scoped\.css$/,
        //   use: [
        //     MiniCssExtractPlugin.loader,
        //     {
        //       loader: "css-loader",
        //     },
        //   ],
        // },
        // {
        //   test: /\.css$/,
        //   use: ["css-loader"],
        // },
        {
          test: /\.module\.scss$/,
          include: path.join(__dirname, "src/pages"),
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                url: false,
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.scss$/,
          include: path.join(__dirname, "src/styles"),
          use: [
            { loader: "css-loader", options: { url: false } },
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
              },
            },
          ],
        },
        // {
        //   test: /\.scoped\.css$/,
        //   use: [
        //     MiniCssExtractPlugin.loader,
        //     {
        //       loader: "css-loader",
        //     },
        //   ],
        // },
        {
          test: /\.css$/,
          use: ["css-loader"],
        },
        // {
        //   test: /\.css$/,
        //   oneOf: [
        //     {
        //       test: /\.module\.css$/,
        //       use: [
        //         MiniCssExtractPlugin.loader,
        //         {
        //           loader: "css-loader",
        //           options: { modules: true, exportOnlyLocals: false },
        //         },
        //       ],
        //     },
        //     {
        //       use: [MiniCssExtractPlugin.loader, "css-loader"],
        //     },
        //   ],
        // },
        {
          test: /\.(png|jpg)$/,
          use: ["url-loader"],
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack", "url-loader"],
        },
      ],
    },
    //
    // plugins: [
    //   new MiniCssExtractPlugin({
    //     // Our styles are properly scoped and they can be bundled in any order
    //     ignoreOrder: true,
    //     filename: "[name].css",
    //   }),
    // ],
  });
};
