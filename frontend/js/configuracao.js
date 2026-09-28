
const form = document.getElementById("form");
const status = document.getElementById("status");

async function carregarAtual() {
  try {
    const res = await fetch("/api/encontro");
    const e = await res.json();
    document.getElementById("data").value = e.data || "";
    document.getElementById("hora").value = e.hora || "";
    document.getElementById("mensagem").value = e.mensagem || "";
  } catch {}
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  status.textContent = "Salvando...";

  const payload = {
    data: document.getElementById("data").value,
    hora: document.getElementById("hora").value,
    local: document.getElementById("local").value,
    mensagem: document.getElementById("mensagem").value
  };

  try {
    const res = await fetch("/api/encontro", {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.erro);

    status.textContent = "Encontro salvo com sucesso! ❤️";
  } catch (error) {
    status.textContent = error.message || "Erro ao salvar.";
  }
});

carregarAtual();
