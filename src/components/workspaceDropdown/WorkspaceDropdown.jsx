import React, { useEffect, useState } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { getAllWorkspace } from '../../api/ApiCalls';
import { useDispatch, useSelector } from 'react-redux';
import './WorkspaceDropdown.css';
import { refreshWorkspaceAction } from '../../redux/AuthActions';
import { useNavigate } from 'react-router-dom';

const WorkspaceDropdown = () => {
    const { id, refreshWorkspace } = useSelector((store) => {
        return {
            id: store.id,
            refreshWorkspace: store.refreshWorkspace
        };
    });

    const navigate = useNavigate();
    const [workspaces, setWorkspaces] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getAllWorkspace(id);

                if (response.data.data && Array.isArray(response.data.data)) {
                    const workspaceArray = response.data.data.map(workspace => ({
                        key: workspace.id,
                        label: (
                            <a onClick={() => { navigate(`/workspace/${workspace.id}`) }} key={workspace.id}>
                                {workspace.name}
                            </a>
                        ),
                    }));
                    setWorkspaces(workspaceArray);
                } else {
                    console.error('Invalid response data format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching workspace data:', error);
            }
        }
        if(refreshWorkspace === true){
            fetchData();
            dispatch(refreshWorkspaceAction(false));
        }
        fetchData();
    }, [id, refreshWorkspace]);

    const menu = (
        <Menu>
            {workspaces.map(workspace => (
                <Menu.Item key={workspace.key}>
                    {workspace.label}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div className="dropdown">
            <Dropdown overlay={menu}>
                <a onClick={(e) => e.preventDefault()} style={{color: 'black'}}>
                    <Space>
                        Çalışma alanlarım
                        <CaretDownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </div>

    );
};

export default WorkspaceDropdown;
