import React from 'react';
import styled from 'styled-components';

const ButtonStyle=styled.button`
  color: white;
    text-decoration: none;
    margin-top: 35px;
    background-color: transparent;
    border:solid #158bbd 2px;
    font-size: 21px;
    padding: 10px 55px;
    border-radius: 35px;
    cursor: pointer;
    transition: ease-in-out 0.3s;
    &:hover{
      transform: scale(1.1);
    }
    &:hover{
      background-color: #158bbd ;
    }

`;

export default function Button({children,onClick}) {
  return (
    <ButtonStyle onClick={onClick}>{children}</ButtonStyle>
  )
}
