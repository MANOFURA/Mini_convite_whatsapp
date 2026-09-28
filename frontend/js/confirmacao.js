
async function carregar() {
  try {
    const res = await fetch("/api/encontro");
    const e = await res.json();
    document.getElementById("data").textContent = formatarData(e.data);
    document.getElementById("hora").textContent = e.hora;
    document.getElementById("local").textContent = e.local;
  } catch {
    document.getElementById("local").textContent = "Detalhes indisponíveis";
  }
}
function formatarData(data) {
  if (!data) return "—";
  const [a,m,d] = data.split("-");
  return `${d}/${m}/${a}`;
}
carregar();
