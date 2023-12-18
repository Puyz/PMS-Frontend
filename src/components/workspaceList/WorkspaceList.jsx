import React, { useEffect, useState } from 'react'
import { getAllWorkspace } from '../../api/ApiCalls';
import { useDispatch, useSelector } from 'react-redux';
import WorkspaceCard from '../workspaceCard/WorkspaceCard';
import { refreshWorkspaceAction } from '../../redux/AuthActions';

const WorkspaceList = () => {

    const dispatch = useDispatch();
    const [workspaces, setWorkspaces] = useState([]);
    const { id, refreshWorkspace } = useSelector((store) => {
        return {
            id: store.id,
            refreshWorkspace: store.refreshWorkspace
        };
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getAllWorkspace(id);
                setWorkspaces(response.data.data);
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

  return (
    <div>{workspaces && workspaces.map((workspace) => {
        return (<WorkspaceCard workspace={workspace}/>)
    })}</div>
  )
}

export default WorkspaceList