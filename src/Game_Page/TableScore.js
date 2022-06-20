import React, { useEffect, useState } from 'react';
import styled from "styled-components";

const Table = styled.div`

width: 100%;
height: 100%;
display: flex;
color: white;


& .right{
    height: 100%;
    width: 30%;
    text-align: center;
}

& .left{
    height: 100%;
    width: 70%;
    box-sizing: border-box;
    padding-left: 15px;
}

& h1{
    text-decoration: underline;
}

& ul{
    padding-left: 0px;
    list-style-type: none;

    & li{
        border-bottom:solid #158bbd 1px;
    }

    
}

& p{
    font-size: 21px;
    
}


`;

export default function TableScore() {

    const [score, setscore] = useState([]);




    useEffect(() => {
        if (localStorage.getItem('Score') !== null) {
            let json = JSON.parse(localStorage.getItem('Score'));
            json.sort(function (a, b) {
                return b.score - a.score;
            });
            setscore(json);
        }

    }, [])


    return (
        <Table>
            <div className='left'>
                <h1>Player Name</h1>
                {
                    score.length > 0 ?
                    <ul className='list'>
                        {
                            score.map((per, key) =>
                                <li key={key}>
                                    <p>{per.name} - {per.date_and_time} </p>
                                </li>
                            )
                        }
                    </ul>:
                    <p>Be the first one who play this game</p>
                }
            </div>
            <div className='right'>
                <h1>Score</h1>
                {
                    score.length > 0 &&
                    <ul className='list'>
                        {
                            score.map((per, key) =>
                                <li key={key}>
                                    <p>{per.score}</p>
                                </li>
                            )
                        }
                    </ul>
                }
            </div>
        </Table>
    )
}
