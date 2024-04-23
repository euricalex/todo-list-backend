import express from "express";
import cors from 'cors'
import app from './server.js'
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { createTask, deleteTask, getAllTasks, updateTask } from "./controllers/taskController.js";
import { createSubtask, getSubtasksByTaskId } from "./controllers/subTasksController.js";

app.use(express.json());

dotenv.config();
const URL = process.env.URL;

mongoose.connect(URL)
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

  app.use(cors());

  app.get('/tasks', getAllTasks);

  app.post('/tasks', createTask);
  app.get('/tasks/:taskId/subtasks', getSubtasksByTaskId);
  app.post('/tasks/:taskId/subtasks', createSubtask);
  app.delete('/tasks/:id', deleteTask);
  app.put('/tasks/:id', updateTask)
  
  