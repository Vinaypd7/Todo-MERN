import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default TaskItem = ({ index, task, TaskDone, deleteTask }) => {
    return (
        <View style={styles.container}>
            <View style={styles.indexContainer}>
                <Text style={styles.index}>{index}</Text>
            </View>
            <View style={styles.taskContainer}>
                <Text style={styles.task}>{task?.action}</Text>
                <TouchableOpacity onPress={() => TaskDone()}>
                    <Icon style={styles.delete} name={task?.done ? "check-box" : "check-box-outline-blank"} size={18} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTask()}>
                    <Icon style={styles.delete} name="delete" size={18} color='#fff' />
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    indexContainer: {
        backgroundColor: '#3E3364',
        borderRadius: 12,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
    index: {
        color: '#fff',
        fontSize: 20,
    },
    taskContainer: {
        backgroundColor: '#3E3364',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: 50,
    },
    task: {
        color: '#fff',
        width: '75%',
        fontSize: 16,
    },
    delete: {
        marginLeft: 10,
    },
});