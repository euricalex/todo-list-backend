import Task from "../modules/Task.js"; 

export const getSubtasksByTaskId = async (req, res) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task.subtasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Контролер для створення нової підзадачі
  export const createSubtask = async (req, res) => {
    const { taskId } = req.params;
    const { title, description } = req.body;
  
    try {
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      const newSubtask = {
        title,
        description,
      };

      task.subtasks.push(newSubtask);
      await task.save();
  
      res.status(201).json(newSubtask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };  

