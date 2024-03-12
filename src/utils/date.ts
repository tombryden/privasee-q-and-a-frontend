import dayjs from "dayjs";

export const formatDateTime = (dateISOString: string) =>
  dayjs(dateISOString).format("DD/MM/YYYY HH:mm");
