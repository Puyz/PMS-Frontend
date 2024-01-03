import { DeleteOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Flex, Popconfirm } from 'antd'
import moment from 'moment'
import 'moment/locale/tr';
import React from 'react'
import { useSelector } from 'react-redux';
import { refreshTaskCommentsAction } from '../../redux/AuthActions';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../api/ApiCalls';

const TaskComment = ({ comment }) => {

    const dispatch = useDispatch();
    const { userId } = useSelector((store) => {
        return {
            userId: store.id
        }
    })

    const confirm = async (e) => {
        await deleteComment(comment.id);
        dispatch(refreshTaskCommentsAction(true));
    };

    return (
        <div style={{ marginBottom: 40 }}>
            <Flex style={{ alignItems: 'center', position: 'relative' }}>
                <Avatar
                    style={{
                        backgroundColor: '#87d068',
                    }}
                    icon={<UserOutlined />}
                />
                <h3 style={{ marginLeft: 10, color: 'gray' }}>{comment.user.name}</h3>
                <h5 style={{ marginLeft: 10, color: 'grey' }}>{moment(comment.createdDate).locale('tr').fromNow()}</h5>

                {comment.user.id === userId &&
                    <Popconfirm
                        title="Uyarı"
                        description="Yorumu silmek istediğinizden emin misiniz?"
                        onConfirm={confirm}
                        okText="Evet"
                        cancelText="Hayır"
                    >
                        <DeleteOutlined style={{ fontSize: 16, position: 'absolute', right: 10 }} />

                    </Popconfirm>
                }
            </Flex>

            <p style={{ marginLeft: 43, marginTop: 0 }}>{comment.content}</p>

        </div>
    )
}

export default TaskComment