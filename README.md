# QuickNotes Frontend

## 🚀 Project Description
QuickNotes is a lightweight, responsive note-taking application built with React. Users can register, log in, and create, view, edit, or delete personal notes. Each note supports a title, body content, and optional tags for easy organization. Client-side routing, form validation, and toast notifications ensure a smooth UX.

## 🧰 Tech Stack
- **React** – Component-based UI library  
- **React Router v6** – Client-side routing  
- **TanStack Query (React Query)** – Server state management, data fetching & caching  
- **Axios** – Promise-based HTTP client  
- **React Hook Form** + **Zod** – Declarative form handling & schema validation  
- **Tailwind CSS** – Utility-first styling framework  
- **React Toastify** – Toast notifications for user feedback  
- **Lucide React** – Icon components  

## 📋 Prerequisites
- **Node.js** v14+ (LTS recommended)  
- **npm** v6+ or **Yarn** v1.22+ / **pnpm** v7+

## ⚙️ Setup & Run Locally

1. **Clone the repo**  
   ```bash
   git clone https://github.com/aniket-969/QuickNoteFrontend.git

## Install dependencies
npm install
## or
yarn install
## or
pnpm install

## Create environment file
.env(in root)

VITE_API_BASE_URL = http://localhost:3000/api/v1

## Open the project in VS Code
code .

## Start the development server
npm run dev

# 📡 API Documentation

- **POST** `/auth/register`  
  Register a new user

- **POST** `/auth/login`  
  Log in and receive an access token

- **GET** `/auth/session`  
  Get current user session

- **POST** `/auth/logout`  
  Log out the current user

- **GET** `/notes`  
  Fetch all notes for the authenticated user

- **GET** `/notes/:id`  
  Fetch a single note by its ID

- **POST** `/notes`  
  Create a new note

- **PATCH** `/notes/:id`  
  Update an existing note

- **DELETE** `/notes/:id`  
  Delete a note by its ID
