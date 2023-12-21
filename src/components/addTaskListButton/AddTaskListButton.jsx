import { Button, Input } from 'antd'
import React, { useState } from 'react'
import './AddTaskListButton.css';
import { CloseOutlined } from '@ant-design/icons';
import { addTaskList } from '../../api/ApiCalls';
import { useDispatch } from 'react-redux';
import { refreshBoardAction, refreshTaskAction } from '../../redux/AuthActions';

const AddTaskListButton = ({boardId}) => {

    const [onEdit, setOnEdit] = useState(false);
    const [value, setValue] = useState('');
    const dispatch = useDispatch();

    const onSubmit = async () => {
        const data = {
            boardId: boardId,
            name: value
        }
        await addTaskList(data);
        dispatch(refreshTaskAction(true));
        setOnEdit(false);
        setValue('');

    }
    return (
        <div>
            {!onEdit ?

                <Button className='addBtn' onClick={() => { setOnEdit(true) }}>Yeni liste oluştur</Button>

                :

                <div className='onEditArea'>
                    <Input className='text' placeholder='Liste başlığı girin' value={value} onChange={(e) => {setValue(e.target.value)}}/>
                    <Button className='createBtn' type="primary" onClick={onSubmit}>Oluştur</Button>
                    <CloseOutlined className='closeBtn' onClick={() => { setOnEdit(false); setValue('')  }}/>
                </div>

            }




        </div>
    )
}

export default AddTaskListButton