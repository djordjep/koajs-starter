const Customer = require('./model_bootstrap')['models']['Customer'];


const customers = {
    post: ctx => {
        ctx.body = `hello customer ${JSON.stringify(ctx.request.body)}`
    },
    get: async ctx => {
        let customers = await Customer.findAll()
        ctx.body = customers;
    },
    getBy: async ctx => {
        let customer = Customer.findByPk(ctx.params.customerId);
        ctx.body = customer;
    },
    put: ctx => ctx.body = `hello customer ${ctx.params.customerId}`,
    delete: ctx => ctx.body = `hello customer ${ctx.params.customerId}`
};


module.exports = customers;