document.addEventListener('DOMContentLoaded', () => {
  async function updateApiStatus() {
    const statusDot = document.getElementById('sc-news-api-status-dot');
    if (!statusDot) return;

    try {
      const res = await fetch('https://sc-news.api.dalu-wins.de/patch-notes/status');
      const data = await res.json();

      if (data.status === 'active') {
        statusDot.style.backgroundColor = 'green';
        statusDot.title = 'Active';
      } else if (data.status === 'idle') {
        statusDot.style.backgroundColor = 'yellow';
        statusDot.title = 'Idle';
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
  // alle 30 Sekunden
  setInterval(updateApiStatus, 30000);
});
