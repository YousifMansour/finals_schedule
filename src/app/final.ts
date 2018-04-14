export class Final {
  fullLine: string[];
  courseName: string;
  courseNumber: string;
  section: string;
  roomName: string;
  roomNumber: string[];
  weekDay: string;
  monthName: string;
  monthNumber: string;
  year: string;
  time: string;
  amPm: string;
  id: any;
  pageNumber: number;
  rowNumber: number;

  constructor(
      fullLine: string[], courseName: string, courseNumber: string,
      section: string, roomName: string, roomNumber: string[], weekDay: string,
      monthName: string, monthNumber: string, year: string, time: string,
      amPm: string, pageNumber: number, rowNumber: number) {
    this.fullLine = fullLine;
    this.courseName = courseName;
    this.courseNumber = courseNumber;
    this.section = section;
    this.roomName = roomName;
    this.roomNumber = roomNumber;
    this.weekDay = weekDay;
    this.monthName = monthName;
    this.monthNumber = monthNumber;
    this.year = year;
    this.time = time;
    this.amPm = amPm;
    this.pageNumber = pageNumber;
    this.rowNumber = rowNumber;
    this.id = new Date().getTime();
    if (this.section == '' || this.section == undefined) this.section = '-';
  }
}