export interface ISensorOptimalRange {
  sensor_type: string
  min: number
  max: number
  unit: string
  enabled: boolean
}

export interface IDeviationThreshold {
  severity: string
  deviation_percentage: number
  notify: string[]
}

export interface IMachineRule {
  id: string
  machineId: string
  machineName: string
  sensorOptimalRanges: ISensorOptimalRange[]
  deviationThresholds: IDeviationThreshold[]
  createdAt: string
  updatedAt: string
  enabled: boolean
}

export interface ICreateRuleForm {
  machineId: string
  machineName: string
  sensorOptimalRanges: ISensorOptimalRange[]
  deviationThresholds: IDeviationThreshold[]
}
