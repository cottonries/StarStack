![Playwright Tests](https://github.com/cottonries/StarStack/actions/workflows/playwright.yml/badge.svg) 

# StarStack

StarStack is a cardio-focused fitness website designed to help users find workouts that fit their individual needs. The site will use user-based interaction to select workout criteria such as intensity level and workout type. Based on these selections, StarStack will display an embedded YouTube video that matches the chosen criteria, allowing users to quickly access guided cardio workouts without needing to search manually.

The goal of the site is to make starting a workout easy by removing the need to search through multiple videos or platforms. Users can log in with their Google account, choose the type of workout they want, and track their progress over time.

---

## How to Use StarStack
1. Open the site and click **Start Now** to sign in using your Google account.
2. After logging in, you will be redirected to the **Home page**.
3. Navigate to the **Workout page** and select your workout **intensity** and **equipment type**.
4. Click **Find Workout** to load a guided workout video.
5. After completing a workout, click **Log Workout** to the bottom right of the video player record it.
6. Visit the **Progress page** to see your workout history and streak visualization.
7. Click on your **profile icon** in the top right corner to view additional account information or log out.

---

### Key Features
- **Google Authentication Login** – Secure login using a Google account through Firebase Authentication.
- **Workout Selection System** – Choose workouts based on intensity level and available equipment.
- **Embedded Workout Videos** – Watch guided workout videos directly within the site.
- **Workout Logging** – Record completed workouts to track progress.
- **Progress Tracking** – Visualize workout history through a calendar and streak chart.
- **User Profile Information** – Displays user details such as name, email, and account creation date, as well as the ability to log out of the website.
- **Responsive Interface** – Works across different screen sizes and browsers.
  
---

## Access the Site
https://cottonries.github.io/StarStack/

---

## Running Tests Locally

StarStack includes automated end-to-end tests using Playwright.  
Follow the steps below to run the tests on your machine.

1. Clone the repository
```bash
git clone https://github.com/cottonries/StarStack.git
cd StarStack
```
2. Install project dependencies
```bash
npm install
```
3. Install Playwright browsers
```bash
npx playwright install
```
4. Start a local web server (The Playwright tests expect the site to be running locally.)
```bash
python3 -m http.server 8000
```
*The site will now be available at: http://127.0.0.1:8000*

5. Run the Playwright test suite (Open a new terminal window in the project directory and run:)
```bash
npx playwright test
```
6. View the HTML test report
```bash
npx playwright show-report
```

---
### User Data Storage

This application is designed with user privacy in mind. We do not store personal user data on our servers. All application-specific data is stored directly in your browser's local storage. This means your data remains entirely on your device and is not transmitted to us. Please note that if you clear your browser's data, this information will be removed.

For security and operational purposes, Firebase Authentication records anonymous login activity, such as successful sign-ins and last login times, which are visible to administrators in the Firebase console. This helps us monitor the health and security of our authentication system.

---

### AI Assistance Disclosure

ChatGPT (OpenAI) was used as a debugging and development assistant for:
- JavaScript logic troubleshooting
- Integrating Firebase
- YouTube iframe embed configuration
- GitHub Pages deployment debugging

All final implementation decisions and testing were completed by the StarStack team.
