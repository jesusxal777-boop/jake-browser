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

  // Jake / Chileno → perfil interno
  if (qLower.includes("jake") || qLower.includes("chileno")) {
    showJake();
    return;
  }

  // URL directa
  if (qLower.startsWith("http")) {
    load(q);
  } else {
    // búsqueda externa (forma segura, no bloqueada)
    location.href =
      "https://duckduckgo.com/?q=" + encodeURIComponent(q);
  }
}
