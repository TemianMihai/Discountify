import { HealthCheckService, TypeOrmHealthIndicator, HealthCheckResult } from "@nestjs/terminus";
export declare class HealthController {
    private readonly health;
    private readonly db;
    constructor(health: HealthCheckService, db: TypeOrmHealthIndicator);
    check(): Promise<HealthCheckResult>;
}
