import * as React from 'react';
import {useEffect, useState} from "react";
import {Pagination} from "@mui/material";
import s from './../packs/paclk-table/packTable.module.css'
import FilterPanel from "./filterPanel/FilterPanel";
import SuperSelect from "../../components/SuperSelect/SuperSelect";
import {useAppDispatch, useAppSelector} from "../../components/hooks";
import {createPacksTC, setPacksTC} from "./packs-reducer";
import {PacksTable} from "./paclk-table/packs-table";

export const Packs = () => {
    //const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const packs = useAppSelector(state => state.packs.packsData)
    const packNameSearch = useAppSelector(state => state.packs.packNameSearch)
    const newPack = useAppSelector(state => state.packs.newPack)
    const packId = useAppSelector(state => state.packs.user_id)
    const minVal = useAppSelector(state => state.packs.min)
    const maxVal = useAppSelector(state => state.packs.max)

    const dispatch = useAppDispatch()
    const packsOnPage = [10, 20, 30]
    const [valueFromSelect, onChangeOption] = useState(packsOnPage[1])


    useEffect(() => {
        dispatch(setPacksTC(
            {
                pageCount: 10,
                user_id: packId,
            }
        ))
    }, [dispatch, minVal, maxVal, packNameSearch, packId, newPack])

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
            <div style={{
                maxWidth: '65%',
                justifyContent: 'start',
                display: 'flex',
                left: '18%',
                position: 'relative'
            }}>
                <Pagination count={10} shape="rounded"/>
                <span>Show</span>
                <SuperSelect
                    options={packsOnPage}
                    value={valueFromSelect}
                    onChangeOption={onChangeOption}
                />
                <span>Cards per Page</span>
            </div>
        </>
    );
};
