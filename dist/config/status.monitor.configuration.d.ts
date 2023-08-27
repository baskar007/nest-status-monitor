import { HealthCheckConfiguration } from './health.check.configuration';
import { SpansConfiguration } from './spans.configuration';
import { ChartVisibilityConfiguration } from './chart.visibility.configuration';
export interface StatusMonitorConfiguration {
    path: string;
    port: number;
    pageTitle: string;
    logo: string;
    ignoreStartsWith: string;
    healthChecks: HealthCheckConfiguration[];
    spans: SpansConfiguration[];
    chartVisibility: ChartVisibilityConfiguration;
}
