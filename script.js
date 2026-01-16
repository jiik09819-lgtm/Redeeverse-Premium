const OWNER_CODE = "369369";
let tapCount = 0;

// Triple tap detection
document.body.addEventListener("click", () => {
  tapCount++;
  setTimeout(() => tapCount = 0, 600);

  if (tapCount === 3) {
    document.getElementById("ownerPanel").classList.toggle("hidden");
    tapCount = 0;
  }
});

// Default codes
const defaultCodes = [
  { code: "WELCOMEFC25", reward: "Gold Pack", date: "10 Jan 2026", status: "Active" }
];

if (!localStorage.getItem("redeeverseCodes")) {
  localStorage.setItem("redeeverseCodes", JSON.stringify(defaultCodes));
}

function renderCodes() {
  const codes = JSON.parse(localStorage.getItem("redeeverseCodes"));
  const container = document.getElementById("codes");
  container.innerHTML = "";

  codes.forEach(c => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${c.code}</strong><br>
      Reward: ${c.reward}<br>
      Date: ${c.date}<br>
      <span class="${c.status === "Active" ? "active" : "expired"}">
        ${c.status}
      </span>
    `;
    container.appendChild(div);
  });
}

renderCodes();

// Owner unlock
function unlockOwner() {
  const input = document.getElementById("ownerCodeInput").value;
  if (input === OWNER_CODE) {
    document.getElementById("ownerControls").classList.remove("hidden");
    alert("Owner Mode Activated");
  } else {
    alert("Wrong Owner Code");
  }
}

// Add new code
function addCode() {
  const codes = JSON.parse(localStorage.getItem("redeeverseCodes"));

  codes.push({
    code: newCode.value,
    reward: newReward.value,
    date: newDate.value,
    status: newStatus.value
  });

  localStorage.setItem("redeeverseCodes", JSON.stringify(codes));
  renderCodes();
}