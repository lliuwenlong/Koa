import Koa from "./lib/Koa/index";
import * as http from "http";
const app = new Koa();
import router from "./src/routerConfig";

app.use(async (req, res, next) => {
    next !== undefined && await next();
});

app.use(async (req, res, next) => {
    console.log(2);
    next !== undefined && await next();
});

app.use(async (req, res, next) => {
    console.log(3);
    next !== undefined && await next();
});
app.use(async (req, res, next) => {
   console.log(4)
    // router.routes(req, res);
    // next !== undefined && await next();
});

app.listen(3000, () => {
    console.log("start server")
})
