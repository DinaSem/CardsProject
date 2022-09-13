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
import {createPacksTC, setMyPacksAC, setPacksTC} from "../packs-reducer";
import {SuperDoubleRangeFronEnternet} from "../../../components/SuperDoubleRange/SuperDoubleRangeFronEnternet";
import { Pagination} from "@mui/material";
import SuperSelect from "../../../components/SuperSelect/SuperSelect";
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';


export const PacksTable = () => {
    //const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const packs = useAppSelector(state => state.packs.packsData)
    const newPack = useAppSelector(state => state.packs.newPack)
    const myPacksMode = useAppSelector(state => state.packs.myPacksMode)
    //const numberOfPacks = useAppSelector(state => state.packs.packsData.pageCount)
    const dispatch = useAppDispatch()

    const packsOnPage = [10, 20, 30]
    const [valueFromSelect, onChangeOption] = useState(packsOnPage[1])
    const [inputValue, setInputValue] = useState('')


    const setMyPacksOnClickHandler = () => {
        dispatch(setMyPacksAC(true))
    }
    const setAllPacksOnClickHandler = () => {
        dispatch(setMyPacksAC(false))
    }

    // useEffect(() => {
    //     dispatch(setPacksTC({
    //         pageCount: valueFromSelect,
    //         packName: inputValue,
    //         min: packs.minCardsCount,
    //         max: packs.maxCardsCount,
    //     }))
    // }, [dispatch])

    useEffect(() => {
        if(!myPacksMode){
            dispatch(setPacksTC(
                {
                    //packName: 'english',

                    pageCount: 10,
                    packName:inputValue,
                    min: packs.minCardsCount,
                    max:packs.maxCardsCount,
                }
            ))
        }else{
            dispatch(setPacksTC(
                {
                    user_id: '6226057a0373a3000426a62d',
                    pageCount: 10,
                    packName:inputValue
                }
            ))
        }

        }, [dispatch,myPacksMode,inputValue,packs.maxCardsCount,packs.minCardsCount]
    )


    const createPackOnClickHandler = () => {
        dispatch(createPacksTC(newPack))
    }

    console.log('inputValue', inputValue)
    return (<>
            <div style={{
                maxWidth: '65%',
                justifyContent: 'space-between',
                display: 'flex',
                left: '18%',
                position: 'relative'
            }}>
                <h2>Packs list</h2>
                <button onClick={createPackOnClickHandler}>Add new pack</button>
            </div>
            <div style={{
                maxWidth: '65%',
                justifyContent: 'space-between',
                display: 'flex',
                left: '18%',
                position: 'relative'
            }}>
                <input value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)}
                       placeholder={'Provide your text'} type='text'/>
                <div>
                    <button onClick={setMyPacksOnClickHandler}>My</button>
                    <button onClick={setAllPacksOnClickHandler}>All</button>
                </div>
                <SuperDoubleRangeFronEnternet
                    min={0}
                    max={100}
                    onChange={({min, max}: { min: number; max: number }) =>
                        console.log(`min = ${min}, max = ${max}`)
                    }
                />
                <FilterAltOffOutlinedIcon/>
            </div>


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
                                    <TableCell align="right">
                                        <button>learn</button>
                                        <button>edit</button>
                                        <button>delete</button>
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
