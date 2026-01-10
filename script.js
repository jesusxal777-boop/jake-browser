document.addEventListener("DOMContentLoaded", () => {

  let historyList = [];
  let index = -1;

  const iframe = document.getElementById("browser");
  const input = document.getElementById("url");
  const jakeDiv = document.getElementById("jake-info");
  const sideMenu = document.getElementById("side-menu");

  console.log("Jake Browser listo");

  // Tema por defecto
  setTheme("light");

  // Texto inicial
  input.value = "Jake";

  window.go = function () {
    const q = input.value.trim();
    const qLower = q.toLowerCase();
    if (!q) return;

    // PERFIL JAKE (desde JSON)
    if (qLower.includes("jake") || qLower.includes("chileno")) {
      loadJakeProfile();
      return;
    }

    // MEME RESET
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

    // búsqueda externa
    window.open(
      "https://duckduckgo.com/?q=" + encodeURIComponent(q),
      "_blank"
    );
  };

  function loadIframe(url) {
    jakeDiv.classList.add("hidden");
    iframe.style.display = "block";
    iframe.src = url;

    historyList = historyList.slice(0, index + 1);
    historyList.push(url);
    index++;
  }

  /* ===== JAKE DESDE JSON ===== */
  function loadJakeProfile() {
    iframe.style.display = "none";
    jakeDiv.classList.remove("hidden");

    fetch("./jake.json")
      .then(res => res.json())
      .then(data => {
        let html = `
          <img src="${data.image}" class="jake-img">
          <h1>${data.name}</h1>
          <p>${data.description}</p>
          <h3>¿Qué hace?</h3>
          <ul>
            ${data.skills.map(s => `<li>${s}</li>`).join("")}
          </ul>
          <h3>Proyectos</h3>
          <ul>
            ${data.projects.map(p => `<li>${p}</li>`).join("")}
          </ul>
        `;
        jakeDiv.innerHTML = html;
      })
      .catch(err => {
        jakeDiv.innerHTML = `<p>Error cargando perfil: ${err.message}</p>`;
      });
  }

  /* ===== MEME RESET ===== */
  function showMemeReset() {
    iframe.style.display = "none";
    jakeDiv.classList.remove("hidden");

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
      .catch(err => {
        jakeDiv.innerHTML = `<p>Error cargando memes</p>`;
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

  /* ===== MENÚ IZQUIERDA ===== */
  window.toggleMenu = () => {
    sideMenu.classList.toggle("open");
  };

  window.changeTheme = (theme) => {
    setTheme(theme);
    toggleMenu();
  };

  function setTheme(theme) {
    document.body.classList.remove(
      "light","retro","meme","vaporwave","matrix"
    );
    document.body.classList.add(theme);
    localStorage.setItem("jakeBrowserTheme", theme);
  }

  const savedTheme = localStorage.getItem("jakeBrowserTheme");
  if (savedTheme) setTheme(savedTheme);

});
