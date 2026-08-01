// ===== Floating ornaments =====
(function () {
  const emojis = ["❤️", "🌸", "✨", "💌", "🎀", "🌹", "☁️", "⭐", "💕", "🧸", "🐻", "🐰"];
  const layer = document.getElementById("ornaments");
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

// ===== Voice messages =====
document.querySelectorAll("[data-voice]").forEach((box) => {
  const btn = box.querySelector(".voice-btn");
  const label = box.querySelector(".voice-label");
  const wave = box.querySelector(".waveform");
  const note = box.querySelector(".voice-note");
  const audio = box.querySelector("[data-audio]");
  const src = audio.querySelector("source")?.src;
  let playing = false;

  btn.addEventListener("click", () => {
    if (!src) {
      note.textContent = "Voice message coming soon — add your recording here 💌";
      note.hidden = false;
      return;
    }
    if (playing) {
      audio.pause();
      playing = false;
      label.textContent = label.dataset.orig || label.textContent;
      wave.hidden = true;
    } else {
      audio.play();
      playing = true;
      if (!label.dataset.orig) label.dataset.orig = label.textContent;
      label.textContent = "Pause Message";
      wave.hidden = false;
    }
  });

  if (src) {
    audio.addEventListener("ended", () => {
      playing = false;
      label.textContent = label.dataset.orig || label.textContent;
      wave.hidden = true;
    });
  }
});

// ===== "I Love You" heart burst + modal =====
const loveBtn = document.getElementById("loveBtn");
const burstLayer = document.getElementById("burstLayer");
const modal = document.getElementById("modal");

loveBtn.addEventListener("click", () => {
  // petal dispersion
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
  setTimeout(() => { modal.hidden = false; }, 700);
  setTimeout(() => { burstLayer.innerHTML = ""; }, 4000);
});

document.querySelectorAll("[data-close]").forEach((el) => {
  el.addEventListener("click", () => { modal.hidden = true; });
});

// ===== 22-second whisper =====
setTimeout(() => { document.getElementById("whisper").hidden = false; }, 22000);
const btn = document.querySelector(".voice-btn");
const audio = document.getElementById("voice1");

btn.addEventListener("click", function () {

    if (audio.paused) {

        audio.play();
        btn.innerHTML = "⏸ Pause Message";

    } else {

        audio.pause();
        btn.innerHTML = "🎙 Play Voice Message";

    }

});
const voice2 = document.querySelector("[data-audio]");
const btn2 = document.querySelector(".voice-btn");

voice2.src = "voice2.mp3";

btn2.addEventListener("click", () => {
    if (voice2.paused) {
        voice2.play();
        btn2.textContent = "⏸ Pause Message";
    } else {
        voice2.pause();
        btn2.textContent = "🎙 Play Message";
    }
    voice2.addEventListener("ended", () => {
    btn2.textContent = "🎙 Play Message";
});
});