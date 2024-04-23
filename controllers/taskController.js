
import Task from "../modules/Task.js"; 


// Маршрут для отримання всіх задач
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Маршрут для створення нової задачі
export const createTask = async (req, res) => {
    const task = new Task(req.body);
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
      const taskId  = req.params.id;
      const task = await Task.findByIdAndDelete(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json({ message: 'Task deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};
export const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { title } = req.body;

    try {
        // Ищем задачу по идентификатору и обновляем ее поля
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title},
            { new: true } // Возвращаем обновленный объект задачи
        );

        if (!updatedTask) {
            // Если задача не найдена, отправляем соответствующий статус и сообщение об ошибке
            return res.status(404).json({ error: 'Task not found' });
        }

        // Отправляем обновленную задачу в ответ
        res.status(200).json(updatedTask);
    } catch (error) {
        // В случае ошибки сервера отправляем соответствующий статус и сообщение об ошибке
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

