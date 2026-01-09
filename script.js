let history = [];
let index = -1;

const iframe = document.getElementById("browser");
const input = document.getElementById("url");
const jakeDiv = document.getElementById("jake-info");

// búsqueda reciente SIEMPRE Jake
input.value = "Jake";

function go() {
  let q = input.value.toLowerCase().trim();

  // detectar búsquedas relacionadas contigo
  if (q.includes("jake") || q.includes("chileno")) {
    showJake();
    return;
  }

  // si es URL
  if (q.startsWith("http")) {
    load(q);
  } else {
    load("https://duckduckgo.com/?q=" + encodeURIComponent(q));
  }
}

function load(url) {
  jakeDiv.classList.add("hidden");
  iframe.style.display = "block";

  iframe.src = url;
  history = history.slice(0, index + 1);
  history.push(url);
  index++;
}

function showJake() {
  fetch("jake.json")
    .then(res => res.json())
    .then(data => {
      iframe.style.display = "none";
      jakeDiv.classList.remove("hidden");

      jakeDiv.innerHTML = `
        <h1>${data.name} (${data.alias})</h1>
        <p>${data.description}</p>

        <h3>¿Qué hace?</h3>
        <ul>${data.skills.map(s => `<li>${s}</li>`).join("")}</ul>

        <h3>Proyectos</h3>
        <ul>${data.projects.map(p => `<li>${p}</li>`).join("")}</ul>
      `;
    });
}

function goBack() {
  if (index > 0) {
    index--;
    iframe.src = history[index];
  }
}

function goForward() {
  if (index < history.length - 1) {
    index++;
    iframe.src = history[index];
  }
}

function reloadPage() {
  iframe.src = iframe.src;
    }
