#skillhub Freelance Marketplace

SkillHub is a freelance marketplace platform designed to connect clients and freelancers, optimized for both web and mobile. It provides a seamless and secure environment for job postings, bids, payments, and professional collaboration.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [File Structure](#file-structure)
- [Setup Instructions](#setup-instructions)
- [Running the Project](#running-the-project)
- [Contribution Guidelines](#contribution-guidelines)
- [Project Board](#project-board)
- [License](#license)

## Features
- **User Authentication** (Sign Up, Login)
- **User Profiles** (Client & Freelancer)
- **Job Posting & Bidding System**
- **Secure Payments & Wallet**
- **Messaging System**
- **Review & Rating System**
- **Mobile-Responsive Design**

## Tech Stack

**Frontend:**
- Framework: React.js (Web), React Native (Mobile)
- State Management: Redux Toolkit
- Styling: Tailwind CSS (Web), Styled Components (Mobile)
- Navigation: React Router (Web), React Navigation (Mobile)

**Backend:**
- Framework: Node.js + Express.js
- Database: MongoDB (Mongoose ORM)
- Authentication: JWT + OAuth (Google/Facebook)
- Payment: Stripe API

**Tools:**
- Code Editor: VS Code
- API Testing: Postman
- Version Control: Git + GitHub
- Deployment: Vercel (Web), Netlify (Web), AWS Amplify (Mobile Backend)

## File Structure
```
SkillHub/
|-- backend/
|   |-- config/
|   |-- controllers/
|   |-- models/
|   |-- routes/
|   |-- utils/
|   |-- server.js
|
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- pages/
|   |   |-- redux/
|   |   |-- utils/
|   |   |-- App.js
|   |   |-- index.js
|
|-- mobile/
|   |-- components/
|   |-- screens/
|   |-- navigation/
|   |-- App.js
|
|-- .env
|-- README.md
```

## Setup Instructions
1. **Clone the repository:**
```
git clone https://github.com/willieaugustine/skillhub.git
```

2. **Navigate to the project directory:**
```
cd skillhub
```

3. **Setup backend:**
```
cd backend
npm install
```

4. **Setup frontend:**
```
cd frontend
npm install
```

5. **Setup mobile:**
```
cd mobile
npm install
```

6. **Configure environment variables:**
Create a `.env` file in the backend, frontend, and mobile directories with the necessary environment variables.

## Running the Project
**Backend:**
```
cd backend
npm start
```

**Frontend:**
```
cd frontend
npm start
```

**Mobile:**
```
cd mobile
npx expo start
```

## Contribution Guidelines
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## Project Board
We use a Kanban-style project board on GitHub:
- **To Do:** Planned tasks and features.
- **In Progress:** Tasks currently being worked on.
- **Review:** Tasks ready for code review.
- **Done:** Completed and merged tasks.

## License
This project is licensed under the MIT License.

