const announcementsContainer = document.getElementById('announcements');

function fetchAnnouncements() {
    fetch('src/data/announcements.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data.announcements)) {
                displayAnnouncements(data.announcements);
            } else {
                console.error('Invalid announcements format', data);
                announcementsContainer.innerHTML = '<p class="main-paragraph-2">No announcements available.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching announcements:', error);
            announcementsContainer.innerHTML = '<p class="main-paragraph-2">Unable to load announcements at this time.</p>';
        });
}

function displayAnnouncements(announcements) {
    for(var i = 0; i < announcements.length; i++) {
        var announcement = announcements[i];
        var announcementElement = document.createElement('p');
        announcementElement.classList.add('main-paragraph-2');
        announcementElement.textContent = announcement;
        announcementsContainer.appendChild(announcementElement);
    }
}

fetchAnnouncements();