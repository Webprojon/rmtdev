//const autoprefixer = require("autoprefixer");

module.exports = {
	plugins: [
		require("autoprefixer"),
		require("cssnano"),
		require("postcss-pxtorem")({ propList: ["*"] }),
	],
};
