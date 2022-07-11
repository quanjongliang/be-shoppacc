import { QueryManagementDto } from "../dto";
import * as moment from "moment";
export const getRangeDateDefault = (): QueryManagementDto => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  startDate.setTime(startDate.getTime() - getDayOffset(7));
  endDate.setHours(23, 59, 59, 999);
  return {
    startDate,
    endDate,
  };
};

export const addDateToDate = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setTime(newDate.getTime() + getDayOffset());
  return newDate;
};

export const getStartAndEndOfDate = (date: Date): QueryManagementDto => {
  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);
  return {
    startDate,
    endDate,
  };
};

export const getDayOffset = (day = 1): number => {
  return 3600 * 1000 * 24 * day;
};
