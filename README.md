# CHANGES.md

Here’s what I changed in the todo app:

### TodoList Component (`TodoList.js`)
- **What Changed**: The delete button used `todo.id` before, now it uses `todo._id`.
- **Why**: The old app used a number ID (`id`), but now we use MongoDB, which gives todos a special ID called `_id`.

### Home Page (`Home.js`)
- **What Changed**: 
  - Changed `id` to `_id` in `toggleTodoStatus`, `deleteTodo`, and `updateTodo`.
  - Added a "Are you sure?" popup before deleting.
  - Added a little message (notification) that shows for 3 seconds when you add, update, or delete a todo.
- **Why**: 
  - Switched to `_id` because we use MongoDB now, not a simple list.
  - Added the popup so you don’t delete by accident.
  - Added messages so you know what’s happening (like "Todo added!").

### Todos API - List and Add (`todos/index.js`)
- **What Changed**: 
  - Old code kept todos in a list in memory with `id`.
  - New code uses MongoDB and gives todos `_id`.
- **Why**: The old way was fake for testing. Now we use a real database (MongoDB) to save todos.

### Todos API - Get, Update, Delete (`todos/[id].js`)
- **What Changed**: 
  - Old code checked a memory list with `id`.
  - New code uses MongoDB with `_id`.
- **Why**: We switched from a fake list to MongoDB, so we use `_id` now.

### MongoDB Connection (`lib/mongodb.js`)
- **What Changed**: Added this new file.
- **What It Does**: Connects the app to MongoDB.
- **Why**: We need it to talk to MongoDB since we don’t use a fake list anymore.

### Environment File (`.env.local`)
- **What Changed**: Added this new file.
- **What It Does**: Holds the MongoDB address (like a link and password).
- **Why**: The app needs to know where MongoDB is to connect.

### Big Picture
- **Old Way**: The app used a pretend list in memory with `id`.
- **New Way**: The app uses MongoDB with `_id` to save todos for real.
- **Why**: To make the app better with a real database and add nice things like messages and delete checks.

