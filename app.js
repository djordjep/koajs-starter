const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const mainRouter = require('./routes/main');

// error log
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

// error handeling
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.set('Content-Type', 'application/json');
        ctx.status = err.status || 500;
        ctx.body = `{"error": "${err.message}"}`;
        ctx.app.emit('error', err, ctx);
    }
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

// use koa-body
app.use(koaBody());
// connect router
app.use(mainRouter);

app.listen(3000);