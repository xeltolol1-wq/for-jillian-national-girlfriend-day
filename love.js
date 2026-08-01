// ===== Floating ornaments =====
(function () {
  const emojis = ["❤️", "🌸", "✨", "💌", "🎀", "🌹", "☁️", "⭐", "💕", "🧸", "🐻", "🐰"];
  const layer = document.getElementById("ornaments");

  if (layer) {
    for (let i = 0; i < 18; i++) {
      const s = document.createElement("span");
      s.className = "drop";
      s.textContent = emojis[i % emojis.length];
      s.style.left = ((i * 5.6 + (i % 3) * 4) % 96) + "%";
      s.style.fontSize = (14 + (i % 4) * 6) + "px";
      s.style.animationDelay = "-" + ((i * 1.7) % 18) + "s";
      s.style.animationDuration = (26 + (i % 5) * 6) + "s";
      layer.appendChild(s);
    }
  }
})();

// ===== Page switching =====
function goPage(id) {
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-go]").forEach((btn) => {
  btn.addEventListener("click", () => goPage(btn.dataset.go));
});

// ===== Voice Messages =====
let currentAudio = null;
let currentBtn = null;
let currentLabel = null;
let currentWave = null;

document.querySelectorAll("[data-voice]").forEach((box) => {
  const btn = box.querySelector(".voice-btn");
  const label = box.querySelector(".voice-label");
  const wave = box.querySelector(".waveform");
  const note = box.querySelector(".voice-note");
  const audio = box.querySelector("[data-audio]");

  if (!btn || !audio) return;

  const source = audio.querySelector("source");
  const src = source ? source.getAttribute("src") : audio.getAttribute("src");

  if (!label.dataset.orig) {
    label.dataset.orig = label.textContent;
  }

  btn.addEventListener("click", () => {
    if (!src) {
      if (note) {
        note.textContent = "Voice message coming soon — add your recording here 💌";
        note.hidden = false;
      }
      return;
    }

    // Pause same audio
    if (currentAudio === audio && !audio.paused) {
      audio.pause();
      label.textContent = label.dataset.orig;
      if (wave) wave.hidden = true;

      currentAudio = null;
      currentBtn = null;
      currentLabel = null;
      currentWave = null;
      return;
    }

    // Stop previous audio
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;

      if (currentLabel) currentLabel.textContent = currentLabel.dataset.orig;
      if (currentWave) currentWave.hidden = true;
    }

    audio.currentTime = 0;
    audio.play();

    label.textContent = "Pause Message";
    if (wave) wave.hidden = false;

    currentAudio = audio;
    currentBtn = btn;
    currentLabel = label;
    currentWave = wave;
  });

  audio.addEventListener("ended", () => {
    label.textContent = label.dataset.orig;
    if (wave) wave.hidden = true;

    if (currentAudio === audio) {
      currentAudio = null;
      currentBtn = null;
      currentLabel = null;
      currentWave = null;
    }
  });
});

// ===== I Love You heart burst + modal =====
const loveBtn = document.getElementById("loveBtn");
const burstLayer = document.getElementById("burstLayer");
const modal = document.getElementById("modal");

if (loveBtn) {
  loveBtn.addEventListener("click", () => {
    burstLayer.innerHTML = "";

    const emojis = ["🌸", "❤️", "✨"];

    for (let i = 0; i < 50; i++) {
      const angle = (i / 50) * Math.PI * 2;
      const dist = 180 + (i % 7) * 60;

      const p = document.createElement("span");
      p.className = "burst-piece";
      p.textContent = emojis[i % 3];
      p.style.fontSize = (12 + (i % 5) * 5) + "px";
      p.style.animationDelay = (i % 10) * 0.05 + "s";
      p.style.setProperty("--bx", Math.cos(angle) * dist + "px");
      p.style.setProperty("--by", Math.sin(angle) * dist + "px");

      burstLayer.appendChild(p);
    }

    setTimeout(() => {
      modal.hidden = false;
    }, 700);

    setTimeout(() => {
      burstLayer.innerHTML = "";
    }, 4000);
  });
}

document.querySelectorAll("[data-close]").forEach((el) => {
  el.addEventListener("click", () => {
    modal.hidden = true;
  });
});

// ===== 22-second whisper =====
setTimeout(() => {
  const whisper = document.getElementById("whisper");
  if (whisper) whisper.hidden = false;
}, 22000);