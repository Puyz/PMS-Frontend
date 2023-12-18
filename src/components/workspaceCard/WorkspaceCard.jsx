import { Card, message, Popconfirm } from 'antd'
import React from 'react'
import './WorkspaceCard.css'
import { DeleteOutlined } from '@ant-design/icons'
import { deleteWorkspace } from '../../api/ApiCalls'
import { useDispatch, useSelector } from 'react-redux'
import { refreshWorkspaceAction } from '../../redux/AuthActions'
import EditWorkspaceButton from '../editWorkspaceButton/EditWorkspaceButton';
import { useNavigate } from 'react-router-dom'

const WorkspaceCard = ({ workspace }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userId } = useSelector((store) => {
        return {
            userId: store.id
        }
    });

    const confirm = async (e) => {
        await deleteWorkspace(workspace.id);
        dispatch(refreshWorkspaceAction(true));
        message.success('Çalışma alanı silindi');
    };

    return (
        <Card
            style={{
                width: 600,
                margin: 'auto',
                marginBottom: 20,
                borderLeft: '5px solid indigo',
                cursor: 'pointer'
            }}
            
        >
            <div className='left' onClick={() => { navigate(`/workspace/${workspace.id}`) }}>
                <h3>{workspace.name}</h3>
                <p>{workspace.description}</p>
            </div>
            {userId === workspace.createdUserId &&
                <div className="right">
                    <EditWorkspaceButton workspace={workspace}/>
                    <Popconfirm
                        title="Uyarı"
                        description="Çalışma alanını silmek istediğinizden emin misiniz?"
                        onConfirm={confirm}
                        okText="Evet"
                        cancelText="Hayır"
                    >
                        <DeleteOutlined style={{ fontSize: 16 }} />

                    </Popconfirm>
                </div>
            }
        </Card>
    )
}

export default WorkspaceCard