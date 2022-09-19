import * as React from 'react';
import {ChangeEvent, useEffect, useState} from "react";
// import {Box, MenuItem, Pagination, Select, SelectChangeEvent} from "@mui/material";
import s from './../packs/paclk-table/packTable.module.css'
import {useAppDispatch, useAppSelector} from "../../components/hooks";
// import FormControl from "@mui/material/FormControl";
import {CardsTable} from "./cards-table/cards-table";
import {setCardsTC} from "./cards-reducer";
import {useParams} from "react-router-dom";
// import {CardResponseType} from "../../api/cards-api";

export const Cards = () => {

    const params = useParams()
    const dispatch = useAppDispatch()
    const packId = params.packId ? params.packId : ''
    const myUserId = '6226057a0373a3000426a62d'


    useEffect(() => {
        dispatch(setCardsTC(packId))
    }, [dispatch])


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
                {packId === myUserId ? <h2>Cards list</h2> : <h2>Friend’s Pack</h2>}
                {/*<button className={s.newPackButton} onClick={createPackOnClickHandler}>Add new pack</button>*/}
            </div>
            {/*<FilterPanel/>*/}
            <CardsTable/>
            {/*<div className={s.paginationWrapper}>*/}
            {/*    <Pagination count={pagesCount} shape="rounded" page={currentPage} onChange={handlePaginationChange}/>*/}
            {/*    <span>Show</span>*/}
            {/*    <Box sx={{minWidth: 120}} style={{minWidth: '80px'}}>*/}
            {/*        <FormControl sx={{m: 1, minWidth: 60}} style={{margin: '-8px 10px'}} size="small">*/}
            {/*            <Select value={pagesOnPage} onChange={handleChange}>*/}
            {/*                <MenuItem value={10}>10</MenuItem>*/}
            {/*                <MenuItem value={20}>20</MenuItem>*/}
            {/*                <MenuItem value={30}>30</MenuItem>*/}
            {/*            </Select>*/}
            {/*        </FormControl>*/}
            {/*    </Box>*/}
            {/*    <span>Packs per Page</span>*/}
            {/*</div>*/}
        </div>
    );
};
