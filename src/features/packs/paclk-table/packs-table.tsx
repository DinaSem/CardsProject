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

export const PacksTable = () => {
    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.packs.packsData)
    const myUserId = '6226057a0373a3000426a62d'

    const deletePackOnClickHandler = (id:string) => {
            dispatch(deletePackTC(id))
    }
    const editPackOnClickHandler = (_id:string) => {
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
                        {packs?.cardPacks?.map((pack) => (
                            <TableRow
                                key={pack._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {pack.name}
                                </TableCell>
                                <TableCell align="right">{pack.cardsCount}</TableCell>
                                <TableCell align="right">{pack.created}</TableCell>
                                <TableCell align="right">{pack.updated}</TableCell>
                                <TableCell align="left">
                                    <button>learn</button>
                                    {pack.user_id === myUserId &&
                                    <>
                                        <button onClick={()=>editPackOnClickHandler(pack._id)}>edit</button>
                                        <button onClick={()=>deletePackOnClickHandler(pack._id)}>delete</button>
                                    </>
                                    }

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
