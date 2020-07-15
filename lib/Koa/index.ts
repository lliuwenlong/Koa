import * as http from 'http';
import {ServerResponse} from "http";
type RequestListener = (req: http.IncomingMessage, res: http.ServerResponse, next?: Function) => Promise<any>
export default class Koa {
    callback: RequestListener[] = [];
    context: {req: http.IncomingMessage, res: ServerResponse} | undefined;
    use(callback: RequestListener) {
        this.callback.push(callback);
    }
    // TODO: 传参问题未修复
    private compose (middlewareList: Function[]) {
        return function (req: http.IncomingMessage, res: http.ServerResponse) {
            function dispatch(i: number): Promise<any> {
                console.log(req.url);
                const fn: Function = middlewareList[i];
                try {
                    return Promise.resolve(fn(res, req, dispatch.bind(null, i + 1)))
                } catch (e) {
                    return Promise.reject(3);
                }
            }
            dispatch(0);
        }
    }

    listen(port: number, fn: () => void) {
        const func = this.compose(this.callback);
        const server: http.Server = http.createServer((req, res) => {
            res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
            func(req, res);
        });
        server.listen(port, fn);
    }

    createContext (req: http.IncomingMessage, res: ServerResponse) {
        this.context = {
            req: req,
            res: res
        };
    }
}
