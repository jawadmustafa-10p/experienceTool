const fs = require("fs");
const hashMapForMonths = {
    "Jan": 1,
    "Feb": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "Aug": 8,
    "Sept": 9,
    "Oct": 10,
    "Nov": 11,
    "Dec": 12
}

const hashMapForPosition = {

    "AE": 15,
    "SDR": 12,
    "CSM": 29
}
function relativeDateFromToday(yearsAgo, monthsAgo, daysAgo) {
    const today = new Date();
    return new Date(
        today.getFullYear() - yearsAgo,
        today.getMonth() - monthsAgo,
        today.getDate() - daysAgo,
    );
}
let work_exp = {
    title: 'AE job',
    company: null,
    fromDate: null,
    toDate: null,
    isCurrentWorkplace: false,
    description: '',
    descriptionHTML: null,
    fromMonth: null,
    fromYear: null,
    toMonth: null,
    toYear: null,
    desiredPositionId: null,
    location: 'San Jose, California',
}
// {
//     title: 'AE job',
//     company: '10Pearls',
//     fromDate: automationHelperHandle
//       .relativeDateFromToday(6, 8, 0)
//       .toLocaleDateString('en-CA'),
//     toDate: automationHelperHandle.relativeDateFromToday(5, 9, 0).toLocaleDateString('en-CA'),
//     isCurrentWorkplace: false,
//     description: '',
//     descriptionHTML: null,
//     fromMonth: automationHelperHandle.relativeDateFromToday(6, 8, 0).getMonth() + 1,
//     fromYear: parseInt(automationHelperHandle.relativeDateFromToday(6, 8, 0).getFullYear()),
//     toMonth: automationHelperHandle.relativeDateFromToday(5, 9, 0).getMonth() + 1,
//     toYear: automationHelperHandle.relativeDateFromToday(5, 9, 0).getFullYear(),
//     desiredPositionId: 15,
//     location: 'San Jose, California',
//   },
function createExperienceObject(line) {
    line = line.trim();
    let elements = line.split("|");
    // console.log(elements);
    let position = elements[0]
    let timeline = elements[1]
    let company = elements[2]

    timeline = timeline.split("-")
    let startDate = timeline[0].trim();
    let endDate = timeline[1].trim();

    let startMonth = startDate.split(" ")[0];
    let endMonth = endDate.split(" ")[0];
    // console.log(startMonth)
    // console.log(endMonth)

    let startYear = startDate.split(" ")[1];
    let endYear = endDate.split(" ")[1];
    // console.log(startYear);
    // console.log(endYear);

    let yearsAgoStarting = 2023 - parseInt(startYear) - 1;
    let monthsAgoStarting = 12 - Math.abs(1 - hashMapForMonths[startMonth])
    // console.log(yearsAgoStarting);
    // console.log(monthsAgoStarting);

    let yearsAgoEnding = 2023 - parseInt(endYear) - 1;
    let monthsAgoEnding = 12 - Math.abs(1 - hashMapForMonths[endMonth])
    // console.log(yearsAgoEnding);
    // console.log(monthsAgoEnding);

    let work_exp_object = {...work_exp};
    // console.log(work_exp_object);
    work_exp_object["company"] = company.trim(" ");
    work_exp_object["fromDate"] = `automationHelperHandle.relativeDateFromToday(${yearsAgoStarting}, ${monthsAgoStarting}, ${0}).toLocaleDateString('en-CA')`,
    work_exp_object["fromYear"] = `parseInt(automationHelperHandle.relativeDateFromToday(${yearsAgoStarting}, ${monthsAgoStarting}, ${0}).getFullYear())`
    work_exp_object["fromMonth"] = `automationHelperHandle.relativeDateFromToday(${yearsAgoStarting}, ${monthsAgoStarting}, ${0}).getMonth() + 1`
    work_exp_object["toDate"] = `automationHelperHandle.relativeDateFromToday(${yearsAgoEnding}, ${monthsAgoEnding}, ${0}).toLocaleDateString('en-CA')`
    work_exp_object["toYear"] = `parseInt(automationHelperHandle.relativeDateFromToday(${yearsAgoEnding}, ${monthsAgoEnding}, ${0}).getFullYear())`
    work_exp_object["toMonth"] = `automationHelperHandle.relativeDateFromToday(${yearsAgoEnding}, ${monthsAgoEnding}, ${0}).getMonth() + 1`
    work_exp_object["desiredPositionId"] = hashMapForPosition[position.trim()];
    console.log(work_exp_object)
}

line = "AE | Aug 2020 - Sept 2021 | H&M"
// createExperienceObject(line);

try {
  const data = fs.readFileSync('./random/experiences.txt', 'utf8');
  console.log(data.split("\n")[0]);
  data.split("\n").forEach(element => {
    if (element == '') {

    }
    else{
        createExperienceObject(element)
    }
  })
} catch (err) {
  console.error(err);
}