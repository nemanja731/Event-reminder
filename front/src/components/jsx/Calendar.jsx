import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import "../css/Calendar.css";

const Calendar = () => {
  return (
    <div className="div-calendar">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation="portrait"
          autoFocus={true}
          defaultValue={dayjs(new Date())}
        />
      </LocalizationProvider>
    </div>
  );
};

export default Calendar;
