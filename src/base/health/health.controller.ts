import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { Public } from '../decorator/public.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Public()
@Controller('health')
export class HealthController {
  constructor(
    private readonly http: HttpHealthIndicator,
    private readonly health: HealthCheckService,
  ) {}

  @ApiOperation({ summary: 'Check health' })
  @Get()
  @HealthCheck()
  checkHealth() {
    return this.health.check([
      () => this.http.pingCheck('google', 'https://www.google.com'),
    ]);
  }
}
