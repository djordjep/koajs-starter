const Product = require('./model_bootstrap')['models']['Product'];
const paginate = require('./model_bootstrap')['paginate'];
const HALbuilder = require('../services/halBuilder');

const product = {
    post: ctx => {
        ctx.body = `hello product ${JSON.stringify(ctx.request.body)}`
    },
    get: async (ctx, next) => {
        // pagination on collections
        let products = await Product.findAll({where: {}, ...paginate(ctx.request.query)});

        // hal builder service for hypermedia controls on collections
        let hal = await HALbuilder(Product, ctx.originalUrl, ctx.request.query);
        
        products.push(hal);
        
        ctx.body = products;
    },
    getBy: async (ctx, next) => {
        let product = await Product.findByPk(parseInt(ctx.params.productId));
        ctx.body = product;
    },
    put: ctx => ctx.body = `hello product ${ctx.params.productId} `,
    delete: ctx => ctx.body = `hello product ${ctx.params.productId} `
};


module.exports = product;