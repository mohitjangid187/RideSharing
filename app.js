const modeButtons = document.querySelectorAll(".mode-button");
const formTitle = document.querySelector("#formTitle");
const vehicleField = document.querySelector("#vehicleField");
const matchList = document.querySelector("#matchList");
const rideForm = document.querySelector("#rideForm");
const sortInput = document.querySelector("#sortInput");
const matchCount = document.querySelector("#matchCount");
const routeDistance = document.querySelector("#routeDistance");
const routeTime = document.querySelector("#routeTime");
const routeMode = document.querySelector("#routeMode");

let activeMode = "companion";

const modeCopy = {
  companion: {
    title: "Find a companion",
    distance: "7.4 km",
    time: "26 min",
    route: "walking plus metro",
  },
  vehicle: {
    title: "Find a driver",
    distance: "7.4 km",
    time: "18 min",
    route: "your vehicle",
  },
  driver: {
    title: "Drive someone's vehicle",
    distance: "near 3.1 km",
    time: "12 min",
    route: "pickup nearby",
  },
};

const matches = {
  companion: [
    {
      name: "Aarav",
      role: "Same destination",
      initials: "AR",
      trust: 4.9,
      eta: 6,
      route: "MG Road to 12th Main",
      chips: ["Verified", "OTP", "Split fare"],
    },
    {
      name: "Mira",
      role: "Metro companion",
      initials: "MR",
      trust: 4.8,
      eta: 9,
      route: "Walk 450 m together",
      chips: ["Women-safe", "Live share", "Known route"],
    },
    {
      name: "Kabir",
      role: "Nearby pickup",
      initials: "KB",
      trust: 4.7,
      eta: 12,
      route: "Same road after Trinity",
      chips: ["Verified", "Cashless", "Quiet ride"],
    },
  ],
  vehicle: [
    {
      name: "Neha",
      role: "Licensed driver",
      initials: "NH",
      trust: 4.9,
      eta: 5,
      route: "Can drive scooter",
      chips: ["License checked", "Helmet", "OTP"],
    },
    {
      name: "Rohan",
      role: "Car driver",
      initials: "RH",
      trust: 4.8,
      eta: 14,
      route: "Manual and automatic",
      chips: ["License checked", "3 yrs", "Live share"],
    },
    {
      name: "Sara",
      role: "Bike driver",
      initials: "SR",
      trust: 4.6,
      eta: 10,
      route: "Near pickup point",
      chips: ["Verified", "Helmet", "Emergency contact"],
    },
  ],
  driver: [
    {
      name: "Dev",
      role: "Has scooter",
      initials: "DV",
      trust: 4.9,
      eta: 4,
      route: "Needs driver to Koramangala",
      chips: ["Owner verified", "Fuel covered", "OTP"],
    },
    {
      name: "Isha",
      role: "Has car",
      initials: "IS",
      trust: 4.7,
      eta: 11,
      route: "Needs driver to Indiranagar",
      chips: ["Owner verified", "Automatic", "Live share"],
    },
    {
      name: "Manav",
      role: "Has bike",
      initials: "MN",
      trust: 4.5,
      eta: 16,
      route: "Needs driver after 7 PM",
      chips: ["Helmet", "Fuel shared", "Rated"],
    },
  ],
};

function renderMatches() {
  const sortBy = sortInput.value;
  const sorted = [...matches[activeMode]].sort((a, b) => {
    if (sortBy === "time") return a.eta - b.eta;
    if (sortBy === "trust") return b.trust - a.trust;
    return b.trust - a.trust || a.eta - b.eta;
  });

  matchCount.textContent = sorted.length + 5;
  matchList.innerHTML = sorted
    .map(
      (match) => `
        <article class="match-card">
          <div class="match-main">
            <div class="match-name">
              <span class="avatar">${match.initials}</span>
              <div>
                <strong>${match.name}</strong>
                <span>${match.role}</span>
              </div>
            </div>
            <span class="trust-score">${match.trust.toFixed(1)}</span>
          </div>
          <div class="meta-row">
            <span>${match.eta} min away</span>
            <span>${match.route}</span>
          </div>
          <div class="chip-row">
            ${match.chips.map((chip) => `<span class="chip">${chip}</span>`).join("")}
          </div>
          <div class="match-actions">
            <button type="button">Request</button>
            <button type="button" aria-label="Call ${match.name}">Call</button>
          </div>
        </article>
      `,
    )
    .join("");
}

function setMode(mode) {
  activeMode = mode;
  const copy = modeCopy[mode];
  formTitle.textContent = copy.title;
  vehicleField.classList.toggle("hidden", mode === "companion");
  routeDistance.textContent = copy.distance;
  routeTime.textContent = copy.time;
  routeMode.textContent = copy.route;

  modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });

  renderMatches();
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

sortInput.addEventListener("change", renderMatches);

rideForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderMatches();
  const firstCard = matchList.querySelector(".match-card");
  firstCard?.animate(
    [
      { transform: "translateY(0)", boxShadow: "0 0 0 rgba(15, 139, 111, 0)" },
      { transform: "translateY(-3px)", boxShadow: "0 16px 28px rgba(15, 139, 111, 0.22)" },
      { transform: "translateY(0)", boxShadow: "0 0 0 rgba(15, 139, 111, 0)" },
    ],
    { duration: 520, easing: "ease-out" },
  );
});

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((button) => button.classList.remove("active"));
    item.classList.add("active");
    if (item.dataset.panel === "drive") setMode("vehicle");
    if (item.dataset.panel === "match") setMode("companion");
    if (item.dataset.panel === "trust") {
      document.querySelector(".trust-strip").scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});

setMode(activeMode);
