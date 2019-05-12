const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const mainRouter = require('./routes/main');
const passport = require('koa-passport')
require('./services/auth');

// error handeling
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = `{"status": ${err.status}, "message": "${err.message}"}`;
        ctx.app.emit('error', err, ctx);
    }
});

// error log, centralized error handling
app.on('error', async (err, ctx) => {
    console.error('server error', err, ctx);
});

// logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(passport.initialize());

// use koa-body
app.use(koaBody());
// connect router
app.use(mainRouter);

app.listen(3000);