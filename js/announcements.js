const announcementsContainer = document.getElementById('announcements');

function fetchAnnouncements() {
    fetch('/data/announcements.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            const announcementsArray = Object.entries(data.announcements || {})
                .map(([key, item]) => ({ id: Number(key), ...item }))
                .sort((a, b) => b.id - a.id);

            const lastUpdated = data.meta?.lastUpdated;
            displayAnnouncements(announcementsArray, lastUpdated);
        })
        .catch(error => {
            console.error('Error fetching announcements:', error);
            announcementsContainer.innerHTML = 
                '<p class="main-paragraph-2">Unable to load announcements at this time.</p>';
        });
}

function displayAnnouncements(announcements, lastUpdated) {
    announcementsContainer.innerHTML = '';

    if (announcements.length === 0) {
        announcementsContainer.innerHTML += 
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

    if (lastUpdated) {
        const date = new Date(lastUpdated);
        const formatted = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const metaDiv = document.createElement('p');
        metaDiv.classList.add('last-updated');
        metaDiv.textContent = `Last updated: ${formatted}`;
        announcementsContainer.appendChild(metaDiv);
    }
}

fetchAnnouncements();