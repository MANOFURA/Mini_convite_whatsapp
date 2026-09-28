
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hint = document.getElementById("hint");

yesBtn?.addEventListener("click", () => {
  window.location.href = "detalhes.html";
});

let attempts = 0;
const messages = [
  "Hmm... esse botão está com medo 😳",
  "Tem certeza disso? 👀",
  "Acho que você quis dizer SIM... ❤️",
  "Você não vai conseguir me pegar 😈",
  "Tenta de novo... 😂"
];

function fugir() {
  noBtn.classList.add("runaway");
  const maxX = Math.max(15, window.innerWidth - noBtn.offsetWidth - 15);
  const maxY = Math.max(15, window.innerHeight - noBtn.offsetHeight - 15);
  noBtn.style.left = `${15 + Math.random() * (maxX - 15)}px`;
  noBtn.style.top = `${15 + Math.random() * (maxY - 15)}px`;
  attempts++;
  hint.textContent = messages[Math.min(attempts - 1, messages.length - 1)];
}

noBtn?.addEventListener("mouseenter", fugir);
noBtn?.addEventListener("touchstart", e => { e.preventDefault(); fugir(); }, {passive:false});
noBtn?.addEventListener("click", e => { e.preventDefault(); fugir(); });
