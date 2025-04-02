import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb'; // Import ObjectId for MongoDB queries

export default async function handler(req, res) {
  const { id } = req.query; // Get the todo ID from the URL
  const client = await clientPromise;
  const db = client.db();
  const todosCollection = db.collection('todos');

  if (req.method === 'GET') {
    // Get a specific todo by ID
    try {
      const todo = await todosCollection.findOne({ _id: new ObjectId(id) }); // Changed from numeric 'id' to MongoDB's '_id' with ObjectId
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      return res.status(200).json(todo);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch todo' });
    }
  } else if (req.method === 'PUT') {
    // Update the todo
    const { title, description, completed } = req.body;
    try {
      const updatedTodo = await todosCollection.findOneAndUpdate(
        { _id: new ObjectId(id) }, // Changed from numeric 'id' to MongoDB's '_id' with ObjectId
        {
          $set: {
            title,
            description,
            completed,
            updated_at: new Date().toISOString(),
          },
        },
        { returnDocument: 'after' } // Return the updated document
      );

      if (!updatedTodo.value) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      return res.status(200).json(updatedTodo.value);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update todo' });
    }
  } else if (req.method === 'DELETE') {
    // Delete the todo
    try {
      const result = await todosCollection.deleteOne({ _id: new ObjectId(id) }); // Changed from numeric 'id' to MongoDB's '_id' with ObjectId
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      return res.status(200).json({ message: 'Todo deleted' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete todo' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}