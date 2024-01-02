import { merge } from "webpack-merge";
import common from "./webpack.common";

const dev = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        port: 8080
    },
    cache: false,
});

export default dev;
