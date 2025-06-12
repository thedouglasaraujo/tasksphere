import React from 'react'
import { List } from '@mui/material'
import TaskListItem from '../../molecules/TaskListItem'

export default function TaskList({ tasks }) {
    return (
        <List>
            {tasks.map(task => (
                <TaskListItem key={task.id} task={task} />
            ))}
        </List>
    )
}
