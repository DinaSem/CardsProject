import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from "../../../components/hooks";
import {deletePackTC, updatePackTC} from "../packs-reducer";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import {useNavigate} from "react-router-dom";


export const PacksTable = () => {
    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.packs.packsData)
    const myUserId = '6226057a0373a3000426a62d'
    const navigate = useNavigate()

    const deletePackOnClickHandler = (id: string) => {
        dispatch(deletePackTC(id))
    }
    const editPackOnClickHandler = (_id: string) => {
        dispatch(updatePackTC({
                _id,
                name: "new name for Dinas pack",
            }
        ))
    }


    return (<div style={{
            maxWidth: '65%',
            justifyContent: 'space-around',
            display: 'flex',
            position: 'relative',
            left: '18%'
        }}>
            <TableContainer component={Paper}>
                <Table style={{left: '50%', top: '50%'}}
                    // sx={{maxWidth: 900}}
                       aria-label="simple table">
                    <TableHead style={{backgroundColor: '#EFEFEF'}}>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Cards</TableCell>
                            <TableCell align="center">Last Updated</TableCell>
                            <TableCell align="center">Created by</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packs?.cardPacks?.map((pack) =>{

                            const onClickNamePack = () => {
                                navigate(`/cards_list/${pack._id}`)
                            }
                            return <TableRow
                                key={pack._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row" onClick={onClickNamePack}>
                                    {pack.name}
                                </TableCell>

                                <TableCell align="right">{pack.cardsCount}</TableCell>
                                <TableCell align="right">{pack.updated}</TableCell>
                                <TableCell align="right">{pack.user_id}</TableCell>
                                <TableCell align="left">
                                    <SchoolOutlinedIcon/>
                                    {pack.user_id === myUserId &&
                                    <>
                                        <BorderColorOutlinedIcon onClick={() => editPackOnClickHandler(pack._id)}/>
                                        <DeleteForeverOutlinedIcon onClick={() => deletePackOnClickHandler(pack._id)}/>
                                    </>
                                    }

                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
