document.addEventListener("DOMContentLoaded", () => {

  let historyList = [];
  let index = -1;

  const iframe = document.getElementById("browser");
  const input = document.getElementById("url");
  const jakeDiv = document.getElementById("jake-info");

  console.log("Jake Browser listo");

  // Valor inicial
  input.value = "Jake";

  /* ===== BUSCADOR ===== */
  window.go = function () {
    const q = input.value.trim();
    const qLower = q.toLowerCase();
    if (!q) return;

    // JAKE / CHILENO → VAPORWAVE
    if (qLower.includes("jake") || qLower.includes("chileno")) {
      loadJakeProfile();
      return;
    }

    // SANTI / TAILS / MILES → VAPORWAVE
    if (
      qLower.includes("santi") ||
      qLower.includes("santicraft") ||
      qLower.includes("miles") ||
      qLower.includes("tails")
    ) {
      loadSantiProfile();
      return;
    }

    // MEME RESET → MEME
    if (
      qLower.includes("meme reset") ||
      qLower.includes("great meme reset") ||
      qLower.includes("reset de memes")
    ) {
      showMemeReset();
      return;
    }

    // URL directa
    if (qLower.startsWith("http://") || qLower.startsWith("https://")) {
      loadIframe(q);
      return;
    }

    // Búsqueda externa
    window.open(
      "https://duckduckgo.com/?q=" + encodeURIComponent(q),
      "_blank"
    );
  };

  /* ===== IFRAME (RETRO) ===== */
  function loadIframe(url) {
    resetInfoTheme();
    jakeDiv.classList.add("hidden");
    iframe.style.display = "block";
    iframe.src = url;

    historyList = historyList.slice(0, index + 1);
    historyList.push(url);
    index++;
  }

  /* ===== LIMPIAR TEMA INTERNO ===== */
  function resetInfoTheme() {
    jakeDiv.classList.remove("vaporwave", "meme");
  }

  /* ===== JAKE (VAPORWAVE) ===== */
  function loadJakeProfile() {
    iframe.style.display = "none";
    jakeDiv.classList.remove("hidden");
    resetInfoTheme();
    jakeDiv.classList.add("vaporwave");

    fetch("./jake.json")
      .then(res => res.json())
      .then(data => {
        jakeDiv.innerHTML = `
          <img src="${data.image}" class="jake-img">
          <h1>${data.name}</h1>
          <p>${data.description}</p>

          <h3>¿Qué hace?</h3>
          <ul>${data.skills.map(s => `<li>${s}</li>`).join("")}</ul>

          <h3>Proyectos</h3>
          <ul>${data.projects.map(p => `<li>${p}</li>`).join("")}</ul>
        `;
      })
      .catch(() => {
        jakeDiv.innerHTML = "<p>Error cargando perfil de Jake</p>";
      });
  }

  /* ===== SANTI / TAILS (VAPORWAVE) ===== */
  function loadSantiProfile() {
    iframe.style.display = "none";
    jakeDiv.classList.remove("hidden");
    resetInfoTheme();
    jakeDiv.classList.add("vaporwave");

    fetch("./santi.json")
      .then(res => res.json())
      .then(data => {
        jakeDiv.innerHTML = `
          <img src="${data.image}" class="jake-img">
          <h1>${data.name}</h1>
          <p>${data.description}</p>

          <h3>Personaje</h3>
          <img src="${data.characterImage}" class="jake-img">

          <h3>Habilidades</h3>
          <ul>${data.skills.map(s => `<li>${s}</li>`).join("")}</ul>

          <h3>Proyectos</h3>
          <ul>${data.projects.map(p => `<li>${p}</li>`).join("")}</ul>
        `;
      })
      .catch(() => {
        jakeDiv.innerHTML = "<p>Error cargando perfil de Santicraft</p>";
      });
  }

  /* ===== MEME RESET (MEME) ===== */
  function showMemeReset() {
    iframe.style.display = "none";
    jakeDiv.classList.remove("hidden");
    resetInfoTheme();
    jakeDiv.classList.add("meme");

    fetch("./meme-reset.json")
      .then(res => res.json())
      .then(data => {
        let html = `
          <h1>🌀 ${data.title}</h1>
          <p>${data.description}</p>
          <div class="meme-grid">
        `;

        data.memes.forEach(m => {
          html += `
            <div class="meme-card">
              <img src="${m.image}" onerror="this.src='./images/memes/missing.png'">
              <h4>${m.title}</h4>
              <span>${m.year}</span>
            </div>
          `;
        });

        html += "</div>";
        jakeDiv.innerHTML = html;
      })
      .catch(() => {
        jakeDiv.innerHTML = "<p>Error cargando memes</p>";
      });
  }

  /* ===== NAVEGACIÓN ===== */
  window.goBack = function () {
    if (index > 0) iframe.src = historyList[--index];
  };

  window.goForward = function () {
    if (index < historyList.length - 1) iframe.src = historyList[++index];
  };

  window.reloadPage = function () {
    if (iframe.src) iframe.src = iframe.src;
  };

});
