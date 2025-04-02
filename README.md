# Full Stack Developer Technical Assessment

This is a Next.js project bootstrapped with `create-next-app`. You'll be building a complete Todo application to demonstrate your full stack development skills.

## Assessment Overview

In this technical assessment, you will implement a fully functional Todo application with CRUD operations. This project will test your abilities across the entire stack:

- **Frontend**: React components, state management, UI/UX design
- **Backend**: API routes, data handling
- **Integration**: Connecting frontend and backend seamlessly

## Requirements

### Core Features

Your Todo application must implement:

1. Create - Add new todos with title and description
2. Read - Display a list of all todos
3. Update - Edit existing todos (title, description, completion status)
4. Delete - Remove todos from the list
5. Toggle Status - Mark todos as complete/incomplete

### Technical Requirements

#### Frontend
- Implement responsive React components
- Create forms for adding and editing todos
- Handle loading, error, and empty states
- Implement proper state management

#### Backend
- Create API routes for all CRUD operations
- Implement proper error handling
- For this assessment, use in-memory storage (the structure is provided)

#### Code Quality
- Write clean, maintainable code
- Add appropriate comments
- Follow best practices for component structure
- Implement proper validation and error handling

## Getting Started

1. Clone or download this repository:
   ```bash
   assessment
   ```

2. Install dependencies:
   ```bash
   npminstall
   ```

3. Run the development server:
   ```bash
   npm rundev
   ```

4. Open http://localhost:3000 with your browser to see the starter template.

## Project Structure

The codebase is structured as follows:

- `/pages` - Contains Next.js pages and API routes
  - `/api/todos` - API endpoints for todo operations
  - `/index.js` - Main application page
- `/components` - React components for the Todo application
- `/styles` - CSS modules for styling

## Tasks to Complete

You'll need to implement code in the following files (look for comments with "TODO" instructions):

### API Routes:
- `pages/api/todos/index.js` - Implement GET (list all) and POST (create) endpoints
- `pages/api/todos/[id].js` - Implement GET (single), PUT (update), and DELETE endpoints

### React Components:
- `pages/index.js` - Main page with state management and API calls
- `components/TodoList.js` - Display todos and handle interactions
- `components/AddTodoForm.js` - Form for creating new todos
- `components/EditTodoModal.js` - Modal for editing todos

## Tips for Success

- Read the entire codebase before starting to understand how components interact
- Pay attention to the comments for guidance on what needs to be implemented
- Test thoroughly - ensure all features work as expected
- Error handling is crucial - handle network errors, validation, etc.
- UI/UX matters - create a pleasant user experience

## Evaluation Criteria

Your submission will be evaluated based on:

1. Functionality - Does the application work as specified?
2. Code Quality - Is the code clean, well-structured, and maintainable?
3. Error Handling - How well does the application handle errors?
4. UI/UX Design - Is the interface intuitive and responsive?
5. Problem Solving - How did you approach and solve the challenges?

## Submission

When you've completed the assessment:

- Ensure all code is working properly
- Provide a brief write-up of your implementation decisions
- Package your solution as directed by your hiring manager
- Include any setup instructions if you've added dependencies

## Time Expectation

You should aim to complete this assessment within 3-4 hours. Focus on core functionality first, then polish if time permits.

Good luck! We're excited to see what you build.