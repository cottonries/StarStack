/*----------------------------FIREBASE LOGIC----------------------------*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAyHQEc2TKcxERFu_-POYGp6fR_qTyBQK4",
  authDomain: "starstack-7951e.firebaseapp.com",
  projectId: "starstack-7951e",
  storageBucket: "starstack-7951e.firebasestorage.app",
  messagingSenderId: "539252727920",
  appId: "1:539252727920:web:647722f0ad9554562a54b5"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

/*----------------------------HOME.HTML AUTH LOGIC----------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  const mainWelcome = document.getElementById("main-welcome");

  if (!mainWelcome) return;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const firstName = user.displayName
        ? user.displayName.split(" ")[0]
        : "User";

      mainWelcome.textContent = `Welcome to StarStack ${firstName}`;
    } else {
      window.location.href = "index.html";
    }
  });
});

/*----------------------------WORKOUT LOGGING (SHARED BY WORKOUT.HTML AND PROGRESS.HTML)----------------------------*/

const STORAGE_KEY = "starstack_workout_log_v1";

function pad2(n) { return String(n).padStart(2, "0"); }
function toISODate(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function loadLog() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLog(log) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
}

// Called when user clicks "Log Workout"
function logWorkout(intensity, equipment) {
  const todayISO = toISODate(new Date());
  const log = loadLog();

  if (!Array.isArray(log[todayISO])) {
    log[todayISO] = [];
  }

  log[todayISO].push({
    intensity,
    equipment,
    ts: Date.now()
  });

  saveLog(log);
}

function computeStreakStats() {
  const log = loadLog();
  const dates = Object.keys(log).sort(); // ISO sort works

  if (dates.length === 0) return { current: 0, longest: 0 };

  // Longest streak (all-time)
  let longest = 1;
  let run = 1;

  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1] + "T00:00:00");
    const curr = new Date(dates[i] + "T00:00:00");
    const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      run += 1;
      longest = Math.max(longest, run);
    } else if (diffDays === 0) {
      continue; // duplicate same-day entry (unlikely but safe)
    } else {
      run = 1;
    }
  }

  // Current streak (from today backwards)
  let current = 0;
  const d = new Date();
  while (true) {
    const iso = toISODate(d);
    if (log[iso]) {
      current += 1;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }

  return { current, longest };
}

function buildLastNDaysSeries(n = 14) {
  const log = loadLog();
  const today = new Date();

  const labels = [];
  const values = [];

  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const iso = toISODate(d);
    labels.push(`${d.getMonth() + 1}/${d.getDate()}`); // M/D
    const entry = log[iso];
const workouts = Array.isArray(entry) ? entry.length : entry ? 1 : 0;
values.push(workouts);
  }

  return { labels, values };
}

