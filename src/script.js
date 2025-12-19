
// Dates in calendar.html that can be clicked
const clickableDates = document.getElementsByClassName("clickable-date");
const dateContentDiv = document.getElementById("date-content");
const eventContentDiv = document.getElementById("event-content");

// Date
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

const eventContents = {
    "1": "Weekly Troop Meeting at 7:00 PM.",
    "2": "",
    "3": "",
    "4": "",
    "5": "",
    "6": "",
    "7": "",
    "8": "Weekly Troop Meeting at 7:00 PM.",
    "9": "",
    "10": "",
    "11": "",
    "12": "",
    "13": "",
    "14": "",
    "15": "Weekly Troop Meeting at 7:00 PM.",
    "16": "",
    "17": "",
    "18": "",
    "19": "Annual Troop lock-in - 7:00 PM to 9:00 AM the following day.",
    "20": "Annual Troop lock-in - pick-up your child at 9:00 AM.",
    "21": "",
    "22": "Weekly Troop Meeting at 7:00 PM.",
    "23": "",
    "24": "",
    "25": "Enjoy your Christmas!",
    "26": "",
    "27": "",
    "28": "",
    "29": "Weekly Troop Meeting at 7:00 PM.",
    "30": "",
    "31": "Wishing everyone a safe and happy New Year!"
}

function numberToMonth(num) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[num];
}

function numberToDate(num) {
    switch (num) {
        case 1: return "1st";
        case 2: return "2nd";
        case 3: return "3rd";
        case 21: return "21st";
        case 22: return "22nd";
        case 23: return "23rd";
        case 31: return "31st";
        default: return num + "th";
    }
}

// Handle click event on a date
function handleDateClick(event) {
    dateContentDiv.textContent = numberToMonth(currentMonth) + " " + numberToDate(parseInt(event.target.textContent.trim())) + ", " + currentYear;
    eventContentDiv.textContent = eventContents[event.target.textContent.trim()] || "No events scheduled for this date.";
    // Show the card with a fade-in effect
    const card = dateContentDiv.parentElement;
    card.style.opacity = 1;
}

// Assign IDs and event listeners to clickable dates
Array.from(clickableDates).forEach(td => {
    const dateText = td.textContent.trim();
    if (dateText && !td.id) td.id = `d${dateText}`;
    td.addEventListener('click', handleDateClick);
});

// Highlight today's date if present in the calendar
const todayElement = document.getElementById(`d${currentDay}`);
if (todayElement) {
    todayElement.classList.add('today');
} 