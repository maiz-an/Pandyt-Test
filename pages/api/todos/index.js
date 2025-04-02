import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const todosCollection = db.collection('todos');

  if (req.method === 'GET') {
    // Retrieve all todos from the database
    try {
      const todos = await todosCollection.find({}).toArray();
      return res.status(200).json(todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
      return res.status(500).json({ message: 'Failed to fetch todos' });
    }
  } else if (req.method === 'POST') {
    // Add a new todo to the database
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newTodo = {
      title,
      description: description || '',
      completed: false,
      created_at: new Date().toISOString(),
    };

    try {
      const result = await todosCollection.insertOne(newTodo);
      // Changed from returning a manually created object with 'id' to using MongoDB's auto-generated '_id'
      // Old code used a custom 'id: Date.now()', new code uses MongoDB's ObjectId (_id) as the identifier
      return res.status(201).json({ _id: result.insertedId, ...newTodo }); 
    } catch (error) {
      console.error('Error adding todo:', error);
      return res.status(500).json({ message: 'Failed to add todo' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}