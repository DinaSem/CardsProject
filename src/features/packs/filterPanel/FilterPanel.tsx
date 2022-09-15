import React from 'react';
import {PackSearch} from "./pack-search/PackSearch";
import {MyAllPacksSwitch} from "./pack-My-All/MyAllPacksSwitch";
import {DoubleSlider} from "./pack-slider/DoubleSlider";
import {ResetFilter} from "./resetFilter/ResetFilter";

const FilterPanel = () => {
    return (
        <div style={{
            maxWidth: '65%',
            justifyContent: 'space-between',
            display: 'flex',
            left: '18%',
            position: 'relative',
            marginBottom: '30px'
        }}>
            <PackSearch/>
            <MyAllPacksSwitch/>
            <DoubleSlider/>
            <ResetFilter/>
        </div>
    );
};

export default FilterPanel;