document.addEventListener("DOMContentLoaded", () => {

  let historyList = [];
  let index = -1;

  const iframe = document.getElementById("browser");
  const input = document.getElementById("url");
  const jakeDiv = document.getElementById("jake-info");

  // verificación visible (para que sepas que sí cargó)
  console.log("SCRIPT CARGADO OK");
  document.body.style.outline = "2px solid lime";

  // búsqueda reciente SIEMPRE Jake
  input.value = "Jake";

  window.go = function () {
    let q = input.value.trim();
    let qLower = q.toLowerCase();

    // Jake / Chileno → perfil interno
    if (qLower.includes("jake") || qLower.includes("chileno")) {
      showJake();
      return;
    }

    // URL directa
    if (qLower.startsWith("http")) {
      load(q);
    } else {
      // búsqueda externa (nunca bloqueada)
      location.href =
        "https://duckduckgo.com/?q=" + encodeURIComponent(q);
    }
  };

  function load(url) {
    jakeDiv.classList.add("hidden");
    iframe.style.display = "block";
    iframe.src = url;

    historyList = historyList.slice(0, index + 1);
    historyList.push(url);
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

  window.goBack = function () {
    if (index > 0) {
      index--;
      iframe.src = historyList[index];
    }
  };

  window.goForward = function () {
    if (index < historyList.length - 1) {
      index++;
      iframe.src = historyList[index];
    }
  };

  window.reloadPage = function () {
    iframe.src = iframe.src;
  };

});
