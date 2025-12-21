const calendar = document.getElementById("event-calendar");
const dates = document.getElementsByClassName("cal-day");
const event_div = document.getElementById("event-details");
const event_details = document.getElementById("event-details-content");
const event_details_heading = document.getElementById("event-details-heading");
const calendar_heading = document.getElementById("cal-heading");

const sundayHeader = document.getElementById("sunday");
const mondayHeader = document.getElementById("monday");
const tuesdayHeader = document.getElementById("tuesday");
const wednesdayHeader = document.getElementById("wednesday");
const thursdayHeader = document.getElementById("thursday");
const fridayHeader = document.getElementById("friday");
const saturdayHeader = document.getElementById("saturday");

var eventDetails;
var today = new Date();
var month = today.getMonth();
var year = today.getFullYear();

var events = {
    "1": "Weekly troop meeting, 7:00 PM",
    "2": "",
    "3": "",
    "4": "",
    "5": "",
    "6": "",
    "7": "",
    "8": "Weekly troop meeting, 7:00 PM",
    "9": "",
    "10": "",
    "11": "",
    "12": "",
    "13": "",
    "14": "",
    "15": "Weekly troop meeting, 7:00 PM",
    "16": "",
    "17": "",
    "18": "",
    "19": "Annual lock-in at Messiah Lutheran Church 7:00 PM to 9:00 AM",
    "20": "Pick up your child at 9:00 AM from our lock-in at Messiah Lutheran Church",
    "21": "",
    "22": "",
    "23": "",
    "24": "",
    "25": "Merry Christmas!🎄",
    "26": "",
    "27": "",
    "28": "",
    "29": "",
    "30": "",
    "31": "Happy New Years! 🎉",
}

function getSuffixOfDate(date) {
  switch(date) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    case 21: return "st";
    case 22: return "nd";
    case 23: return "rd";
    case 31: return "st";
    default: return "th";
  }
}

function displayEventDetails(event) {
  const eventId = event.target.getAttribute("data-date-id");
  if(events[eventId] != "") {
    eventDetails = events[eventId];
  } else {
    eventDetails = "No events scheduled for this day";
  }
  event_details.innerHTML = eventDetails;
  if(event.target.id == "today") {
    event_details_heading.innerHTML = "Today, " + convertMonthToString(month) + " " + eventId + getSuffixOfDate(eventId);
  } else {
    event_details_heading.innerHTML = convertMonthToString(month) + " " + eventId + getSuffixOfDate(eventId);
  }
}

function addEventListeners() {
    for (let i = 0; i < dates.length; i++) {
        dates[i].addEventListener("click", displayEventDetails);
    }
    window.addEventListener("resize", setHeaderWidth);
}

function convertMonthToString(month) {
  switch(month) {
    case 0: return "January";
    case 1: return "February";
    case 2: return "March";
    case 3: return "April";
    case 4: return "May";
    case 5: return "June";
    case 6: return "July";
    case 7: return "August";
    case 8: return "September";
    case 9: return "October";
    case 10: return "November";
    case 11: return "December";
  }
}

function setMonth(month, year) {
  calendar_heading.innerHTML = convertMonthToString(month) + " " + year;
}

function getToday() {
  for (let i = 0; i < dates.length; i++) {
    if(dates[i].getAttribute("data-date-id") == today.getDate()) {
      dates[i].id = "today";
    }
  }
}

function setHeaderWidth() {
  const width = window.innerWidth;

  if(width <= 768) {
    sundayHeader.innerHTML = "S";
    mondayHeader.innerHTML = "M";
    tuesdayHeader.innerHTML = "T";
    wednesdayHeader.innerHTML = "W";
    thursdayHeader.innerHTML = "Th";
    fridayHeader.innerHTML = "F";
    saturdayHeader.innerHTML = "Sa";
  } else {
    sundayHeader.innerHTML = "Sun.";
    mondayHeader.innerHTML = "Mon.";
    tuesdayHeader.innerHTML = "Tue.";
    wednesdayHeader.innerHTML = "Wed.";
    thursdayHeader.innerHTML = "Thu.";
    fridayHeader.innerHTML = "Fri.";
    saturdayHeader.innerHTML = "Sat.";
  }
}

setHeaderWidth();

addEventListeners();
setMonth(month, year);
getToday();