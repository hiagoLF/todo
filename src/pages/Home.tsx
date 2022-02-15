import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, KeyboardAvoidingViewBase, KeyboardAvoidingViewComponent, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

type HandleEditTaskProps = {
  taskId: number,
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskIndex = tasks.findIndex(task => task.title === newTaskTitle)
    if (taskIndex !== -1) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return
    }
    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks([...tasks, task])
  }

  function handleToggleTaskDone(id: number) {
    const newTaskList = tasks.map(task => ({
      ...task,
      done: (id === task.id) ? !task.done : task.done
    }))
    setTasks(newTaskList)
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que deseja remover este ítem?', [
      {
        text: "Não",
        style: "cancel"
      },
      {
        text: "Sim", onPress: () => {
          const newTaskList = tasks.filter(task => !(task.id === id))
          setTasks(newTaskList)
        }
      }
    ])
  }

  function handleEditTask({ taskId, taskNewTitle }: HandleEditTaskProps) {
    const newTaskList = tasks.map(task => ({
      ...task,
      title: taskId === task.id ? taskNewTitle : task.title
    }))
    setTasks(newTaskList)
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})