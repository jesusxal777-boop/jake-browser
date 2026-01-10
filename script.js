document.addEventListener("DOMContentLoaded", () => {

  let historyList = [];
  let index = -1;

  const iframe = document.getElementById("browser");
  const input = document.getElementById("url");
  const jakeDiv = document.getElementById("jake-info");
  const sideMenu = document.getElementById("side-menu");

  console.log("Jake Browser listo");

  // Tema guardado o default
  const savedTheme = localStorage.getItem("jakeBrowserTheme") || "light";
  setTheme(savedTheme);

  input.value = "Jake";

  window.go = function () {
    const q = input.value.trim().toLowerCase();
    if (!q) return;

    if (q.includes("jake") || q.includes("chileno")) {
      showJake();
      return;
    }

    if (q.includes("meme reset")) {
      showMemeReset();
      return;
    }

    if (q.startsWith("http")) {
      loadIframe(input.value);
      return;
    }

    window.open("https://duckduckgo.com/?q=" + encodeURIComponent(input.value), "_blank");
  };

  function loadIframe(url) {
    jakeDiv.classList.add("hidden");
    iframe.style.display = "block";
    iframe.src = url;

    historyList = historyList.slice(0, index + 1);
    historyList.push(url);
    index++;
  }

  function showJake() {
    iframe.style.display = "none";
    jakeDiv.classList.remove("hidden");

    jakeDiv.innerHTML = `
      <img src="images/jake.png" class="jake-img">
      <h1>Jake (Chileno)</h1>
      <p>Desarrollador, creador de mods, historias, apps y proyectos creativos.</p>
    `;
  }

  function showMemeReset() {
    iframe.style.display = "none";
    jakeDiv.classList.remove("hidden");

    fetch("./meme-reset.json")
      .then(r => r.json())
      .then(data => {
        let html = `<h1>${data.title}</h1><p>${data.description}</p><div class="meme-grid">`;
        data.memes.forEach(m => {
          html += `
            <div class="meme-card">
              <img src="${m.image}">
              <h4>${m.title}</h4>
              <span>${m.year}</span>
            </div>`;
        });
        html += "</div>";
        jakeDiv.innerHTML = html;
      });
  }

  window.goBack = () => { if (index > 0) iframe.src = historyList[--index]; };
  window.goForward = () => { if (index < historyList.length - 1) iframe.src = historyList[++index]; };
  window.reloadPage = () => iframe.src && (iframe.src = iframe.src);

  window.toggleMenu = function () {
    sideMenu.classList.toggle("active");
  };

  window.changeTheme = function (theme) {
    setTheme(theme);
    toggleMenu();
  };

  function setTheme(theme) {
    document.body.className = theme;
    localStorage.setItem("jakeBrowserTheme", theme);
  }

});
