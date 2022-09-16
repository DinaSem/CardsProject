import * as React from 'react';
import {ChangeEvent, useEffect, useState} from "react";
import {Box, MenuItem, Pagination, Select, SelectChangeEvent} from "@mui/material";
import s from './../packs/paclk-table/packTable.module.css'
import FilterPanel from "./filterPanel/FilterPanel";
import {useAppDispatch, useAppSelector} from "../../components/hooks";
import {createPacksTC, setCurrentPageAC, setPacksTC} from "./packs-reducer";
import {PacksTable} from "./paclk-table/packs-table";
import FormControl from "@mui/material/FormControl";

export const Packs = () => {
    //const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const packNameSearch = useAppSelector(state => state.packs.packNameSearch)
    const newPack = useAppSelector(state => state.packs.newPack)
    const packId = useAppSelector(state => state.packs.user_id)
    const min = useAppSelector(state => state.packs.min)
    const max = useAppSelector(state => state.packs.max)
    const currentPage = useAppSelector(state => state.packs.currentPage)
    let cardPacksTotalCount = useAppSelector(state => state.packs.packsData.cardPacksTotalCount)

    const dispatch = useAppDispatch()
    const [pagesOnPage, setPageCount] = useState('');
    const pagesCount = Math.ceil(cardPacksTotalCount/+pagesOnPage)

    const handleChange = (event: SelectChangeEvent) => {
        setPageCount(event.target.value as string);
    };
    // const [page, setPage] = useState<number>(1);
    const handlePaginationChange = (event: ChangeEvent<any>, value: number) => {
        // setPage(value);
        dispatch(setCurrentPageAC(value))
    };

    useEffect(() => {
        // debugger
        dispatch(setPacksTC(
            {
                pageCount: +pagesOnPage,
                user_id: packId,
                page:currentPage,
                min,
                max,
                packName:packNameSearch,
                sortPacks:1,

            }
        ))
    }, [dispatch, min, max, packNameSearch, packId, newPack,pagesOnPage,currentPage])

    const createPackOnClickHandler = () => {
        dispatch(createPacksTC(newPack))
    }
    return (<>
            <div className={s.newPackPanel}>
                <h2>Packs list</h2>
                <button className={s.newPackButton} onClick={createPackOnClickHandler}>Add new pack</button>
            </div>
            <FilterPanel/>
            <PacksTable/>
            <div className={s.paginationWrapper}>
                <Pagination count={pagesCount} shape="rounded" page={currentPage} onChange={handlePaginationChange}/>
                <span>Show</span>
                <Box sx={{ minWidth: 120 }} style={{minWidth: '80px'}}>
                    <FormControl sx={{ m: 1, minWidth: 60 }} style={{margin: '-8px 10px'}}  size="small">
                        <Select value={pagesOnPage} onChange={handleChange}>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <span>Packs per Page</span>
            </div>
        </>
    );
};
