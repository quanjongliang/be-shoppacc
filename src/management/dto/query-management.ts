export interface QueryManagementDto {
  startDate: Date | string | number;
  endDate: Date | string | number;
}

export interface QueryManagementResult {
  countRefund: number;
  countSold: number;
  countCreated: number;
}
