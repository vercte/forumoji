import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import "webpack-dev-server";

const config: webpack.Configuration = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        clean: true,
    },
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
                generator: {
                    filename: "img/[hash][ext]",
                }
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
                generator: {
                    filename: "img/[hash][ext]",
                }
            },
            {
                test: /\.svg$/,
                issuer: /\.tsx?$/,
                resourceQuery: { not: [/(url|inline)/] },
                use: ["@svgr/webpack"],
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            output: "./index.html",
            favicon: "./src/img/favicon.png",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "assets/emoji/15x15", to: "assets/emoji/15x15" },
            ],
        }),
    ]
};

export default config;
