# Additional Supporting Documents for Testing

---

## Automated Test Run Output

### Playwright Testing (Continously Running)

Last formal run done: 3/15/26

![Playwright Tests](https://github.com/cottonries/StarStack/actions/workflows/playwright.yml/badge.svg) 

<img width="974" height="163" alt="Image" src="https://github.com/user-attachments/assets/01150554-3a72-45fa-a30a-1a3ef202080e" />

<img width="993" height="480" alt="Image" src="https://github.com/user-attachments/assets/965776c6-da0b-4a57-ba4d-304bb5d79329" />

*Playwright can not interact with external pop-ups so we were unable to use it to test the login process*

---

### Google Chrome Developer Tools - Lighthouse Audit (Last Confirmed 3/14/26)

*(In a new incognito window) inspect > Lighthouse > Navigation/Desktop/Performance+Accessibility+Best Practices+SEO > Analyze page load*

#### index.html
<img width="1440" height="216" alt="Image" src="https://github.com/user-attachments/assets/63e9e9af-c16c-4b21-9cad-b90969459698" />

#### home.html
<img width="1440" height="215" alt="Image" src="https://github.com/user-attachments/assets/c677709a-b0d7-4c99-9dda-b4e7f47f7c42" />

#### workout.html
<img width="1439" height="215" alt="Image" src="https://github.com/user-attachments/assets/ff39217b-8c0c-40d7-bab2-81acbde38f86" />

#### progress.html
<img width="1440" height="244" alt="Image" src="https://github.com/user-attachments/assets/2338f2bd-8723-412c-9883-9de69ddc521b" />

#### profile.html
<img width="1440" height="240" alt="Image" src="https://github.com/user-attachments/assets/e6d37d2c-34a4-4ebe-bfa3-b97f16f6f937" /> 

---

## Manual Test Cases (Last Confirmed 3/15/26)

### Core Flow Manual Test

| Test ID | Feature | Steps | Expected Result | Actual Result | Pass/Fail |
|-------|-------|-------|-------|-------|-------|
| M1 | Login with Google | Click **Sign In with Google** on index page | User successfully logs in and is redirected to `home.html` | Works as expected | Pass |
| M2 | Access protection | Try to open `home.html` without logging in | User is redirected to login page | Works as expected | Pass |
| M3 | Workout selection | Select intensity and equipment on `workout.html` and click **Find Workout** | A workout video/playlist loads | Works as expected | Pass |
| M4 | Log workout | Click **Log Workout** after selecting workout | Workout is saved to the log for the current date | Works as expected | Pass |
| M5 | Multiple workouts same day | Log two workouts on the same day | Both workouts appear in the progress details for that date | Works as expected | Pass |
| M6 | Progress calendar | Open `progress.html` after logging workouts | Calendar highlights days where workouts were logged | Works as expected | Pass |
| M7 | Streak counter | Log workouts on consecutive days | Streak counter increases correctly | Works as expected | Pass |
| M8 | Progress chart | Log a workout and open progress page | Line chart updates to reflect workout count | Works as expected | Pass |
| M9 | Profile display | Open `profile.html` | User name, email, and member-since date display correctly | Works as expected | Pass |
| M10 | Logout | Click **Logout** on profile page | User is signed out and redirected to login page | Works as expected | Pass |
| M11 | Mobile layout | Open site on mobile or narrow browser window | UI elements remain readable and stay on screen | Works as expected | Pass |
| M12 | Calendar alignment | View calendar on progress page | Calendar grid is properly aligned and readable | Works as expected | Pass |
| M13 | Email Link | UX | Footer contact link opens email client with pre-filled template | Works as expected | Pass |

---

## Usage Load Testing (Last Confirmed 3/4/26)

### Test Scenario: Concurrent user access during in-class Bug Bash.

### Description:
During the in-class Bug Bash event, students in the CSS360 class accessed the StarStack website simultaneously. The class consists of 32 students. Considering that three members of the StarStack team were present during the rollout, the professor was not actively participating, and some students may not have engaged with the site, we estimated that approximately 80% of the class (about 25–26 users) were accessing StarStack concurrently.

### Results:
All pages loaded successfully and no noticeable lag or performance issues were observed during this test.

- Estimated Concurrent Users: ~25 users
- Expected Behavior: Website loads pages normally with no crashes or major delays
- Observed Behavior: Pages loaded correctly and application remained responsive
  
### Result: Pass

---

## Performance Testing (Last Confirmed 3/15/26)

Performance measurements were taken using Chrome Developer Tools with caching disabled to simulate first-load conditions. Each interaction was tested three times, averaged, and compared against the defined performance targets.

| Test Area | Target | Actual | Result |
|---|----|---|---|
| Initial Page Load | < 3.5 s | ~0.7 s | Pass |
| Login + Home Rendering | < 3 s | ~2.76 s | Pass |
| Video Embed Loading | < 5 s | ~1.83 s | Pass |
| Workout Logging | < 1 s | ~0.4 s | Pass |

### Measurement Method

- **Initial Page Load:** Measured using Chrome DevTools **Network tab** with cache disabled.
  <img width="1439" height="364" alt="Image" src="https://github.com/user-attachments/assets/7903d94b-7e8e-4e79-8b3b-d70e124ef2f6" />
- **Login + Home Rendering:** Timed from clicking **Sign in with Google** until the home page finished rendering. (After being logged in previously. The logout session is saved so there is an automatic redirect. This time does not include the time it would take to manually enter a user's username and password.)
- **Video Embed Loading:** Timed from selecting a workout until the embedded video appeared and was playable.
- **Workout Logging:** Timed from clicking **Log Workout** until the workout entry appeared in the progress log. (The workout page will show when a workout is logged).

### Result: All tested interactions completed within the defined performance targets and the application remained responsive during testing.

---

## Screenshot of FireBase Anallytics Realtime Overview (Last Confirmed 3/13/26)

<img width="1118" height="709" alt="Screenshot 2026-03-13 at 12 37 19 PM" src="https://github.com/user-attachments/assets/f7206dd0-1c70-425d-a347-8960b8fc6c59" />

---

# Notes From User Testing

## Initial User Elicitation Regarding Prototype (No code - Figma only)

<img width="2348" height="751" alt="Screenshot 2026-03-13 at 12 59 03 PM" src="https://github.com/user-attachments/assets/b16237c1-6756-450a-b09f-b9ae0627dddf" />

### Interview 1

**Interviewee:** Ashe Krzykwa  
**Background:** BASc, Game and Interactive Media Design – At-home fitness enthusiast  
**Date:** January 31, 2026  
**Interviewer:** Samantha Wang

| Question | Response |
|---|---|
| General impressions of the application | Clean interface, easy to use and navigate. |
| Would you personally use this application? | I know people who use trackers who would use something like this. |
| Are the calendar and saved list features beneficial? | The calendar would be useful with an established database. The tracking aspect makes it unique compared to reference tools. |
| Additional features or functionality? | More equipment options such as resistance bands or rollers would be helpful. |
| Primary strengths of the application | Habit tracking combined with search functionality is a useful concept. |
| Weaknesses or areas for improvement | More defining imagery or icons. The uniqueness of the home version’s icons could be reflected elsewhere. |

---

### Interview 2

**Interviewee:** Hector Mejia  
**Background:** Cal Poly & UNM Graduate – Data Analyst at Seattle Children’s Hospital – Former hobbyist runner  
**Date:** January 31, 2026  
**Interviewer:** Tristan Mejia

| Question | Response |
|---|---|
| General impressions of the application | Interface is easy to navigate, straightforward, and contains relevant information. |
| Would you personally use this application? | Yes, especially for quick workouts using everyday items without needing a gym membership. |
| Are the calendar and saved list features beneficial? | The calendar and favorite workout tracking help monitor progress and identify helpful routines. |
| Additional features or functionality? | A goal-oriented feature and a way to track progress toward goals would be useful. |
| Primary strengths of the application | Ease of use and intuitive interface following the KISS principle. |
| Weaknesses or areas for improvement | Adding aerobic exercises or integration with exercise machines like treadmills or bikes could expand the audience. |

---

### Interview 3

**Interviewee:** Kathleen Mejia  
**Background:** Cal Poly Graduate – Visual Artist  
**Date:** February 1, 2026  
**Interviewer:** Tristan Mejia

| Question | Response |
|---|---|
| General impressions of the application | Simple webpage design without unnecessary distractions. Dropdown options make finding workouts easy. |
| Would you personally use this application? | Yes. It avoids subscription fees and simplifies finding workouts. Saving favorite workouts is a nice feature. |
| Are the calendar and saved list features beneficial? | The calendar helps track workout consistency and saved workouts allow users to revisit favorites. |
| Additional features or functionality | Ability to refresh for another workout option. Additional workout tools such as resistance bands, stretching, or cardio options would be useful. |
| Primary strengths of the application | Simplicity and accessibility for people of different ages. Workouts require minimal equipment. |
| Weaknesses or areas for improvement | Improve workout selection algorithm, allow refreshing workouts, offer multiple workout options, and enable full-screen video viewing. |

---

### Interview 4

**Interviewee:** Wenkang Wang  
**Background:** M.S. Student, Aeronautics & Astronautics – University of Washington – Endurance cyclist  
**Date:** February 1, 2026  
**Interviewer:** Samantha Wang

| Question | Response |
|---|---|
| General impressions of the application | Clean and well organized. |
| Would you personally use this application? | Yes, especially if the calendar syncs with customized workout recommendations and instruction videos. |
| Are the calendar and saved list features beneficial? | The calendar is useful for tracking consistency. Saved videos may not be necessary. |
| Additional features or functionality | Integration with workout equipment telemetry to track progress. |
| Primary strengths of the application | Strong visuals and clear messaging for target users. |
| Weaknesses or areas for improvement | Could benefit from AI features and more performance statistics or metrics. |


## Secondary User Elicitation Regarding Prototype 
### Bug Bash – GitHub Deployed Webpage; v0.0.1-bugbash
**Users:** UW CSS 360 (Software Engineering) Students 

**Date:** March 4, 2026  

---

<details>
<summary><strong>P0 – Critical Issues</strong></summary>

| Issue | Type | Expected vs Actual | Environment | Resolution |
|---|---|---|---|---|
| Updating progress across platforms with the same account | Functional | Expected shared progress across the same account. Actual behavior shows no previous workout data. | Windows Chrome, Chrome Incognito, Chrome iOS | Expected behavior. No shared database so all data is stored on the user's LocalStorage in their browser. Changing browsers/devices does not have synced data storage |
| Workout logged even if video watched briefly | UX | Expected workout to log only when completed. Actual: watching video for 1–3 seconds logs a workout. | Chrome | Fixed – Added **Log Workout** button |
| Unable to view profile information | UI | Expected profile information when clicking username. Actual profile information not visible. | macOS Chrome | Fixed – Added profile page |

</details>

---

<details>
<summary><strong>P1 – Important Issues</strong></summary>

| Issue | Type | Expected vs Actual | Environment | Resolution |
|---|---|---|---|---|
| Equipment selection goes off screen on mobile | UI | Expected components to stay within screen bounds. Actual components overflow screen. | Chrome Mobile (S25) | Fixed – Updated mobile layout |
| Unable to log multiple workouts in the same day | Functional | Expected multiple workouts to be logged per day. Actual only latest workout saved. | Chrome | Fixed – Added manual **Log Workout** button |
| Various mobile UI issues | UI | Expected clean mobile layout. Actual navbar and text boxes misaligned. | iOS Chrome, iOS Safari | Fixed – Mobile layout improvements |
| Logout button disappears in small window | UI | Expected logout button to remain visible. Actual button disappears when window shrinks. | Browser | Fixed – Desktop flex layout adjustments |
| Video disappears on refresh | Functional | Expected selected workout and video to remain after refresh. Actual selections reset. | Chrome Windows 11 | Not Fixed - Logic based. Refreshing the page refreshes the logic. |

</details>

---

<details>
<summary><strong>P2 – Nice to Have Issues</strong></summary>

| Issue | Type | Expected vs Actual | Environment | Resolution |
|---|---|---|---|---|
| Session does not persist when removing `.html` from URL | Functional | Expected login session to persist. Actual user logged out. | MacOS Chrome | Not fixable – Firebase only loads on application pages |
| White box overlay while scrolling | UI | Expected no overlay. Actual white box occasionally appears. | macOS Chrome | Unable to recreate |
| Email link does not open email client | UI | Expected email link to open mail client. Actual plain text email. | iOS Chrome | Fixed – Converted to `mailto:` link |
| Navigation bar hidden before login | UX | Expected navigation visible before login. | macOS Firefox | Intentional design |
| Only last 14 days of activity visible | UX | Expected option to view full history. | Chrome | Not worth fixing. Designed as n=14 intentionally. |

</details>

---

<details>
<summary><strong>P3 – Minor Issues</strong></summary>

| Issue | Type | Expected vs Actual | Environment | Resolution |
|---|---|---|---|---|
| Inconsistent UI alignment | UI | Expected navbar to span entire width. Actual slight shift. | Chrome, Vivaldi | Fixed – Updated navigation layout |
| Grammar issue in streak text | UI | Expected “1 day”. Actual “1 days”. | Chrome | Fixed – Conditional text in JS |
| Inconsistent instructions on workout page | UI | Button label did not match instructions. | Chrome | Fixed |
| Calendar misalignment on resize | UI | Expected calendar cells to scale correctly. Actual overflow occurs. | Firefox Windows | Fixed – Adjusted calendar dimensions |
| Advertisement resets when switching workouts | UX | Expected ad to continue. Actual ad restarts. | macOS Chrome | Not fixable – Controlled by YouTube |
| Error when exiting login popup | UX | Expected no blocking error. | macOS Firefox | Not fixable – Firebase authentication behavior |
| Logo not clickable | UI | Expected logo to link to homepage. | Chrome | Fixed – Linked logo to `index.html` |

</details>

---

<details>
<summary><strong>Duplicate Reports</strong></summary>

| Issue | Type | Notes |
|---|---|---|
| Unable to view profile information | UI | Duplicate of P0 issue |
| Wiggle room for webpage width | UI | Duplicate layout issue |
| Multiple workouts per day | Functional | Duplicate logging issue |
| Grammar issue in streak text | UI | Duplicate grammar issue |
| Popup login error | Functional | Duplicate authentication behavior |
| Workout presets disappear on refresh | UX | Duplicate workout logic behavior |

</details>


