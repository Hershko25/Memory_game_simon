import React from 'react';
import styled from "styled-components";


const Flash = styled.div`
  width: 30%;
  height:250px;
  margin-bottom: 30px;
  border: solid black 1px;
  border-radius: 50%; 
  box-shadow: -4px -3px 45px 21px rgba(0,0,0,0.35);
  border:solid #158bbd 2px;
  background-color: ${props => props.color};
  transform:scale(${props => props.scale==='true' ? 0.95 : 1});
  transition: ease-in-out 0.3s;
  cursor: pointer;

  &:hover{
    transform: scale(1.03);
  }
`;


export default function Circle({value,onClick,bool}) {
  return (
    <Flash onClick={onClick} color={value} scale={bool}></Flash>
  )
}
