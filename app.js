/*----------------------------WORKOUT.HTML LOGIC----------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  const intensityEl = document.getElementById("intensity");
  const equipmentEl = document.getElementById("equipment");
  const findBtn = document.getElementById("findBtn");
  const player = document.getElementById("player");
  const msg = document.getElementById("msg");
  
/* THIS NEEDS LINKS FROM OTHER GROUP MEMBERS WHO CREATED PLAYLISTS */
  const PLAYLISTS = {
    easy: {  
      none: "PLoc73631HFejnrFbIlSLXG9R1LLHuUmWX",
      dumbbells: "PLhHXVTMoVJN7eZslVmQ9-bZcK7ufQfmq_",
      yoga_mat: "PLux1QALV3rOuDP6bJ059AX2kKH-PWkSih&si=R4VFtUOmV6h1sn8_",
      bands:"PLrpq5Rd6OQUq-LDRPgVnYTZcVYC0ilVEg&si=RX_f8LeWOaBivLcL",
    },
    medium: {
      none:"PL-QBwSWQqkd9Z4HtlDJ-WYIr3n8quyxGL&si=tbpOiyyHh87mwRRu",
      dumbbells: "PLhHXVTMoVJN4Dst3Z6LFb7z10-mtSqqTf",
      yoga_mat: "PLux1QALV3rOuQVVJTdtF2UkO_KYJc5EOj&si=8dclyEWJvKQDS6Su",
      bands:"PLrpq5Rd6OQUo4jk9H-D3H4oO7RIJZQiMT&si=Cc9XEHLXShdiVg_X",
    },
    hard: {
      none:"PL-QBwSWQqkd_rPVP8L7Ygjo_NnX-cfjOT&si=_NJblZeyzFwPfZu8",
      dumbbells: "PLhHXVTMoVJN70baFfYDS9nQ05x8tyBaq3",
      yoga_mat: "PLux1QALV3rOuTeMq7kzrnwHhAl-b3VK0c&si=E1o4RFpLwhu-JpUE",
      bands:"PLrpq5Rd6OQUoUmdZ172BpwCdAo52-m7Ed&si=Zz__-emR6jDg06iE",
    },
  };

  if (!findBtn) return; 

  findBtn.addEventListener("click", () => {
    const intensity = intensityEl?.value;
    const equipment = equipmentEl?.value;

    if (!intensity || !equipment) {
      msg.textContent = "Please select both intensity and equipment.";
      player.src = "";
      return;
    }

    const playlistId = PLAYLISTS[intensity]?.[equipment];
    if (!playlistId) {
      msg.textContent = "No playlist found.";
      player.src = "";
      return;
    }

    player.src = `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&rel=0`;

    msg.textContent = `Playing: ${intensity.toLowerCase()} + ${equipment
      .replace("_", " ")
      .toLowerCase()}`;

    // FOR CALENDAR LOGGING OF A WORKOUT COMPLETED
    if (typeof logWorkout === "function") {
      logWorkout(intensity, equipment);
    }
  });
});
/*----------------------------END WORKOUT.HTML LOGIC----------------------------*/


/*----------------------------PROGRESS.HTML LOGIC----------------------------*/
const STORAGE_KEY = "starstack_workout_log_v1";

document.addEventListener("DOMContentLoaded", () => {
  const calGrid = document.getElementById("calGrid");
  const calTitle = document.getElementById("calTitle");
  const calDetail = document.getElementById("calDetail");

  const calPrev = document.getElementById("calPrev");
  const calNext = document.getElementById("calNext");
  const calToday = document.getElementById("calToday");

  if (!calGrid || !calTitle || !calDetail) {
    console.error("Missing calendar elements. Need: #calGrid, #calTitle, #calDetail");
    return;
  }

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

  function monthName(m) {
    return ["January","February","March","April","May","June","July","August","September","October","November","December"][m];
  }

  
  let view = new Date();
  view.setDate(1);

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

    const today = new Date();
    const todayISO = toISODate(today);

    // days
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const iso = toISODate(d);
      const entry = log[iso];

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cal-cell cal-day";

      if (iso === todayISO) btn.classList.add("cal-today");
      if (entry) btn.classList.add("cal-done");

      const equipmentPretty = entry?.equipment ? entry.equipment.replace("_", " ") : "";
      const label = entry
        ? `${entry.intensity.toUpperCase()} · ${equipmentPretty.toUpperCase()}`
        : "";

      btn.innerHTML = `
        <div class="cal-top">
          <div class="cal-num">${day}</div>
          <div class="cal-dot"></div>
        </div>
        <div class="cal-sub">${label}</div>
      `;

      btn.addEventListener("click", () => {
        if (!entry) {
          calDetail.innerHTML =
            `<p class="feature-text" style="margin:0;"><strong>${iso}</strong>: No workout logged.</p>`;
        } else {
          calDetail.innerHTML = `
            <p class="feature-text" style="margin:0;">
              <strong>${iso}</strong><br>
              ${entry.intensity.toUpperCase()} + ${equipmentPretty.toUpperCase()}
            </p>`;
        }
      });

      calGrid.appendChild(btn);
    }
  }

  // nav buttons (only if present)
  calPrev?.addEventListener("click", () => {
    view = new Date(view.getFullYear(), view.getMonth() - 1, 1);
    renderCalendar();
  });

  calNext?.addEventListener("click", () => {
    view = new Date(view.getFullYear(), view.getMonth() + 1, 1);
    renderCalendar();
  });

  calToday?.addEventListener("click", () => {
    const now = new Date();
    view = new Date(now.getFullYear(), now.getMonth(), 1);
    renderCalendar();
    
    // show today's detail
    const iso = toISODate(now);
    const entry = loadLog()[iso];
    calDetail.innerHTML = entry
      ? `<p class="feature-text" style="margin:0;"><strong>${iso}</strong><br>${entry.intensity.toUpperCase()} + ${entry.equipment.replace("_"," ").toUpperCase()}</p>`
      : `<p class="feature-text" style="margin:0;"><strong>${iso}</strong>: No workout logged.</p>`;
  });

  renderCalendar();
});

/*----------------------------END PROGRESS.HTML LOGIC----------------------------*/
