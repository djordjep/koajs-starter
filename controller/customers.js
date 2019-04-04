

const customers = {
    post: ctx => ctx.body = `hello customer ${JSON.stringify(ctx.request.body)}`,
    get: ctx => ctx.body = `hello customer ${ctx.params.customerId}`,
    put: ctx => ctx.body = `hello customer ${ctx.params.customerId}`,
    delete: ctx => ctx.body = `hello customer ${ctx.params.customerId}`
};


module.exports = customers