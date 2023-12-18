import React, { useEffect, useState } from 'react'
import { getAllBoardsByWorkspaceId } from '../../api/ApiCalls';
import { Flex } from 'antd';
import BoardCard from '../boardCard/BoardCard';
import { useDispatch, useSelector } from 'react-redux';
import { refreshBoardAction } from '../../redux/AuthActions';

const BoardList = ({workspaceId}) => {
    const [boards, setBoards] = useState([]);
    const dispatch = useDispatch();
    const {refreshBoard} = useSelector((store) => {
        return {
            refreshBoard: store.refreshBoard
        }
    });
    

    useEffect(() => {
        async function getAllBoards() {
            const response = await getAllBoardsByWorkspaceId(workspaceId);
            setBoards(response.data.data);
        }
        if(refreshBoard === true){
            getAllBoards();
            dispatch(refreshBoardAction(false));
        }
        getAllBoards();
    }, [workspaceId, refreshBoard]);

    return (

        <Flex wrap="wrap" gap="small" style={{marginLeft: 150}}>
            {boards &&
                boards.map((board) => {
                    return (<BoardCard key={board.id} board={board} />)
                })
            }

        </Flex>

    )
}

export default BoardList