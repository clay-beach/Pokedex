module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/sass/base/base.scss";`
            }
        }
    }
};