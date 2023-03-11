import React, { useEffect, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import TaskInputField from './components/TaskInputField';
import TaskItem from './components/TaskItem';
import axios from 'axios';

export default function App() {
  useEffect(() => {
    getTasks()
  }, [])
  const [tasks, setTasks] = useState([]);
  const [load, setLoad] = useState(false);
  const getTasks = async () => {
    setLoad(true)
    try {
      let { data } = await axios.get('http://192.168.82.113:3001/api/todos');
      // console.log({ data })
      setTasks(data)
      setLoad(false)
    } catch (error) {
      console.log({ error })
    }
  }

  const addTask = async (task) => {
    if (task == null) return;
    Keyboard.dismiss();
    try {
      const { data } = await axios.post('http://192.168.82.113:3001/api/todos', { action: task, done: false });
      if (data) {
        getTasks()
      }
    } catch (error) {
      console.log({ error })
    }
  }
  const TaskDone = async (item) => {
    try {
      const { data } = await axios.put('http://192.168.82.113:3001/api/todos', { id: item._id, done: !item.done });
      if (data) {
        getTasks()
      }
    } catch (error) {
      console.log({ error })
    }
  }
  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(`http://192.168.82.113:3001/api/todos/${id}`)
      if (data) {
        getTasks()
      }
    } catch (error) {
      console.log('delete err ', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo LIST</Text>
      {load ?
        <ActivityIndicator style={{ marginTop: 100 }} size='large' color="#0000ff" animating={load} /> :
        <ScrollView style={styles.scrollView}>
          {
            tasks.map((task, index) => {
              return (
                <View key={index} style={styles.taskContainer}>
                  <TaskItem index={index + 1} task={task} deleteTask={() => deleteTask(task?._id)} TaskDone={() => TaskDone(task)} />
                </View>
              );
            })
          }
        </ScrollView>}
      <TaskInputField addTask={addTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1A3C',
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  }
});