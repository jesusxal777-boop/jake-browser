document.addEventListener("DOMContentLoaded", () => {

  let historyList = [];
  let index = -1;

  const iframe = document.getElementById("browser");
  const input = document.getElementById("url");
  const jakeDiv = document.getElementById("jake-info");

  // confirmar que el script carga
  console.log("Jake Browser listo");
  document.body.style.outline = "2px solid lime";

  // búsqueda reciente siempre Jake
  input.value = "Jake";

  window.go = function () {
    const q = input.value.trim();
    const qLower = q.toLowerCase();

    if (!q) return;

    // PERFIL JAKE
    if (qLower.includes("jake") || qLower.includes("chileno")) {
      showJake();
      return;
    }

    // URL directa
    if (qLower.startsWith("http://") || qLower.startsWith("https://")) {
      loadIframe(q);
      return;
    }

    // BÚSQUEDA → pestaña nueva (como navegador real)
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

  function showJake() {
    iframe.style.display = "none";
    jakeDiv.classList.remove("hidden");

    jakeDiv.innerHTML = `
      <h1>Jake (Chileno)</h1>
      <p>Desarrollador, creador de mods, historias, apps y proyectos creativos.</p>

      <h3>¿Qué hace?</h3>
      <ul>
        <li>Mods para Minecraft Bedrock</li>
        <li>Apps Android con Sketchware</li>
        <li>Lore e historias originales</li>
        <li>Experimentos web</li>
      </ul>

      <h3>Proyectos</h3>
      <ul>
        <li>Jake Browser</li>
        <li>Mini IA Android</li>
        <li>Mods MCPE</li>
      </ul>
    `;
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
    if (iframe.src) iframe.src = iframe.src;
  };

});
