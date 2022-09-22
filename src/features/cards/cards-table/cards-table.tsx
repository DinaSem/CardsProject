import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from "../../../components/hooks";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import {Stars} from "./Stars";


export const CardsTable = () => {
    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.cards.cards)
    const myUserId = '6226057a0373a3000426a62d'

    const deleteCardOnClickHandler = (_id: string) => {
        // dispatch(deletePackTC(id))
    }
    const editCardOnClickHandler = (_id: string) => {
        // dispatch(updatePackTC({
        //         _id,
        //         name: "new name for Dinas pack",
        //     }
        // ))
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
                            <TableCell>Question</TableCell>
                            <TableCell align="left">Answer</TableCell>
                            <TableCell align="left">Last Updated</TableCell>
                            <TableCell align="left">Grade</TableCell>
                            <TableCell align="left">Actions</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards?.map((card) => {
                            return <TableRow
                                key={card._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">{card.question}</TableCell>
                                <TableCell align="left">{card.answer}</TableCell>
                                <TableCell align="left">{card.updated}</TableCell>
                                <TableCell align="left">
                                    <Stars grades={card.grade}/>

                                </TableCell>
                                <TableCell align="left">
                                {card.user_id === myUserId &&
                                    <>
                                        <BorderColorOutlinedIcon onClick={() => editCardOnClickHandler(card._id)}/>
                                        <DeleteForeverOutlinedIcon onClick={() => deleteCardOnClickHandler(card._id)}/>
                                    </>
                                }
                                </TableCell>
                                {/*<TableCell align="left">{card.grade}</TableCell>*/}
                                {/*<TableCell align="left">*/}
                                {/*    <SchoolOutlinedIcon/>*/}
                                {/*    {pack.user_id === myUserId &&*/}
                                {/*    <>*/}
                                {/*        <BorderColorOutlinedIcon onClick={() => editPackOnClickHandler(card._id)}/>*/}
                                {/*        <DeleteForeverOutlinedIcon onClick={() => deletePackOnClickHandler(card._id)}/>*/}
                                {/*    </>*/}
                                {/*    }*/}

                                {/*</TableCell>*/}
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
