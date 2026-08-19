# TaskFlow QA – Playwright Automation Portfolio

A full-stack task management application built with **React, Laravel, MySQL, and Playwright** to demonstrate end-to-end testing, Page Object Model (POM), and QA automation practices.

> Built as a portfolio project to showcase practical QA automation skills beyond writing isolated Playwright scripts.

---

## Why I Built This

Most Playwright beginner projects automate existing websites. I wanted to build my own application and test it like a QA Automation Engineer would in a real development environment.

This project demonstrates:

- End-to-End testing with Playwright
- Page Object Model (POM)
- UI automation against a real React application
- Laravel API integration
- MySQL-backed CRUD operations
- Authentication testing
- Test reports with screenshots, videos, and traces

---

## Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Backend | Laravel 13 |
| Database | MySQL |
| Authentication | Laravel Sanctum |
| Testing | Playwright |
| Reports | HTML Report + Video + Trace |

---

## Features

### Application

- User Registration
- User Login / Logout
- Protected Dashboard
- Create Tasks
- Edit Tasks
- Delete Tasks
- Light/Dark Mode
- Skeleton Loading
- Toast Notifications

### Playwright Test Suite

- Login Test
- Logout Test
- Protected Route Test
- Create Task Test
- Edit Task Test
- Delete Task Test
- Rapid Click (Duplicate Submission) Test

---

## Project Structure

```text
taskflow-qa/
├── backend/          # Laravel API
├── frontend/         # React application
├── tests/
│   ├── auth/
│   ├── navigation/
│   ├── tasks/
│   ├── pages/        # Page Object Model
│   └── utils/
├── playwright.config.js
└── README.md
```

---

## Installation Guide

### Prerequisites

- Node.js 20+
- PHP 8.3+
- Composer
- MySQL
- Git

---

## Clone the Repository

```bash
git clone https://github.com/ElReyDeLosGorditos/taskflow-qa.git
cd taskflow-qa
```

---

## Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

### Configure MySQL

Edit `backend/.env`

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=taskflowqa
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Run migrations and seed the test user.

```bash
php artisan migrate
php artisan db:seed
```

Start Laravel.

```bash
php artisan serve
```

Expected:

```text
Server running on http://127.0.0.1:8000
```

---

## Frontend Setup

Open another terminal.

```bash
cd frontend
npm install
npm run dev
```

Expected:

```text
http://localhost:5173
```

---

## Playwright Setup

Back in the project root.

Install dependencies.

```bash
npm install
npm install -D dotenv
```

Install browsers.

```bash
npx playwright install
```

Create a root `.env`

```env
PLAYWRIGHT_EMAIL=test@example.com
PLAYWRIGHT_PASSWORD=password123
PLAYWRIGHT_BASE_URL=http://localhost:5173
```

---

## Running Tests

Run every test.

```bash
npx playwright test
```

Run a single suite.

```bash
npx playwright test tests/auth/login.spec.js
```

Watch the browser.

```bash
npx playwright test --headed
```

Use Playwright UI Mode.

```bash
npx playwright test --ui
```

---

## Test Evidence

After running tests:

```bash
npx playwright show-report
```

The report includes:

- HTML Report
- Screenshots
- Videos
- Trace Viewer

Generated files appear in:

```text
playwright-report/
test-results/
```

---

## Test Account

The Laravel seeder automatically creates:

| Field | Value |
|--------|--------|
| Email | test@example.com |
| Password | password123 |

This account is intended for automated testing.

---

## Example Test Scenarios

| Test | Expected Result |
|------|-----------------|
| Login | Redirect to Dashboard |
| Logout | Return to Login page |
| Protected Route | Redirect unauthenticated users |
| Create Task | One task is created |
| Edit Task | Updated task appears |
| Delete Task | Task disappears |
| Rapid Click | Only one task is created |

---

## Page Object Model

The Playwright suite uses POM to keep tests maintainable.

Example:

```javascript
const loginPage = new LoginPage(page);

await loginPage.goto();
await loginPage.login();
```

Instead of repeating selectors across every test, page interactions are centralized inside reusable page classes.

---

## Future Improvements

- GitHub Actions CI
- API testing with Playwright
- Storage State authentication
- Parallel test optimization
- Accessibility testing
- Performance testing

---

## Author

**John Lawrence C. Regis**

BSIT Graduate | QA Automation & Full-Stack Development Portfolio

GitHub: **ElReyDeLosGorditos**