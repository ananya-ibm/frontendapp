import React,{useState} from 'react';
import * as S from './header.styles';
import hamburger from '../../static/images/header/hamburger.png'
import arrow from '../../static/images/header/arrow.png'
import shelllogo from '../../static/images/header/shell_logo.png'
import HeaderMenu from './headermenu'
const Header=(props)=>{
    const [openmenu, setopenmenu]=useState(false)
    const [backArrow, setbackArrow]=useState(false)
    const [arrowState, setarrowState]=useState(false)
    const [count, setcount]=useState(0)
    
    const openMenu = (e) => {
        setopenmenu(!openmenu)
    }
    const arrowAppear=(val)=>{
        setbackArrow(val)
        setarrowState(!val)
    }
    const languagepageAppear=(val,status,nww)=>{
       setcount(val)
    }
    const backArrw=()=>{
        if(count === 1){
           setcount(()=>0)
            
        }else {
            setarrowState(!arrowState)
            setbackArrow(!backArrow)
        }
        
    }
    return(
        <>
            <S.HeaderWrapper>
                <S.Headerdivision>
                    {!backArrow ? <img onClick={openMenu}src={hamburger} alt="hamburger is missing"/> :  <img src={arrow} onClick={backArrw} style={{width: `${backArrow ? '5%' : '14%'}`, paddingTop: `${backArrow ? '1rem' : '0'}`}} alt="logo is missing"/> }
                </S.Headerdivision>
                <S.Headerdivision>
                    <img src={shelllogo} alt="logo is missing"/> 
                </S.Headerdivision>
            </S.HeaderWrapper>
            <HeaderMenu arrowAppear={arrowAppear} check={openmenu} backArrw={arrowState} languagepageAppear={languagepageAppear} count={count}/>
            </>
        )
}
export default Header