import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from "../../../components/hooks";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import {Stars} from "./Stars";
import {deletePackTC, sortCardsAC, updateCardTC} from "../cards-reducer";
import {useParams} from "react-router-dom";
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {sortPacksAC} from "../../packs/packs-reducer";

export const CardsTable = () => {
    const dispatch = useAppDispatch()
    const params = useParams()

    const cards = useAppSelector(state => state.cards.cards)
    const sortCards = useAppSelector(state => state.cards.sortCards)
    const myUserId = '6226057a0373a3000426a62d'
    const packId = params.packId ? params.packId : ''

    const deleteCardOnClickHandler = (_id: string) => {
        dispatch(deletePackTC(_id, packId))

    }
    const editCardOnClickHandler = (_id: string) => {
        dispatch(updateCardTC(
        {
            _id,
                cardsPack_id: packId,
            grade: 2,
            question: 'updated question?',
        }
    ))
    }
    const sortCardsUpOnClickHandler = () => {
        dispatch(sortCardsAC('1updated'))
    }
    const sortCardsDownOnClickHandler = () => {
        dispatch(sortCardsAC('0updated'))
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
                            <TableCell align="center">Answer</TableCell>
                            {sortCards === '0updated' &&
                            <TableCell align="center">Last Updated <ArrowDropDownOutlinedIcon onClick={sortCardsUpOnClickHandler} /></TableCell>
                            }
                            {sortCards === '1updated' &&
                            <TableCell align="center">Last Updated <ArrowDropUpIcon onClick={sortCardsDownOnClickHandler} /></TableCell>
                            }
                            <TableCell align="center">Grade</TableCell>
                            <TableCell align="center">Actions</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards?.map((card) => {
                            return <TableRow
                                key={card._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">{card.question}</TableCell>
                                <TableCell align="center">{card.answer}</TableCell>
                                <TableCell align="center">{card.updated?.slice(0,10)}</TableCell>
                                <TableCell align="center">
                                    <Stars grades={card.grade}/>

                                </TableCell>
                                <TableCell align="center">
                                    {card.user_id === myUserId &&
                                    <>
                                        <BorderColorOutlinedIcon onClick={() => editCardOnClickHandler(card._id)}/>
                                        <DeleteForeverOutlinedIcon onClick={() => deleteCardOnClickHandler(card._id)}/>
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
