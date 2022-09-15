import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from "../../../components/hooks";
import {useEffect, useState} from "react";
import {createPacksTC, setPacksTC} from "../packs-reducer";
import {Pagination} from "@mui/material";
import SuperSelect from "../../../components/SuperSelect/SuperSelect";
import FilterPanel from "../filterPanel/FilterPanel";
import s from './packTable.module.css'

export const PacksTable = () => {
    //const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const packs = useAppSelector(state => state.packs.packsData)
    const packNameSearch = useAppSelector(state => state.packs.packNameSearch)
    const newPack = useAppSelector(state => state.packs.newPack)
    const packId = useAppSelector(state => state.packs.user_id)
    const minVal = useAppSelector(state => state.packs.min)
    const maxVal = useAppSelector(state => state.packs.max)
    const myPack = '6226057a0373a3000426a62d'

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

            <div style={{
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
                                        {pack.user_id === myPack &&
                                            <>
                                                <button>edit</button>
                                                <button>delete</button>
                                            </>
                                        }

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer></div>

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
