"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusMonitorMiddleware = void 0;
const common_1 = require("@nestjs/common");
const onHeaders = require("on-headers");
const status_monitoring_service_1 = require("./status.monitoring.service");
const status_monitor_constants_1 = require("./status.monitor.constants");
let StatusMonitorMiddleware = class StatusMonitorMiddleware {
    constructor(statusMonitoringService, config) {
        this.statusMonitoringService = statusMonitoringService;
        this.config = config;
    }
    use(req, res, next) {
        if (this.config.ignoreStartsWith &&
            !req.originalUrl.startsWith(this.config.ignoreStartsWith) &&
            !req.originalUrl.startsWith(this.config.path)) {
            const startTime = process.hrtime();
            onHeaders(res, () => {
                this.statusMonitoringService.collectResponseTime(res.statusCode, startTime);
            });
        }
        next();
    }
};
StatusMonitorMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(status_monitor_constants_1.STATUS_MONITOR_OPTIONS_PROVIDER)),
    __metadata("design:paramtypes", [status_monitoring_service_1.StatusMonitoringService, Object])
], StatusMonitorMiddleware);
exports.StatusMonitorMiddleware = StatusMonitorMiddleware;
