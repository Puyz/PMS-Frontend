import React from 'react'
import { useSelector } from 'react-redux'
import './Home.css'
//import WorkspaceDropdown from '../components/workspaceDropdown/WorkspaceDropdown';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Divider, Flex } from 'antd';
import WorkspaceList from '../../components/workspaceList/WorkspaceList';

const Home = () => {
  const { name } = useSelector((store) => {
    return {
      name: store.name
    }
  });
  return (
    <>
      <div className="body">
      <Divider>Çalışma alanlarım</Divider>
      <WorkspaceList />
      </div>
    </>
  )
}

export default Home