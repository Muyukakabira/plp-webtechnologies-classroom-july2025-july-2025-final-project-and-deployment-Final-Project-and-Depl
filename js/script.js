// Page Navigation
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });
  document.getElementById(pageId).classList.add("active");
}

// Mood Logging
let moods = JSON.parse(localStorage.getItem("moods")) || [];

function logMood(mood) {
  moods.push({ mood, date: new Date().toLocaleDateString() });
  localStorage.setItem("moods", JSON.stringify(moods));
  alert("Mood logged: " + mood);
  showPage('dashboard');
  renderChart();
}

// Render Chart
function renderChart() {
  const ctx = document.getElementById("moodChart").getContext("2d");
  const moodCounts = moods.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  if (window.moodChartInstance) {
    window.moodChartInstance.destroy();
  }

  window.moodChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(moodCounts),
      datasets: [{
        label: "Mood Count",
        data: Object.values(moodCounts),
        backgroundColor: [
          "#ffcd56", "#ff6384", "#36a2eb", "#4bc0c0", "#9966ff", "#ff9f40"
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

// Load chart if moods exist
if (moods.length > 0) {
  renderChart();
}
