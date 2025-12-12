(function () {
  if (window.__GREEN_PROMPTING__) return;
  window.__GREEN_PROMPTING__ = true;

  const panel = document.createElement("div");
  panel.id = "green-prompting-panel";

  panel.innerHTML = `
    <div class="panel-header">
      <strong>Green Prompting</strong>
      <div class="panel-controls">
        <button id="pin">📌</button>
        <button id="close">✕</button>
      </div>
    </div>

    <div id="offers">Loading offers...</div>
    <div id="tip">Tip: Shorten prompts to reduce energy.</div>

    <div style="margin-top:12px;font-size:12px;opacity:0.8;">
      Prompt electricity: 0.000115 kWh • Water: 0.001 L  
      <button id="undo" style="float:right;font-size:12px;">Undo</button>
    </div>
  `;

  document.body.appendChild(panel);

  const offers = [
    "Vibe Coding — learn energy-efficient prompting",
    "Sales Audit — detect sustainability leaks",
    "Green Boost — reduce model energy by 20%",
  ];

  const tips = [
    "Short prompts = lower energy use.",
    "Batch requests when possible.",
    "Avoid repeating the same context.",
  ];

  // Rotate offers
  let offerIndex = 0;
  setInterval(() => {
    offerIndex = (offerIndex + 1) % offers.length;
    document.getElementById("offers").textContent = offers[offerIndex];
  }, 4000);

  // Rotate tips
  let tipIndex = 0;
  setInterval(() => {
    tipIndex = (tipIndex + 1) % tips.length;
    document.getElementById("tip").textContent = tips[tipIndex];
  }, 6000);

  // Hover lock
  let hideTimer = null;
  let pinned = false;

  panel.addEventListener("mouseenter", () => {
    clearTimeout(hideTimer);
    panel.classList.remove("green-hidden");
  });

  panel.addEventListener("mouseleave", () => {
    if (!pinned) startHide();
  });

  function startHide() {
    hideTimer = setTimeout(() => {
      if (!pinned) panel.classList.add("green-hidden");
    }, 2500);
  }

  startHide();

  // Pin
  document.getElementById("pin").onclick = () => {
    pinned = !pinned;
    if (pinned) panel.classList.remove("green-hidden");
    if (!pinned) startHide();
  };

  // Close
  document.getElementById("close").onclick = () => {
    panel.remove();
  };

  // Undo placeholder
  document.getElementById("undo").onclick = () => {
    alert("Undo clicked");
  };

  // Smooth reposition above input
  let lastY = null;
  function findInput() {
    return document.querySelector("textarea") ||
           document.querySelector("[contenteditable='true']");
  }

  function smoothReposition() {
    const input = findInput();
    if (!input) return;

    const rect = input.getBoundingClientRect();
    const targetBottom = window.innerHeight - rect.top + 15;

    if (lastY === null) lastY = targetBottom;
    const eased = lastY + (targetBottom - lastY) * 0.25;
    lastY = eased;

    panel.style.bottom = eased + "px";
  }

  setInterval(smoothReposition, 120);
})();

