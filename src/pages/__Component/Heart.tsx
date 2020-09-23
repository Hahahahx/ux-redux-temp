import React, { CSSProperties } from 'react'

export const Heart = ({ style }: { style?: CSSProperties }) => {
    return (
        <div className="heart" style={style}>
            <svg version="1.2" xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink">
                <path id="pulsar" className='run' fill="none" strokeWidth="2" strokeLinejoin="round" d="M0,90L250,90Q257,60 262,87T267,95 270,88 273,92t6,35 7,-60T290,127 297,107s2,-11 10,-10 1,1 8,-10T319,95c6,4 8,-6 10,-17s2,10 9,11h210" />
            </svg>
        </div >
    )
}