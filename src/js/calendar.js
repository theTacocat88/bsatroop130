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

var events;

function fetchEvents() {
  return fetch('src/data/events.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('events.json did not respond with a successful status');
      }
      return response.json();
    })
    .then(data => {
      events = data;
      return data;
    })
    .catch(error => {
      console.error('Error fetching data from events.json: ', error);
      throw error;
    });
}

function getSuffixOfDate(date) {
  switch(date) {
    case "1": return "st";
    case "2": return "nd";
    case "3": return "rd";
    case "21": return "st";
    case "22": return "nd";
    case "23": return "rd";
    case "31": return "st";
    default: return "th";
  }
}

function displayEventDetails(event) {
  const eventId = event.target.getAttribute("data-date-id");
  if(events[String(year)][convertMonthToString(month)][String(eventId)]["data"] != "") {
    eventDetails = events[String(year)][convertMonthToString(month)][String(eventId)]["data"];
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

function buildCalendar() {
  const body = document.getElementById("calendar-body");
  if (!body) return;
  body.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  let dayCounter = 1;
  let nextMonthDay = 1;

  const rowsNeeded = Math.max(5, Math.ceil((firstDay + daysInMonth) / 7));
  for (let week = 0; week < rowsNeeded; week++) {
    const tr = document.createElement("tr");
    tr.className = "cal-row";

    for (let dow = 0; dow < 7; dow++) {
      const td = document.createElement("td");

      if (week === 0 && dow < firstDay) {
        td.className = "prev-month";
        td.textContent = String(daysInPrevMonth - firstDay + 1 + dow);
      } else if (dayCounter > daysInMonth) {
        td.className = "next-month";
        td.textContent = String(nextMonthDay++);
      } else {
        td.className = "cal-day";
        td.setAttribute("data-date-id", String(dayCounter));
        td.textContent = String(dayCounter);

        if (events) {
          const monthName = convertMonthToString(month);
          const dayEvents = events[String(year)]?.[monthName]?.[String(dayCounter)] || "";
          if (dayEvents && dayEvents !== "") {
            const count = 1;
            const badge = document.createElement("span");
            badge.classList.add("event-count-badge");
            badge.textContent = count;
            td.appendChild(badge);
          }
        }

        dayCounter++;
      }

      tr.appendChild(td);
    }

    body.appendChild(tr);
  }
}

function addEventCounts() {
  if (!events) return;

  const monthName = convertMonthToString(month);

  for (let i = 0; i < dates.length; i++) {
    const dayStr = dates[i].getAttribute("data-date-id");
    const dayObj = events[String(year)]?.[monthName]?.[dayStr];

    if (dayObj && dayObj.data && dayObj.data.trim() !== "") {
      if (!dates[i].querySelector(".event-count-badge")) {
        const badge = document.createElement("span");
        badge.classList.add("event-count-badge");
        switch(dayObj.tag.trim().toLowerCase()) {
          case "meeting":
            badge.style.background = "#4CAF50";
            break;
          case "event":
            badge.style.background = "#2196F3";
            break;
          case "holiday":
            badge.style.background = "#ffd622ff";
            break;
          default:
            badge.style.background = "#FF5722";
        }

        dates[i].appendChild(badge);
      }
    }
  }
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
setMonth(month, year);
buildCalendar();

addEventListeners();
getToday();

fetchEvents().then(() => {
  addEventCounts();
}).catch(err => {
  console.error('Error loading events:', err);
});