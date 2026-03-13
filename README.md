![Playwright Tests](https://github.com/cottonries/StarStack/actions/workflows/playwright.yml/badge.svg) 

# StarStack

StarStack is a cardio-focused fitness website designed to help users find workouts that fit their individual needs. The site will use user-based interaction to select workout criteria such as intensity level and workout type. Based on these selections, StarStack will display an embedded YouTube video that matches the chosen criteria, allowing users to quickly access guided cardio workouts without needing to search manually.

## Live Demo
https://cottonries.github.io/StarStack/

<video width="700" controls>
  <source src="SR_Workout.mp4" type="video/mp4">
</video>

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

## AI Assistance Disclosure

ChatGPT (OpenAI) was used as a debugging and development assistant for:
- JavaScript logic troubleshooting
- Integrating Firebase
- YouTube iframe embed configuration
- GitHub Pages deployment debugging

All final implementation decisions and testing were completed by the StarStack team.
