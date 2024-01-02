import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import "webpack-dev-server";

const config: webpack.Configuration = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        clean: true,
    },
    devtool: "source-map",
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "src": path.resolve(__dirname, "src/"),
            "assets": path.resolve(__dirname, "assets/"),
            "components": path.resolve(__dirname, "src/components/"),
            "css": path.resolve(__dirname, "src/css/"),
            "img": path.resolve(__dirname, "src/img/"),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg)$/,
                type: "asset/resource",
            },
            {
                test: /\.(png|jpg|svg)$/,
                type: "asset/inline",
                resourceQuery: /inline/,
            },
            {
                test: /\.svg$/,
                issuer: /\.tsx?$/,
                resourceQuery: /url/,
                type: "asset/resource",
            },
            {
                test: /\.svg$/,
                issuer: /\.tsx?$/,
                resourceQuery: { not: [/(url|inline)/] },
                use: ["@svgr/webpack"],
            }
        ],
    },
    devServer: {
        compress: true,
        port: 8080,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            output: "./index.html",
            favicon: "./src/img/favicon.png",
        }),
    ],
    cache: false
};

export default config;
