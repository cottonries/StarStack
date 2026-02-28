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
      none:"",
      dumbbells: "",
      yoga_mat: "PLhHXVTMoVJN7TLvTmAX_6oIU3ULLSk26Y",
    },
    medium: {
      none:"",
      dumbbells: "",
      yoga_mat: "",
      
    },
    hard: {
      none:"",
      dumbbells: "",
      yoga_mat: "",
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
