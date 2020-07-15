import Router from "../lib/Router";
const router = new Router()
router.get("/test", function (req, res) {
    res.end(JSON.stringify({a: 1}));
})
router.post("/test", function (req, res) {
    res.end(JSON.stringify({a: 2}));
})

export default router;
