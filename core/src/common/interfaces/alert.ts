export interface IAlert {
  _id?: string;
  rule_id: string;
  sensor_type: string;
  actual_value: number;
  optimal_range: { min: number; max: number };
  deviation_percentage: number;
  deviation_type: "above_max" | "below_min";
  notify: string[]; // ["email", "in-app", "sms"]
  severity: "low" | "medium" | "high" | "critical" | "catastrophic";
  triggered_at: Date;
  telemetry_data: any; // The telemetry data that triggered the alert
  acknowledged: boolean;
  acknowledged_at?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISensorOptimalRange {
  sensor_type: string;
  min: number;
  max: number;
  unit?: string;
  enabled: boolean;
}

export interface IDeviationThreshold {
  severity: "low" | "medium" | "high" | "critical" | "catastrophic";
  deviation_percentage: number; // e.g., 10 for 10% deviation
  notify: string[];
}
