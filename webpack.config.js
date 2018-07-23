module.exports = {
    entry: "./public/src/main.js",
    output: {
        path: __dirname + "/public/_dist",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                loader: "babel-loader", 
                exclude: /node-modules/
            }
        ]
    }
};
