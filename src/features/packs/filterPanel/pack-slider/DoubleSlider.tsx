import React, {useEffect, useState} from 'react';
import {Box, Slider} from "@mui/material";
import {setMinMaxValueAC} from "../../packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../../components/hooks";
import { useDebounce } from 'use-debounce';

    // function valuetext(value: number) {
    //     return `${value}°C`;
    // }

    export const DoubleSlider = () => {
        const [value, setValue] = useState<number[]>([0, 100]);
        const minVal = useAppSelector(state => state.packs.min)
        const maxVal = useAppSelector(state => state.packs.max)

        const dispatch = useAppDispatch()
        const [debounceValue] = useDebounce(value, 500);

        const handleChange = (event: Event, newValue: number | number[]) => {
            setValue(newValue as number[]);
            // dispatch(setMinMaxValueAC(newValue[0],newValue[1]))

        };
        useEffect(() => {
            if (debounceValue) {
                dispatch(setMinMaxValueAC(+debounceValue[0],+debounceValue[1]))
            }
        }, [debounceValue])
// console.log(+debounceValue[0],+debounceValue[1])
        return (
            <Box sx={{ width: 155 }}>
                <Slider
                    value={[minVal,maxVal]}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                />
            </Box>
        );
    }