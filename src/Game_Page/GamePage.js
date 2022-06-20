import { useState, useEffect } from "react";
import styled from "styled-components";
import Circle from "./Circle";
import time from './time';
import { useLocation, Link } from 'react-router-dom';
import Button from '../Elements/Button';
import TableScore from "./TableScore";

const Main = styled.main`

 width: 100%;
 height: 100vh;
 display: flex;
 flex-direction: column;

  & .header{
     width: 100%;
     height: 15vh;
     display: flex;
     justify-content: space-between;
     align-items: center;
     color: white;
     padding: 0px 75px;
     box-sizing: border-box;
     border-bottom: #CED7EE solid 1px;
  }

  & .conatiner{
  width: 100%;
  height: 70vh;
  display: flex; 
  align-items: center;
  padding: 0px 25px;
  box-sizing: border-box;
 }

  & .conatiner-circle{
  display: flex;
  width: 50%;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0px 25px;
  pointer-events: ${props=>props.pointerevent ? 'none' : 'all'};


  }

  & .conatiner-table{
    width: 50%;
    height: 70%;
    display: flex;
    align-items: center;
    background-color: #1d203e ;
    border:solid #158bbd 1px;
    box-shadow: -4px -3px 45px 21px rgba(0,0,0,0.35);
    margin-left: 25px;
    overflow: auto;
&::-webkit-scrollbar {
  width: 15px;
 
}

&::-webkit-scrollbar-thumb {
  background: #158bbd; 
}
  }

  & .container-btn-table{
    width: 50%;
    height: 50%;
    margin: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    overflow: auto;
    background-color: #1d203e ;
    border:solid #158bbd 1px;
    box-shadow: -4px -3px 45px 21px rgba(0,0,0,0.35);
    padding: 25px;
    box-sizing: border-box;
    animation: fadein 2s;

&::-webkit-scrollbar {
  width: 15px;
 
}

&::-webkit-scrollbar-thumb {
  background: #158bbd; 
}

    @keyframes fadein {
    from{opacity:0;}
    to{opacity:1;}
}

  }

  & .back-link{
    color: white;
    text-decoration: none;
    background-color: transparent;
    border:solid #158bbd 2px;
    border-radius: 25px;
    height: 40px;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ease-in-out 0.3s;

    &:hover{
      background-color: #158bbd ;
    }
  }

  & .score-title{
    color: white;
    border:none;
    background-color:${props=>props.pointerevent ? 'red' : '#158bbd'};
    width: 15%;
    text-align: center;
    padding: 15px;
    border-radius: 0px 15px 15px 0px;
  }

`;

function GamePage() {

    const colorList = ["green", "red", "yellow", "blue", "black", "orange"];
    const [flash_color, setflash_color] = useState();
    const [index_array, setindex_array] = useState([colorList[Math.floor(Math.random() * 6)]]);
    const [cursor, setcursor] = useState(0);
    const [counter, setcounter] = useState(0);
    const [isplay, setisplay] = useState(false);
    const [pointerevent, setpointerevent] = useState(false);
    const location = useLocation();

    let date = new Date();



    useEffect(() => {
        if (isplay) {
            random_color();
        }
    }, [index_array, isplay])

    async function random_color() {
        setpointerevent(true);
        await time(750);
        for (let i = 0; i < index_array.length; i++) {
            setflash_color(index_array[i]);
            await time(1000);
            setflash_color();
            await time(750);
        }
        setpointerevent(false);
    }


    const isvalid_sequence = (value) => {

        if (index_array[cursor] === value) {

            setcursor(prev => prev + 1);

        }
        else {
            if (localStorage.getItem('Score') !== null) {
                let temp = [...JSON.parse(localStorage.getItem('Score'))]
                temp.push({
                    name: location.state.name,
                    score: counter,
                    date_and_time: `
                    ${date.getDate()}/
                    ${date.getMonth() + 1}/
                    ${date.getFullYear()}
                     -- Time:
                     ${date.getHours()}:${date.getMinutes()}`
                })
                localStorage.setItem('Score', JSON.stringify(temp));
            }
            else {
                localStorage.setItem(
                    'Score',
                    JSON.stringify([{
                        name: location.state.name,
                        score: counter,
                        date_and_time: `
                        ${date.getDate()}/
                        ${date.getMonth() + 1}/
                        ${date.getFullYear()}
                         -- Time:
                         ${date.getHours()}:${date.getMinutes()}`
                    }]));
            }
            alert(`Game Over ${location.state.name}`);
            setcounter(0);
            setindex_array([colorList[Math.floor(Math.random() * 6)]]);
            setcursor(0);
            setisplay(false);
            return
        }
        if (index_array[cursor + 1] === undefined) {
            let rnd_color = Math.floor(Math.random() * 6);
            let temp_array_color = [...index_array];
            temp_array_color.push(colorList[rnd_color]);
            setindex_array(temp_array_color);
            setcursor(0);
            setcounter(prev => prev + 10)
        }

    }

    return (
        <Main pointerevent={pointerevent}>
            <div className="header">
                <h1>Hello - {location.state.name}</h1>
                <Link className="back-link" to='/'>Back</Link>
            </div>
            <div>
                {
                    isplay &&
                    <div className="conatiner">
                        <div className="conatiner-circle">
                            {
                                colorList.map((per, key) =>
                                    <Circle
                                        key={key}
                                        onClick={() => isvalid_sequence(per)}
                                        value={flash_color === per ? flash_color : "white"}
                                        bool={flash_color === per ? 'true' : 'false'} />
                                )
                            }
                        </div>
                        <div className="conatiner-table">
                            <TableScore />
                        </div>
                    </div>
                }
            </div>
            {
                !isplay ?
                <div className="container-btn-table">
                    <Button onClick={() => setisplay(true)}>Start the game</Button>
                    <TableScore />
                </div>
                :
                <h1 className="score-title">Your Score: {counter}</h1>
            }
        </Main>
    );
}

export default GamePage;
