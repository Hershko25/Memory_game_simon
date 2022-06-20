import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Elements/Button';

const Main = styled.main`
  height: 100vh;



  & .container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }

  & .title{
    color: white;
    font-size: 24px;
    margin-bottom: 15px;

  }

  & .name_input{
    width: 50%;
		outline: none;
		height: 50px;
		border-radius: 25px;
    box-sizing: border-box;
		transition: all ease-in 0.3s;
    background-color: transparent;
    border:solid #158bbd 2px;
    color: white;
    font-size: 21px;
    text-align: center;
    padding: 20px;
    transition: all ease-in-out 0.3s;
		::placeholder {
			color:  #9C9EA7;
      text-align: left;

		}
		&:focus {
			border: solid #2185D0 2px;
      transform: scale(1.05);
		}
  }

`;

export default function WelcomePage() {

  const [name, setname] = useState('');
  const [error, seterror] = useState(false);
  const navigate=useNavigate();


  const isvalid_name = (event) => {
     event.preventDefault();
     if(name!==''){
         navigate('/game-page', {state:{name:name}})
     }
     else{
       seterror(true);
     }
  }


  return (
    <Main>
      <form className='container' onSubmit={isvalid_name}>
        <label className='title'>Enter Your Name</label>
        <input placeholder='Enter Your Name' type='text' className='name_input' onChange={(e)=>setname(e.target.value)} />
        {error && <label style={{color:'red'}}>InValid Name </label>}
        <Button>start</Button>
      </form>
    </Main>
  )
}
