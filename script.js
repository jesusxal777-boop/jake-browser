document.addEventListener("DOMContentLoaded", () => {

  let historyList = [];
  let index = -1;

  const iframe = document.getElementById("browser");
  const input = document.getElementById("url");
  const page = document.getElementById("internal-page");

  console.log("Jake Browser listo");

  input.value = "Jake";

  /* ===== BUSCADOR ===== */
  window.go = function () {
    const q = input.value.trim();
    const qLower = q.toLowerCase();
    if (!q) return;

    if (qLower.includes("jake") || qLower.includes("chileno")) {
      loadJakeProfile();
      return;
    }

    if (
      qLower.includes("meme reset") ||
      qLower.includes("great meme reset") ||
      qLower.includes("reset de memes")
    ) {
      showMemeReset();
      return;
    }

    if (qLower.startsWith("http://") || qLower.startsWith("https://")) {
      loadIframe(q);
      return;
    }

    window.open(
      "https://duckduckgo.com/?q=" + encodeURIComponent(q),
      "_blank"
    );
  };

  /* ===== IFRAME (RETRO) ===== */
  function loadIframe(url) {
    resetPage();
    page.classList.add("hidden");
    iframe.style.display = "block";
    iframe.src = url;

    historyList = historyList.slice(0, index + 1);
    historyList.push(url);
    index++;
  }

  /* ===== LIMPIAR PÁGINA ===== */
  function resetPage() {
    page.classList.remove("vaporwave", "meme");
  }

  /* ===== JAKE (VAPORWAVE) ===== */
  function loadJakeProfile() {
    iframe.style.display = "none";
    page.classList.remove("hidden");
    resetPage();
    page.classList.add("vaporwave");

    fetch("./jake.json")
      .then(res => res.json())
      .then(data => {
        page.innerHTML = `
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
        page.innerHTML = "<p>Error cargando perfil</p>";
      });
  }

  /* ===== MEME RESET (MEME) ===== */
  function showMemeReset() {
    iframe.style.display = "none";
    page.classList.remove("hidden");
    resetPage();
    page.classList.add("meme");

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
        page.innerHTML = html;
      })
      .catch(() => {
        page.innerHTML = "<p>Error cargando memes</p>";
      });
  }

  /* ===== NAVEGACIÓN ===== */
  window.goBack = () => {
    if (index > 0) iframe.src = historyList[--index];
  };

  window.goForward = () => {
    if (index < historyList.length - 1) iframe.src = historyList[++index];
  };

  window.reloadPage = () => {
    if (iframe.src) iframe.src = iframe.src;
  };

});
