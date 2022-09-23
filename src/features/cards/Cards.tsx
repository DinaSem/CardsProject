import * as React from 'react';
import {ChangeEvent, useEffect, useState} from "react";
import s from './../packs/paclk-table/packTable.module.css'
import {useAppDispatch, useAppSelector} from "../../components/hooks";
import {CardsTable} from "./cards-table/cards-table";
import {createCardsTC, setCardPageAC, setCardsTC} from "./cards-reducer";
import {useNavigate, useParams} from "react-router-dom";
import {Box, MenuItem, Pagination, Select, SelectChangeEvent} from "@mui/material";
import FormControl from "@mui/material/FormControl";


export const Cards = () => {

        const dispatch = useAppDispatch()
        const navigate = useNavigate()
        const params = useParams()
        const packId = params.packId ? params.packId : ''
        const myUserId = '6226057a0373a3000426a62d';
        const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
        const page = useAppSelector((state) => state.cards.page)
        const cardsTotalCount = useAppSelector((state) => state.cards.cardsTotalCount)
        const currentPackName = useAppSelector((state) => state.packs.packsData.cardPacks?.find((n) => n._id === packId))
        const myCards = useAppSelector((state) => state.packs.packsData.cardPacks?.filter((n) => n.user_id === myUserId))
        const currentPack = useAppSelector((state) => state.packs.packsData.cardPacks?.find((n) => n._id === packId))

        const packIsEmpty = (cardsTotalCount === 0)


        const [cardsOnPage, setCardsOnPage] = useState('4');
        const pagesCount = Math.ceil(cardsTotalCount / +cardsOnPage)


        useEffect(() => {
                dispatch(setCardsTC(packId))
            }, [dispatch, cardsTotalCount, packId, page, currentPack]
        )

        const createCardOnClickHandler = () => {
            dispatch(createCardsTC({
                card:{
                    cardsPack_id: packId,
                    question: 'New card?',
                    answer: "Yes",
                    grade:4,
                }}))
        };

        const handleChange = (event: SelectChangeEvent) => {
            setCardsOnPage(event.target.value as string);
        };

        const handlePaginationChange = (event: ChangeEvent<any>, value: number) => {
            dispatch(setCardPageAC(value))
        };

        if (!isLoggedIn) {
            navigate('/login')
        }

        console.log('myCards',myCards)

// const createPackOnClickHandler = () => {
//     dispatch(createPacksTC(newPack))
// }
//
// const handleChange = (event: SelectChangeEvent) => {
//     setPageCount(event.target.value as string);
// };
// // const [page, setPage] = useState<number>(1);
// const handlePaginationChange = (event: ChangeEvent<any>, value: number) => {
//     // setPage(value);
//     dispatch(setCurrentPageAC(value))
// };
        return (
            <div>
                <div className={s.newPackPanel}>
                    <h2>{currentPackName?.name}</h2>
                    {myCards &&
                    <button className={s.newPackButton} onClick={createCardOnClickHandler}>Add new card
                    </button>
                    }
                </div>
                {packIsEmpty &&
                <div style={{textAlign: 'center'}}>
                    <div>This pack is empty. Click "Add new card" to fill this pack</div>
                    <button className={s.newPackButton} onClick={createCardOnClickHandler}>Add new card</button>
                </div>
                }
                {/*<FilterPanel/>*/}
                {!packIsEmpty &&
                <>
                    <CardsTable/>
                    <div className={s.paginationWrapper}>
                        <Pagination count={pagesCount} shape="rounded" page={page} onChange={handlePaginationChange}/>
                        <span>Show</span>
                        <Box sx={{minWidth: 120}} style={{minWidth: '80px'}}>
                            <FormControl sx={{m: 1, minWidth: 60}} style={{margin: '-8px 10px'}} size="small">
                                <Select value={cardsOnPage} onChange={handleChange}>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={20}>20</MenuItem>
                                    <MenuItem value={30}>30</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <span>cards per Page</span>
                    </div>
                </>
                }
            </div>
        );
    }
;