function drawLineChart(ctx, labels, values) {
  const canvas = ctx.canvas;

  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth || canvas.width;
  const cssH = canvas.clientHeight || canvas.height;

  canvas.width = Math.floor(cssW * dpr);
  canvas.height = Math.floor(cssH * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const w = cssW;
  const h = cssH;
  ctx.clearRect(0, 0, w, h);

  const padLeft = 20;
  const padRight = 20;
  const padTop = 24;
  const padBottom = 34;

  const plotW = w - padLeft - padRight;
  const plotH = h - padTop - padBottom;

  const maxY = Math.max(1, ...values);
  const minY = 0;

  const x = (i) => padLeft + (i * plotW) / Math.max(1, values.length - 1);
  const y = (v) => {
    const t = (v - minY) / (maxY - minY || 1);
    return padTop + (1 - t) * plotH;
  };

  const points = values.map((v, i) => ({
    x: x(i),
    y: y(v)
  }));

  // baseline
  ctx.save();
  ctx.strokeStyle = "rgba(194,147,230,0.25)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padLeft, padTop + plotH);
  ctx.lineTo(padLeft + plotW, padTop + plotH);
  ctx.stroke();
  ctx.restore();

  // subtle fill under line
  if (points.length > 0) {
    const fillGradient = ctx.createLinearGradient(0, padTop, 0, padTop + plotH);
fillGradient.addColorStop(0, "rgba(194,147,230,0.18)");
fillGradient.addColorStop(1, "rgba(194,147,230,0.03)");

    ctx.save();
    ctx.fillStyle = fillGradient;
    ctx.beginPath();
    ctx.moveTo(points[0].x, padTop + plotH);

    points.forEach((p, i) => {
      if (i === 0) ctx.lineTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });

    ctx.lineTo(points[points.length - 1].x, padTop + plotH);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // line
  ctx.save();
ctx.strokeStyle = "rgb(194,147,230)";
ctx.lineWidth = 5;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
ctx.shadowColor = "rgba(194,147,230,0.35)";
ctx.shadowBlur = 12;

  ctx.beginPath();
  points.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();
  ctx.restore();

  // dots
  points.forEach((p) => {
    ctx.save();
    ctx.fillStyle = "rgb(194,147,230)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  // labels
  ctx.save();
  ctx.font = "12px Inter, system-ui, sans-serif";
  ctx.fillStyle = "rgba(92, 102, 122, 0.9)";
  ctx.textAlign = "center";

  const step = Math.ceil(labels.length / 4);
  for (let i = 0; i < labels.length; i += step) {
    ctx.fillText(labels[i], x(i), h - 10);
  }

  if ((labels.length - 1) % step !== 0) {
    ctx.fillText(labels[labels.length - 1], x(labels.length - 1), h - 10);
  }

  ctx.restore();
}

/*----------------------------WORKOUT.HTML LOGIC----------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  const intensityEl = document.getElementById("intensity");
  const equipmentEl = document.getElementById("equipment");
  const findBtn = document.getElementById("findBtn");
  const logWorkoutBtn = document.getElementById("logWorkoutBtn");
  const player = document.getElementById("player");
  const msg = document.getElementById("msg");

  const PLAYLISTS = {
    easy: {
      none: "PLoc73631HFejnrFbIlSLXG9R1LLHuUmWX",
      dumbbells: "PLhHXVTMoVJN7eZslVmQ9-bZcK7ufQfmq_",
      yoga_mat: "PLux1QALV3rOuDP6bJ059AX2kKH-PWkSih",
      bands: "PLrpq5Rd6OQUq-LDRPgVnYTZcVYC0ilVEg",
    },
    medium: {
      none: "PL-QBwSWQqkd9Z4HtlDJ-WYIr3n8quyxGL",
      dumbbells: "PLhHXVTMoVJN4Dst3Z6LFb7z10-mtSqqTf",
      yoga_mat: "PLux1QALV3rOuQVVJTdtF2UkO_KYJc5EOj",
      bands: "PLrpq5Rd6OQUo4jk9H-D3H4oO7RIJZQiMT",
    },
    hard: {
      none: "PL-QBwSWQqkd_rPVP8L7Ygjo_NnX-cfjOT",
      dumbbells: "PLhHXVTMoVJN70baFfYDS9nQ05x8tyBaq3",
      yoga_mat: "PLux1QALV3rOuTeMq7kzrnwHhAl-b3VK0c",
      bands: "PLrpq5Rd6OQUoUmdZ172BpwCdAo52-m7Ed",
    },
  };

  if (!findBtn || !player || !msg) return;

  let currentWorkout = null;

  findBtn.addEventListener("click", () => {
    const intensity = intensityEl?.value;
    const equipment = equipmentEl?.value;

    if (!intensity || !equipment) {
      msg.textContent = "Please select both intensity and equipment.";
      player.src = "";
      currentWorkout = null;
      return;
    }

    const playlistId = PLAYLISTS[intensity]?.[equipment];
    if (!playlistId) {
      msg.textContent = "No playlist found.";
      player.src = "";
      currentWorkout = null;
      return;
    }

    player.src = `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&rel=0`;
    msg.textContent = `Playing: ${intensity.toLowerCase()} + ${equipment.replace("_", " ").toLowerCase()}`;
    currentWorkout = { intensity, equipment };
  });

  if (logWorkoutBtn) {
    logWorkoutBtn.addEventListener("click", () => {
      if (!currentWorkout) {
        msg.textContent = "Find a workout first, then log it.";
        return;
      }

      logWorkout(currentWorkout.intensity, currentWorkout.equipment);
      msg.textContent = `Workout logged: ${currentWorkout.intensity.toLowerCase()} + ${currentWorkout.equipment.replace("_", " ").toLowerCase()}`;
    });
  }
});

/*----------------------------PROGRESS.HTML LOGIC----------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  const calGrid = document.getElementById("calGrid");
  const calTitle = document.getElementById("calTitle");
  const calDetail = document.getElementById("calDetail");

  const calPrev = document.getElementById("calPrev");
  const calNext = document.getElementById("calNext");
  const calToday = document.getElementById("calToday");

  // If we're not on progress.html, exit silently
  if (!calGrid || !calTitle || !calDetail) return;

  function monthName(m) {
    return ["January","February","March","April","May","June","July","August","September","October","November","December"][m];
  }

  let view = new Date();
  view.setDate(1);

  function renderStats() {
    const streakEl = document.getElementById("streakCount");
    const longestEl = document.getElementById("longestStreak");
    const streakMessage = document.getElementById("streakMessage");

    const { current, longest } = computeStreakStats();
    
    if (streakMessage) {
    streakMessage.textContent =
    current === 0
      ? "Log a workout today to start your streak."
      : current === 1
      ? "You’ve worked out 1 day so far."
      : `You’ve worked out ${current} days in a row.`;
}

    if (streakEl) streakEl.textContent = current;
    if (longestEl) longestEl.textContent = longest;

    const canvas = document.getElementById("streakChart");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const { labels, values } = buildLastNDaysSeries(14);
      drawLineChart(ctx, labels, values);
    }
  }

  function renderCalendar() {
    const log = loadLog();

    const year = view.getFullYear();
    const month = view.getMonth();

    calTitle.textContent = `${monthName(month)} ${year}`;
    calGrid.innerHTML = "";

    // weekday headers
    const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    for (const w of weekdays) {
      const el = document.createElement("div");
      el.className = "cal-weekday";
      el.textContent = w;
      calGrid.appendChild(el);
    }

    const first = new Date(year, month, 1);
    const startDow = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // blanks before day 1
    for (let i = 0; i < startDow; i++) {
      const blank = document.createElement("div");
      blank.className = "cal-cell cal-blank";
      calGrid.appendChild(blank);
    }

    const todayISO = toISODate(new Date());

    // days
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const iso = toISODate(d);
      const entry = log[iso];
      const workouts = Array.isArray(entry) ? entry : entry ? [entry] : [];

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cal-cell cal-day";

      if (iso === todayISO) btn.classList.add("cal-today");
      if (workouts.length > 0) btn.classList.add("cal-done");

const label = workouts.length > 0
  ? `${workouts.length} workout${workouts.length > 1 ? "s" : ""}`
  : "";

      btn.innerHTML = `
        <div class="cal-top">
          <div class="cal-num">${day}</div>
          <div class="cal-dot"></div>
        </div>
        <div class="cal-sub">${label}</div>
      `;

btn.addEventListener("click", () => {
  if (workouts.length === 0) {
    calDetail.innerHTML = `<p class="feature-text" style="margin:0;"><strong>${iso}</strong>: No workout logged.</p>`;
    return;
  }

  const workoutLines = workouts.map(w => {
    const prettyEquipment = w.equipment.replace("_", " ").toUpperCase();
    return `${w.intensity.toUpperCase()} + ${prettyEquipment}`;
  }).join("<br>");

  calDetail.innerHTML = `<p class="feature-text" style="margin:0;"><strong>${iso}</strong><br>${workoutLines}</p>`;
});

      calGrid.appendChild(btn);
    }
  }

  // nav buttons
  calPrev?.addEventListener("click", () => {
    view = new Date(view.getFullYear(), view.getMonth() - 1, 1);
    renderCalendar();
    renderStats();
  });

  calNext?.addEventListener("click", () => {
    view = new Date(view.getFullYear(), view.getMonth() + 1, 1);
    renderCalendar();
    renderStats();
  });

  calToday?.addEventListener("click", () => {
    const now = new Date();
    view = new Date(now.getFullYear(), now.getMonth(), 1);
    renderCalendar();
    renderStats();

    // show today's detail
    const iso = toISODate(now);
const entry = loadLog()[iso];
const workouts = Array.isArray(entry) ? entry : entry ? [entry] : [];

calDetail.innerHTML = workouts.length > 0
  ? `<p class="feature-text" style="margin:0;"><strong>${iso}</strong><br>${workouts.map(w =>
      `${w.intensity.toUpperCase()} + ${w.equipment.replace("_", " ").toUpperCase()}`
    ).join("<br>")}</p>`
  : `<p class="feature-text" style="margin:0;"><strong>${iso}</strong>: No workout logged.</p>`;
  });

  // initial render
  renderCalendar();
  renderStats();
});

/*----------------------------HOME.HTML LOGIC (QUOTES)----------------------------*/
const quotes = [
  { text: "You just can’t beat the person who never gives up.", sub: "— Babe Ruth" },
  { text: "You’ve survived 100 percent of your worst days.", sub: "— Robin Arzon" },
  { text: "The hardest part is over. You showed up.", sub: "— Jess Sims" },
  { text: "A 10-minute workout is always better than none.", sub: "— StarStack" },
  { text: "Treat your body like someone you love.", sub: "— Hannah Corbin" },
];

document.addEventListener("DOMContentLoaded", () => {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  const quoteText = document.getElementById("quoteText");
  const quoteSub = document.getElementById("quoteSub");

  if (quoteText) quoteText.textContent = `“${q.text}”`;
  if (quoteSub) quoteSub.textContent = q.sub;
});

/*----------------------------PROFILE.HTML LOGIC----------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  const profileMain = document.getElementById("profile-main");

  // If we're not on profile.html, exit silently
  if (!profileMain) return;

  const profileStatus = document.getElementById("profile-status");
  const heroAvatarImage = document.getElementById("hero-avatar-image");
  const heroAvatarFallback = document.getElementById("hero-avatar-fallback");
  const profileDisplayName = document.getElementById("profile-display-name");
  const profileName = document.getElementById("profile-name");
  const profileEmail = document.getElementById("profile-email");
  const profileEmailShort = document.getElementById("profile-email-short");
  const profileMemberSince = document.getElementById("profile-member-since");
  const logoutButton = document.getElementById("profile-logout-btn");

  function getInitials(displayName, email) {
    const source = displayName?.trim() || email?.split("@")[0] || "User";
    const parts = source.split(/\s+/).filter(Boolean);

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  function formatMemberSince(dateValue) {
    if (!dateValue) return "-";

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "-";

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(date);
  }

  function setAvatar(imageElement, fallbackElement, avatarUrl, initials) {
    if (avatarUrl) {
      imageElement.src = avatarUrl;
      imageElement.hidden = false;
      fallbackElement.hidden = true;
      return;
    }

    imageElement.hidden = true;
    fallbackElement.hidden = false;
    fallbackElement.textContent = initials;
  }

  function revealProfile() {
    profileMain.hidden = false;
    if (profileStatus) profileStatus.hidden = true;
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      try {
        await signOut(auth);
        window.location.href = "index.html";
      } catch (error) {
        console.error("Logout error:", error);
      }
    });
  }

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    const displayName = user.displayName || "User";
    const email = user.email || "-";
    const initials = getInitials(displayName, email);
    const avatarUrl = user.photoURL || "";

    if (profileDisplayName) profileDisplayName.textContent = displayName;
    if (profileName) profileName.textContent = displayName;
    if (profileEmail) profileEmail.textContent = email;
    if (profileEmailShort) {
      profileEmailShort.textContent =
        email.length > 14 ? email.slice(0, 14) + "..." : email;
    }
    if (profileMemberSince) {
      profileMemberSince.textContent = formatMemberSince(user.metadata.creationTime);
    }

    setAvatar(heroAvatarImage, heroAvatarFallback, avatarUrl, initials);
    revealProfile();
  });
});

/*----------------------------NAV AVATAR LOGIC----------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  const navAvatarImage = document.getElementById("nav-avatar-image");
  const navAvatarFallback = document.getElementById("nav-avatar-fallback");

  if (!navAvatarImage || !navAvatarFallback) return;

  function getInitials(displayName, email) {
    const source = displayName?.trim() || email?.split("@")[0] || "User";
    const parts = source.split(/\s+/).filter(Boolean);

    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  function renderNavAvatar(user) {
    const avatarUrl = user?.photoURL || "";
    const initials = getInitials(user?.displayName || "User", user?.email || "");

    if (avatarUrl) {
      navAvatarImage.src = avatarUrl;
      navAvatarImage.hidden = false;
      navAvatarFallback.hidden = true;
      return;
    }

    navAvatarImage.hidden = true;
    navAvatarFallback.hidden = false;
    navAvatarFallback.textContent = initials;
  }

  onAuthStateChanged(auth, (user) => {
    if (!user) return;
    renderNavAvatar(user);
  });
});
