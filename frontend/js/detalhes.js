
async function carregar() {
  try {
    const res = await fetch("/api/encontro");
    if (!res.ok) throw new Error();
    const e = await res.json();

    document.getElementById("data").textContent = formatarData(e.data);
    document.getElementById("hora").textContent = e.hora;
    document.getElementById("local").textContent = e.local;
    document.getElementById("mensagem").textContent =
      e.mensagem || "Está tudo preparado para nosso encontro. ❤️";

    document.getElementById("mapa").href =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(e.local);
  } catch {
    document.getElementById("mensagem").textContent =
      "Não foi possível carregar os detalhes do encontro.";
  }
}

function formatarData(data) {
  if (!data) return "Data não definida";
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

carregar();
