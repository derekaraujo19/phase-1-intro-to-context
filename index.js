// Your code here

function createEmployeeRecord(employee) {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employees) {
  return employees.map(createEmployeeRecord);
}

function createTimeInEvent(record, datestamp) {
  record.timeInEvents.push({
    type: "TimeIn",
    hour: Number(datestamp.slice(11)),
    date: datestamp.slice(0, 10)
  })
  return record;
}

function createTimeOutEvent(record, datestamp) {
  record.timeOutEvents.push({
    type: "TimeOut",
    hour: Number(datestamp.slice(11)),
    date: datestamp.slice(0, 10)
  })
  return record;
}

function hoursWorkedOnDate(record, matchDate) {

  for (let i = 0; i < record.timeInEvents.length; i++) {
    if (record.timeInEvents[i].date === matchDate) {
      const difference = record.timeOutEvents[i].hour - record.timeInEvents[i].hour;
      if (difference < 1000) {
        const slicedDiff = difference.toString().slice(0,1);
        return Number(slicedDiff);
      } else {
        const slicedDiff = difference.toString().slice(0,2);
        return Number(slicedDiff);
      }
    }
  }
}

function wagesEarnedOnDate(record, matchDate) {
  const hours = hoursWorkedOnDate(record, matchDate);
  return hours * record.payPerHour;
}

function allWagesFor(record) {
  var sum = 0;
  for (let i = 0; i < record.timeInEvents.length; i++) {
    var wagesPerDate = wagesEarnedOnDate(record, record.timeInEvents[i].date);
    sum += wagesPerDate;
  }
  return sum;
}

// TO REVISIT -> HOW TO DO allWagesFor USING REDUCE:
// const timeInEvents = record.timeInEvents;
// const allWagesFor = timeInEvents.reduce(wagesEarnedOnDate(sum, i){
//   return sum += i.date;
// }, 0)

function calculatePayroll(records){
  var sum = 0;
  for (let i = 0; i < records.length; i++) {
    var totalPayroll = allWagesFor(records[i]);
    sum += totalPayroll;
  }
  return sum;
}