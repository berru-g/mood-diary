document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("journalForm");
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const mood = document.getElementById("mood").value;
    const satisfaction = document.getElementById("satisfaction").value;
    const note = document.getElementById("note").value;

    const entry = {
      date: new Date().toISOString(),
      mood,
      satisfaction,
      note,
    };

    // Code pour enregistrer l'entrée dans le navigateur ou l'envoyer vers GitHub
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("journalForm");
  let data = JSON.parse(localStorage.getItem("journalData")) || [];

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const mood = document.getElementById("mood").value;
    const satisfaction = document.getElementById("satisfaction").value;
    const note = document.getElementById("note").value;

    const entry = {
      date: new Date().toISOString(),
      mood,
      satisfaction,
      note,
    };

    data.push(entry); // Ajoute l'entrée aux données

    // Enregistre les données dans le localStorage
    localStorage.setItem("journalData", JSON.stringify(data));

    // Met à jour le graphique avec les nouvelles données
    updateChart();
  });

  // Fonction pour mettre à jour le graphique
  function updateChart() {
    const dates = data.map(entry => entry.date);
    const moods = data.map(entry => entry.mood);
    const satisfactions = data.map(entry => entry.satisfaction);

const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Humeur",
          data: moods,
          borderColor: "rgba(75, 192, 192, 1)",
          fill: false,
        },
        {
          label: "Satisfaction",
          data: satisfactions,
          borderColor: "rgba(255, 99, 132, 1)",
          fill: false,
        },
      ],
    },
    options: {
      tooltips: {
        callbacks: {
          label: function(context) {
            const index = context.dataIndex;
            const note = data[index].note;
            return "Note: " + note;
          }
        }
      }
    }
  });
}

  // Charge le graphique avec les données existantes lors du chargement de la page
  updateChart();
});
