import { PlusOutlined } from '@ant-design/icons'
import { Button, Flex, Input, Popover, Tooltip } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { refreshTaskTodoListAction } from '../../redux/AuthActions'
import { addTaskTodoList } from '../../api/ApiCalls'

const AddTaskTodoListButton = ({ taskId }) => {

    const dispatch = useDispatch();
    const [apiProgress, setApiProgress] = useState(false);
    const [value, setValue] = useState();
    const [open, setOpen] = useState(false);
    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const onAddTaskTodoList = async () => {
        try {

            setApiProgress(true);
            const data = {
                title: value,
                taskId
            }
            const response = await addTaskTodoList(data);
            dispatch(refreshTaskTodoListAction(true));
            console.log(response.data)
            setApiProgress(false);
            setValue();
            hide();
        } catch (error) {
            setApiProgress(false);
            
        }
    }

    const MoreActions = (id) => (
        <div>
            <Input onChange={(e) => setValue(e.target.value)} value={value} style={{ width: 200 }} placeholder='Liste adı' />
            <Flex style={{ marginTop: 5 }}>
                <Button loading={apiProgress} onClick={onAddTaskTodoList} style={{ marginRight: 5 }} type='primary'>Kaydet</Button>
                <Button onClick={hide}>İptal et</Button>
            </Flex>
        </div>
    );

    return (
        <Tooltip title="Liste ekle">
            <Popover
                content={() => MoreActions()}
                placement="bottomLeft"
                trigger="click"
                arrow={false}
                open={open}
                onOpenChange={handleOpenChange}>
                <Button icon={<PlusOutlined />} />
            </Popover>
        </Tooltip>
    )
}

export default AddTaskTodoListButton