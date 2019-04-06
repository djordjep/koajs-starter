const paramValidation = {
    validateNum: (ctx, param, key) => {
        if (!param.match(/[0-9]+/)) {
            ctx.throw(400, `Wrong parameter passed, ${key} must be number`);
        }
    }

};

module.exports = paramValidation;