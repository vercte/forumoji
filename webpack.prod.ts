import { merge } from "webpack-merge";
import common from "./webpack.common";

const prod = merge(common, {
    mode: "production",
    optimization: {
        minimize: true,
        sideEffects: true,
        concatenateModules: true,
        splitChunks: {
            chunks: "all",
            minSize: 0,
            cacheGroups: {
                data: {
                    test: /\.json$/,
                    filename: "assets/[name].js",
                    name(module) {
                        const filename = module.rawRequest.replace(/^.*[\\/]/, "");
                        return filename.substring(0, filename.lastIndexOf("."));
                    },
                }
            }
        }
    }
});

export default prod;
