document.addEventListener("DOMContentLoaded", () => {

  let historyList = [];
  let index = -1;

  const iframe = document.getElementById("browser");
  const input = document.getElementById("url");
  const jakeDiv = document.getElementById("jake-info");

  console.log("SCRIPT CARGADO OK");
  document.body.style.outline = "2px solid lime";

  input.value = "Jake";

  // ===== BOTÓN GO =====
  window.go = function () {
    const q = input.value.trim();
    const qLower = q.toLowerCase();

    if (!q) return;

    // feedback visual (IMPORTANTE)
    input.style.background = "#222";

    // Jake interno
    if (qLower.includes("jake") || qLower.includes("chileno")) {
      showJake();
      return;
    }

    // detectar URL aunque no tenga http
    let url = q;
    if (!qLower.startsWith("http")) {
      if (q.includes(".")) {
        url = "https://" + q;
      } else {
        // búsqueda externa en nueva pestaña
        window.open(
          "https://duckduckgo.com/?q=" + encodeURIComponent(q),
          "_blank"
        );
        return;
      }
    }

    load(url);
  };

  // ===== CARGAR URL =====
  function load(url) {
    jakeDiv.classList.add("hidden");
    iframe.style.display = "block";

    iframe.src = url;

    historyList = historyList.slice(0, index + 1);
    historyList.push(url);
    index++;

    // si la página bloquea iframe, abrir fuera
    setTimeout(() => {
      try {
        if (!iframe.contentWindow || iframe.contentWindow.length === 0) {
          // muchas páginas bloquean iframe
          console.warn("Iframe bloqueado, abriendo en nueva pestaña");
          window.open(url, "_blank");
        }
      } catch (e) {
        // acceso bloqueado → abrir fuera
        window.open(url, "_blank");
      }
    }, 1500);
  }

  // ===== PERFIL JAKE =====
  function showJake() {
    iframe.style.display = "none";
    jakeDiv.classList.remove("hidden");
    jakeDiv.innerHTML = "<p>Cargando perfil…</p>";

    fetch("jake.json")
      .then(res => {
        if (!res.ok) throw new Error("No se pudo cargar jake.json");
        return res.json();
      })
      .then(data => {
        jakeDiv.innerHTML = `
          <h1>${data.name} (${data.alias})</h1>
          <p>${data.description}</p>

          <h3>¿Qué hace?</h3>
          <ul>${data.skills.map(s => `<li>${s}</li>`).join("")}</ul>

          <h3>Proyectos</h3>
          <ul>${data.projects.map(p => `<li>${p}</li>`).join("")}</ul>
        `;
      })
      .catch(() => {
        jakeDiv.innerHTML = "<p>Error cargando perfil.</p>";
      });
  }

  // ===== NAVEGACIÓN =====
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
