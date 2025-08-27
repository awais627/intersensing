export interface IAlert {
  _id?: string;
  rule_id: string;
  sensor_type: string;
  threshold: number;
  operator: ">=" | "<=" | ">" | "<" | "==" | "!=";
//   persistence: string; // e.g., "30s", "5m", "1h"
  notify: string[]; // ["email", "in-app", "sms"]
  severity: "low" | "medium" | "high" | "critical" | "warning";
  triggered_at: Date;
  telemetry_data: any; // The telemetry data that triggered the alert
  resolved: boolean;
  resolved_at?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAlertRule {
  rule_id: string;
  sensor_type: string;
  threshold: number;
  operator: ">=" | "<=" | ">" | "<" | "==" | "!=";
//   persistence: string;
  notify: string[];
  severity: "low" | "medium" | "high" | "critical" | "warning";
  enabled: boolean;
}
