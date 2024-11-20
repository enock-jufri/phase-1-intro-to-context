// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour, timeInEvents = [], timeOutEvents = []]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: timeInEvents,
        timeOutEvents: timeOutEvents
    }
}

function createEmployeeRecords(array) {
    const records = []
    array.forEach(element => {
        const store = createEmployeeRecord(element)
        records.push(store)
    });
    return records
}


function createTimeInEvent(employeeRecords, dateStamp) {
    const [date, strHour] = dateStamp.split(" ")
    const hour = parseInt(strHour, 10)
    employeeRecords.timeInEvents.push({ type: "TimeIn", date: date, hour: hour })
    return employeeRecords
}

function createTimeOutEvent(employeeRecords, dateStamp) {

    const [date, strHour] = dateStamp.split(" ")
    const hour = parseInt(strHour, 10)
    employeeRecords.timeOutEvents.push({ type: "TimeOut", date: date, hour: hour })
    return employeeRecords

}

function hoursWorkedOnDate(employeeRecords, date) {
    const time = []
    employeeRecords.timeInEvents.forEach(element => {
        if (element.date === date) {
            const inHour = parseInt(element.hour, 10)
            time.push(inHour)
        }
    })
    employeeRecords.timeOutEvents.forEach(element => {
        if (element.date === date) {
            const outHour = parseInt(element.hour, 10)
            time.push(outHour)
        }
    })

    const hoursWorked = time[1] - time[0]
    return hoursWorked * 0.01
}

function wagesEarnedOnDate(employeeRecords, date) {
    return hoursWorkedOnDate(employeeRecords, date) * employeeRecords.payPerHour
}
function allWagesFor(employeeRecords) {
    const hoursWorked = []
    employeeRecords.timeInEvents.forEach(element => {
        const hours = wagesEarnedOnDate(employeeRecords, element.date)
        hoursWorked.push(hours)
    })
    const total = hoursWorked.reduce((accumulator, el) => {
        return accumulator + el
    }, 0)
    return total

}
function calculatePayroll(employees) {
    let grandTotalOwed = employees.reduce((m, e) => m + allWagesFor(e), 0)
    return grandTotalOwed
}






