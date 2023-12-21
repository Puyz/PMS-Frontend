import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import BoardList from '../../components/boardList/BoardList';
import { Col, Avatar, Divider, Tooltip, Row, Breadcrumb } from 'antd';
import { getAllWorkspaceMemberByWorkspaceId, getWorkspaceById } from '../../api/ApiCalls';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import AddBoardButton from '../../components/addBoardButton/AddBoardButton';

const Workspace = () => {
  const { id } = useParams(); // workspace id
  const [workspace, setWorkspace] = useState();
  const [workspaceMembers, setWorkspaceMembers] = useState([]);
  const [apiProgress, setApiProgress] = useState(false);


  useEffect(() => {
    async function getWorkspace() {
      setApiProgress(true);
      try {
        const response = await getWorkspaceById(id);
        setWorkspace(response.data.data);
      } finally {
        setApiProgress(false);
      }
    }

    async function getWorkspaceMembers() {
      setApiProgress(true);
      try {
        const response = await getAllWorkspaceMemberByWorkspaceId(id);
        setWorkspaceMembers(response.data.data);
      } finally {
        setApiProgress(false);
      }
    }

    getWorkspace();
    getWorkspaceMembers();
  }, [id]);
  return (
    <div>
      
      {workspace &&

        <>
          <div>

            <Row>
              <Col span={8}>
                <div>
                  <h2 style={{ marginTop: 30, textAlign: 'left', marginLeft: 150 }}>{workspace.name}</h2>
                  <p style={{ color: 'gray', textAlign: 'left', marginLeft: 150 }}>{workspace.description}</p>
                </div>
              </Col>

              <Col span={8} style={{ marginTop: '40px' }}>
                <AddBoardButton workspaceId={id} />
              </Col>

              <Col span={8} style={{ marginTop: '40px', right: 0 }}>
                <Avatar.Group
                  maxCount={2}
                  maxPopoverTrigger="click"
                  size="large"
                  maxStyle={{
                    color: '#f56a00',
                    backgroundColor: '#fde3cf',
                    cursor: 'pointer',
                  }}
                >
                  <Tooltip title={workspace.createdUser.name} placement="top">
                    <Avatar
                      style={{
                        backgroundColor: '#87d068',
                      }}
                      icon={<UserOutlined />}
                    />
                  </Tooltip>
                  {workspaceMembers && workspaceMembers.map(member => {
                    return (
                      <Tooltip title={member.user.name} placement="top">
                        <Avatar
                          style={{
                            backgroundColor: '#87d068',
                          }}
                          icon={<UserOutlined />}
                        />
                      </Tooltip>
                    )
                  })}
                </Avatar.Group>
              </Col>
            </Row>
          </div>

          <div style={{ marginLeft: 150, marginRight: 150 }}>
            <Divider />
          </div>
          <BoardList workspaceId={id} />
        </>


      }

    </div>
  )
}

export default Workspace