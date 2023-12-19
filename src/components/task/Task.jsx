import { Card } from 'antd'
import React from 'react'

const Task = ({task}) => {
    return (
        <Card
            style={{
                width: 300,
                margin: '10px 0 10px 0'
            }}
            size='small'
        >
            <p>{task.name}</p>
        </Card>
    )
}

export default Task