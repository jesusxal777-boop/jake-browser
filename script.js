let history = [];
let index = -1;

const iframe = document.getElementById("browser");
const input = document.getElementById("url");
const jakeDiv = document.getElementById("jake-info");

// búsqueda reciente SIEMPRE Jake
input.value = "Jake";

function go() {
  let q = input.value.trim();
  let qLower = q.toLowerCase();

  // detectar búsquedas relacionadas contigo
  if (qLower.includes("jake") || qLower.includes("chileno")) {
    showJake();
    return;
  }

  // si es URL
  if (qLower.startsWith("http")) {
    load(q);
  } else {
    // abrir búsqueda en otra pestaña (DuckDuckGo)
    window.open(
      "https://duckduckgo.com/?q=" + encodeURIComponent(q),
      "_blank"
    );
  }
}
