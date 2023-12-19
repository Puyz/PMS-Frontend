import React from 'react';
import { EditOutlined, DeleteOutlined, ClockCircleOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Card, Popconfirm, message } from 'antd';
import './BoardCard.css';
import moment from 'moment';
import { deleteBoard } from '../../api/ApiCalls';
import { refreshBoardAction } from '../../redux/AuthActions';
import { useDispatch, useSelector } from 'react-redux';
import EditBoardButton from '../editBoardButton/EditBoardButton';
import { useNavigate } from 'react-router-dom';

const BoardCard = ({ board }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId } = useSelector((store) => {
    return {
      userId: store.id
    }
  });

  const confirm = async (e) => {
    await deleteBoard(board.id);
    dispatch(refreshBoardAction(true));
    message.success('Pano silindi');
  };

  return (
    <Card
      style={{
        width: 300,
        borderTop: '2px solid orange',
        cursor: 'pointer'
        
      }}
      actions={userId === board.createdUserId && [
        <EditBoardButton board={board} />,
        <Popconfirm
          title="Uyarı"
          description="Panoyu silmek istediğinizden emin misiniz?"
          onConfirm={confirm}
          okText="Evet"
          cancelText="Hayır"
        >
          <DeleteOutlined key="delete" />
        </Popconfirm>
      ]}

    >
      <div className='boardInfo' onClick={() => {navigate(`/board/${board.id}`)}}>
        <h3>{board.name}</h3>
        <p><ClockCircleOutlined /> {moment(board.endDate).format('DD-MM-YYYY')}</p>
        {board.privateToWorkspaceMember ? <LockOutlined className='lock' /> : <UnlockOutlined className='lock' />}
      </div>

    </Card >
  )
}

export default BoardCard