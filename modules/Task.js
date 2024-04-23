import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    // Ссылка на подзадачи, используемая в качестве массива идентификаторов подзадач
    subtasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subtask' // Ссылка на модель подзадачи
    }],
    // Другие поля задачи
});

export default mongoose.model("Task", taskSchema);
