const announcementsContainer = document.getElementById('announcements');

function fetchAnnouncements() {
    fetch('src/data/announcements.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            const announcementsArray = Object.entries(data.announcements)
                .map(([key, item]) => ({ id: Number(key), ...item }))
            displayAnnouncements(announcementsArray);
        })
        .catch(error => {
            console.error('Error fetching announcements:', error);
            announcementsContainer.innerHTML = 
                '<p class="main-paragraph-2">Unable to load announcements at this time.</p>';
        });
}

function displayAnnouncements(announcements) {
    announcementsContainer.innerHTML = '';

    if (announcements.length === 0) {
        announcementsContainer.innerHTML = 
            '<p class="main-paragraph-2">No announcements at this time.</p>';
        return;
    }

    for (const ann of announcements) {
        const item = document.createElement('div');
        item.classList.add('announcement-item');

        if (ann.tag) {
            const tag = document.createElement('span');
            tag.classList.add('announcement-tag', `tag-${ann.tag}`);
            tag.textContent = ann.tag.charAt(0).toUpperCase() + ann.tag.slice(1);
            item.appendChild(tag);
        }

        const text = document.createElement('p');
        text.classList.add('main-paragraph-2');
        text.textContent = ann.data;
        item.appendChild(text);

        announcementsContainer.appendChild(item);
    }
}

fetchAnnouncements();