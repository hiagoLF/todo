import React, { useEffect, useRef, useState } from "react"
import { Fragment } from "react"
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import closeIcon from '../assets/icons/x-icon.png'
import editIcon from '../assets/icons/edit.png'

export interface Task {
    id: number;
    title: string;
    done: boolean;
}

type TaskItemProps = {
    index: Number;
    item: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void,
    editTask: (props: {
        taskId: number,
        taskNewTitle: string
    }) => void
}

export function TaskItem({ index, item, toggleTaskDone, removeTask, editTask }: TaskItemProps) {

    const [isEditing, setIsEditing] = useState(false)
    const [taskTitleEditing, setTaksTitleEditing] = useState(item.title)

    const textInputRef = useRef<TextInput>(null)

    useEffect(() => {
        if (isEditing) {
            textInputRef?.current?.focus()
        } else {
            textInputRef?.current?.blur();
        }
    }, [isEditing])

    function handleStartEditing() {
        setIsEditing(true)
    }

    function handleCancelEditing() {
        setIsEditing(false)
        setTaksTitleEditing(item.title)
    }

    function handleSubmitEditing() {
        editTask({
            taskId: item.id,
            taskNewTitle: taskTitleEditing
        })
        setIsEditing(false)
    }

    return (
        <Fragment>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(item.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {item.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>


                    <TextInput
                        value={taskTitleEditing}
                        onChangeText={setTaksTitleEditing}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        onBlur={handleCancelEditing}
                        style={item.done ? styles.taskTextDone : styles.taskText}
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>


            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {isEditing ? (
                    <TouchableOpacity
                        style={{ paddingHorizontal: 16 }}
                        onPress={handleCancelEditing}
                    >
                        <Image source={closeIcon} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={{ paddingHorizontal: 10 }}
                        onPress={handleStartEditing}
                    >
                        <Image source={editIcon} />
                    </TouchableOpacity>
                )}

                <View style={{ width: 1, height: 24, backgroundColor: 'rgba(196, 196, 196, 0.24)' }} />

                <TouchableOpacity
                    style={{ paddingHorizontal: 10 }}
                    onPress={() => removeTask(item.id)}
                    disabled={isEditing}
                >
                    <Image style={{ opacity: isEditing ? 0.4 : 1 }} source={trashIcon} />
                </TouchableOpacity>
            </View>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    }
})