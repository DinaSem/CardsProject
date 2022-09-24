import React from 'react';
import emptyStar from '../../../images/emptyStar.png'
import goldStar from '../../../images/goldStart.png'

type PropsType = {
    grades: number
}

export const Stars = ({grades}: PropsType) => {


    return (
        <div>
            {/*{cards.map((card, i) => {*/}
            {/*return <img src={goldStar}  key={i} alt="" style={{marginRight: '5px'}}/>*/}
            {/*})}*/}
            {Math.floor(grades) === 0 &&
            <>
                <img src={emptyStar} alt="" style={{marginRight: '5px'}}/>
                <img src={emptyStar} alt="" style={{marginRight: '5px'}}/>
                <img src={emptyStar} alt="" style={{marginRight: '5px'}}/>
                <img src={emptyStar} alt="" style={{marginRight: '5px'}}/>
                <img src={emptyStar} alt=""/>
            </>

            }
            {Math.floor(grades) === 1 &&
            <>
                <img src={goldStar} alt="" style={{marginRight: '5px'}}/>
                <img src={emptyStar} alt="" style={{marginRight: '5px'}}/>
                <img src={emptyStar} alt="" style={{marginRight: '5px'}}/>
                <img src={emptyStar} alt="" style={{marginRight: '5px'}}/>
                <img src={emptyStar} alt=""/>
            </>
            }
            {Math.floor(grades) === 2 &&
            <>
                <img src={goldStar} alt="" style={{marginRight: '5px'}}/>
                <img src={goldStar} alt="" style={{marginRight: '5px'}}/>
                <img src={emptyStar} alt="" style={{marginRight: '5px'}}/>
                <img src={emptyStar} alt="" style={{marginRight: '5px'}}/>
                <img src={emptyStar} alt=""/>
            </>
            }
            {Math.floor(grades) === 3 &&
            <>
                <img src={goldStar} alt="" style={{marginRight: '5px'}}/>
                <img src={goldStar} alt="" style={{marginRight: '5px'}}/>
                <img src={goldStar} alt="" style={{marginRight: '5px'}}/>
                <img src={emptyStar} alt="" style={{marginRight: '5px'}}/>
                <img src={emptyStar} alt=""/>
            </>
            }
            {Math.floor(grades) === 4 &&
            <>
                <img src={goldStar} alt="" style={{marginRight: '5px'}}/>
                <img src={goldStar} alt="" style={{marginRight: '5px'}}/>
                <img src={goldStar} alt="" style={{marginRight: '5px'}}/>
                <img src={goldStar} alt="" style={{marginRight: '5px'}}/>
                <img src={emptyStar} alt=""/>
            </>
            }
            {Math.floor(grades) === 5 &&
            <>
                <img src={goldStar} alt="" style={{marginRight: '5px'}}/>
                <img src={goldStar} alt="" style={{marginRight: '5px'}}/>
                <img src={goldStar} alt="" style={{marginRight: '5px'}}/>
                <img src={goldStar} alt="" style={{marginRight: '5px'}}/>
                <img src={goldStar} alt=""/>
            </>
            }
        </div>
    );
};
