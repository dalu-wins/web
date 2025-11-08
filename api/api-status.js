document.addEventListener('DOMContentLoaded', () => {
  async function updateApiStatus() {
    const statusDot = document.getElementById('sc-news-api-status-dot');
    if (!statusDot) return;

    try {
      const res = await fetch('https://sc-news.api.dalu-wins.de/patch-notes/status');
      const data = await res.json();

      if (data.status === 'idle') {
        statusDot.style.backgroundColor = 'green';
        statusDot.title = 'Scraper is idle';
      } else if (data.status === 'active') {
        statusDot.style.backgroundColor = 'yellow';
        statusDot.title = 'Scraper is active';
      } else {
        statusDot.style.backgroundColor = 'gray';
        statusDot.title = 'Unknown';
      }
    } catch (e) {
      statusDot.style.backgroundColor = 'gray';
      statusDot.title = 'Error fetching status';
      console.error(e);
    }
  }

  // initial
  updateApiStatus();
  // alle 1 Sekunden
  setInterval(updateApiStatus, 1000);
});
