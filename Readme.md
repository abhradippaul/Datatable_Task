# Task Management System

A simple task management application built with React and Tailwind CSS, featuring task listing, task details, and task editing functionalities.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abhradippaul/Task-Management-System
   cd task-manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Tailwind CSS:**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

4. **Configure Tailwind CSS:**
   - Update `tailwind.config.js`:
     ```javascript
     module.exports = {
       content: [
         "./src/**/*.{js,jsx,ts,tsx}",
       ],
       theme: {
         extend: {},
       },
       plugins: [],
     }
     ```

   - Create and configure `src/index.css`:
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

   - Import `index.css` in `src/index.js`:
     ```javascript
     import './index.css';
     ```

5. **Start the development server:**
   ```bash
   npm start
   ```

## Usage

### Task List View

Displays a list of tasks with their title, description, status, and due date. Click on a task to view details.

### Task Detail View

Displays detailed information about a selected task, including an edit button to modify the task.

### Task Form View

A form to create a new task or edit an existing task, including fields for title, description, status, and due date.

## Features

- **Responsive Design**: Uses Tailwind CSS for a responsive and modern UI.
- **Task Management**: Create, read, and update tasks.
- **React Router**: Navigation between different views.

