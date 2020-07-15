import * as http from "http";

enum Method {
    POST = "post",
    GET = "get"
}
interface Route {
    path: string
    method: Method,
    middleware: http.RequestListener
}
export default class Router {
    stacks: Route[] = [];

    register(path: string, method: Method, middleware: http.RequestListener) {
        this.stacks.push({path, method, middleware})
    }

    get(path: string, middleware: http.RequestListener) {
        this.register(path, Method.GET, middleware)
    }

    post(path: string, middleware: http.RequestListener) {
        this.register(path, Method.POST, middleware)
    }

    routes (req: http.IncomingMessage, res: http.ServerResponse) {
        const url: string = (req.url as string);
        const method: string = (req.method as string).toLowerCase();
        for (let i: number = 0; i < this.stacks.length; i++) {
            const stacks:Route = this.stacks[i];
            if (stacks.method === method && stacks.path === url) {
                stacks.middleware(req, res);
                break;
            }
        }
    }
}
