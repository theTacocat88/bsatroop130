const leftGalleryButton = document.getElementById("left-button-gallery");
const rightGalleryButton = document.getElementById("right-button-gallery");
const galleryItem = document.getElementById("gallery-item");

const upcomingEventDiv = document.getElementById("next-event");

var gallery = [
  "<img src='https://placehold.co/900x600?text=Placeholder+1' loading='eager' alt='1'/>",
  "<img src='https://placehold.co/900x600?text=Placeholder+2' loading='eager' alt='2'/>",
  "<img src='https://placehold.co/900x600?text=Placeholder+3' loading='eager' alt='3'/>",
  "<img src='https://placehold.co/900x600?text=Placeholder+4' loading='eager' alt='4'/>",
  "<img src='https://placehold.co/900x600?text=Placeholder+5' loading='eager' alt='5'/>",
  "<img src='https://placehold.co/900x600?text=Placeholder+6' loading='eager' alt='6'/>",
  "<img src='https://placehold.co/900x600?text=Placeholder+7' loading='eager' alt='7'/>",
  "<img src='https://placehold.co/900x600?text=Placeholder+8' loading='eager' alt='8'/>",
  "<img src='https://placehold.co/900x600?text=Placeholder+9' loading='eager' alt='9'/>",
  "<img src='https://placehold.co/900x600?text=Placeholder+10' loading='eager' alt='10'/>",
  "<img src='https://placehold.co/900x600?text=Placeholder+11' loading='eager' alt='11'/>",
  "<img src='https://placehold.co/900x600?text=Placeholder+12' loading='eager' alt='12'/>",
  "<img src='https://placehold.co/900x600?text=Placeholder+13' loading='eager' alt='13'/>",
  "<img src='https://placehold.co/900x600?text=Placeholder+14' loading='eager' alt='14'/>",
  "<img src='https://placehold.co/900x600?text=Placeholder+15' loading='eager' alt='15'/>"
];

function fetchEvents() {
  return fetch("/data/events.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("events.json did not respond with a successful status");
      }
      return response.json();
    })
    .then((data) => {
      events = data;
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

function addEventListeners() {
    rightGalleryButton.addEventListener("click", rightGalleryButtonClicked);
    leftGalleryButton.addEventListener("click", leftGalleryButtonClicked);
}

function rightGalleryButtonClicked() {
  galleryItem.innerHTML = gallery[index + 1];
  index++;
  if (index >= gallery.length) {
    galleryItem.innerHTML = gallery[0];
    index = 0;
  }
}

function leftGalleryButtonClicked() {
  galleryItem.innerHTML = gallery[index - 1];
  index--;
  if (index < 0) {
    galleryItem.innerHTML = gallery[gallery.length - 1];
    index = gallery.length - 1;
  }
}

function getUpcomingEvent() {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth();
  var currentDay = currentDate.getDate();

  var closestEvent = null;
  var closestEventDate = null;
  var isEventClose = false;

  var localEvents =
    events[String(currentYear)][String(convertMonthToString(currentMonth))];

  for (i in localEvents) {
    if (i < currentDay) {
      var isEventClose = false;
    } else if (currentDay >= i + 7 || currentDay <= i - 7) {
      isEventClose = false;
    } else if (localEvents[i]["data"] == "" || localEvents[i]["data"] == null) {
      isEventClose = false;
    } else {
      isEventClose = true;

      closestEvent = localEvents[i]["data"];

      closestEventDate = i;

      break;
    }
  }

  if (closestEvent != null) {
    const headerText = document.createElement("h2");
    headerText.classList = "white-heading";
    headerText.innerHTML = "Next Event";
    upcomingEventDiv.appendChild(headerText);

    const dateHeader = document.createElement("h3");
    dateHeader.innerHTML =
      convertMonthToString(currentMonth) +
      " " +
      closestEventDate +
      getSuffixOfDate(closestEventDate);
    dateHeader.classList = "small-white-heading";

    const eventInfo = document.createElement("p");
    eventInfo.innerHTML = closestEvent;
    eventInfo.classList = "main-paragraph";

    upcomingEventDiv.innerHTML = "";
    upcomingEventDiv.appendChild(headerText);
    upcomingEventDiv.appendChild(dateHeader);
    upcomingEventDiv.appendChild(eventInfo);
  } else {
    upcomingEventDiv.innerHTML = "";
    upcomingEventDiv.innerHTML =
      "<h3 class='white-heading'>No upcoming events</h3>";
  }
}

function convertMonthToString(month) {
  switch (month) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
  }
}

function getSuffixOfDate(date) {
  switch (date) {
    case "1":
      return "st";
    case "2":
      return "nd";
    case "3":
      return "rd";
    case "21":
      return "st";
    case "22":
      return "nd";
    case "23":
      return "rd";
    case "31":
      return "st";
    default:
      return "th";
  }
}

addEventListeners();
galleryItem.innerHTML = gallery[0];
var index = 0;

fetchEvents()
  .then((data) => {
    events = data;
    getUpcomingEvent();
  })
  .catch((err) => {
    console.error("Failed to load events:", err);
    upcomingEventDiv.innerHTML =
      "<h3 class='white-heading'>Events unavailable</h3>";
  });
