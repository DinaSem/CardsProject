import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from "../../components/hooks";
import {useEffect} from "react";
import {setPacksTC} from "../../bll/packs-reducer";
import SuperDoubleRangeFronEnternet from "../../components/SuperDoubleRange/SuperDoubleRangeFronEnternet";


export const PacksTable = () => {
    const packs = useAppSelector(state => state.packs.packsData.cardPacks)
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(setPacksTC(
                    {
                        //packName: 'english',
                        pageCount: 10,
                    }
        ))
        },[]
    )

    return (<>
            <div style={{ maxWidth:'65%',justifyContent:'space-between', display:'flex',left: '18%',position: 'relative'}}>
                <h2>Packs list</h2>
                <button>Add new pack</button>
            </div>
            <div style={{ maxWidth:'65%',justifyContent:'space-between', display:'flex',left: '18%',position: 'relative'}}>
                <input placeholder={'Provide your text'} type='text'/>
                <div>
                    <button>My</button>
                    <button>All</button>
                </div>
                <SuperDoubleRangeFronEnternet
                min={0}
                max={100}
                onChange={({ min, max }: { min: number; max: number }) =>
                    console.log(`min = ${min}, max = ${max}`)
                }
            />
            </div>
            

        <div style={{maxWidth:'65%', justifyContent:'space-around', display:'flex',position: 'relative',left: '18%'}}>

            <TableContainer component={Paper}>
            <Table style={{ left: '50%',top: '50%'}}
             // sx={{maxWidth: 900}}
                   aria-label="simple table">
                <TableHead style={{backgroundColor:'#EFEFEF'}}>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Cards</TableCell>
                        <TableCell align="center">Last Updated</TableCell>
                        <TableCell align="center">Created by</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {packs?.map((pack) => (
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
        </>
    );
};
