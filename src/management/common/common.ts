import { QueryManagementDto } from "../dto";
import * as moment from "moment";
export const getRangeDateDefault = (): QueryManagementDto => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setUTCHours(0, 0, 0, 0);
  startDate.setTime(startDate.getTime() - getDayOffset(7));
  endDate.setTime(endDate.getTime() + getDayOffset());
  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
};

export const getDayOffset = (day = 1): number => {
  return 3600 * 1000 * 24 * day;
};
