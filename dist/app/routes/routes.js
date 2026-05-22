"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesApi = void 0;
const user_1 = require("./user/user");
const dashboard_1 = require("./dashboard/dashboard");
class RoutesApi {
    constructor(app) {
        this._app = app;
        this.authRouter = new user_1.AuthRoutes();
        this.dashboardRouter = new dashboard_1.DashboardRoutes();
        this.initRoutes();
    }
    initRoutes() {
        this._app.use('/api/v1/user', this.authRouter.router);
        this._app.use('/api/v1/dashboard', this.dashboardRouter.router);
    }
}
exports.RoutesApi = RoutesApi;
//localhost:3000/api/v1/user/create
