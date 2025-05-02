import { ScheduleType } from "@/types";

export function convertScheduleArrayToRecord(
  scheduleArray: { day: string; start_time: string; end_time: string; closed: boolean }[]
): ScheduleType {
  return scheduleArray.reduce((acc, curr) => {
    const day = curr.day as keyof ScheduleType;
    acc[day] = {
      start: curr.start_time,
      end: curr.end_time,
      closed: curr.closed,
    };
    return acc;
  }, {} as ScheduleType);
}
