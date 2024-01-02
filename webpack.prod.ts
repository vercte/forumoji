import { merge } from "webpack-merge";
import common from "./webpack.common";

const prod = merge(common, {
    mode: "production",
    optimization: {
        minimize: true,
        sideEffects: true,
        concatenateModules: true,
    }
});

export default prod;
