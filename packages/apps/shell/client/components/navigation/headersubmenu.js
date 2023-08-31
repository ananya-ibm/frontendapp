import React,{useEffect,useState,useContext} from 'react'
import * as S from './headersubmenu.styles';
import arrow from '../../static/images/header/arrow.png';
import HeaderSubMenuLanguage from './headersubmenulanguage'
import UserContext from './header'

const HeaderSubMenu =(props)=>{
    //console.log(props.backArrw)
    const [status,setstatus] = useState()
    const [languagestataus,setlanguagestataus] = useState(false)
    const [newstat,setnewstat] = useState(false)
    useEffect(()=>{
        if(!props.backArrw){
            setstatus(props.checksubmenuslide)
        }
        else {
            setstatus(false)
        }
    })
    const slideSubmenulanguage=()=>{
        setlanguagestataus(()=>true)
        props.languagepageAppear(1,languagestataus,props.langstatus)
    }
    return(
        <>
            <S.Headersubmenu isSlide={status}>
                <div id="sidebarMenu">
                    <ul className="sidebarMenuInner">
                        <li onClick={slideSubmenulanguage}>Language Select<img src={arrow} alt="logo is missing"/></li>
                        <li>Terms and Conditions</li>
                        <li>App Version</li>
                        <li>Logout</li>
                    </ul>
                </div>
            </S.Headersubmenu>
            <HeaderSubMenuLanguage backArrw={props.backArrw} languagestataus={languagestataus} count={props.count} />
      </>
    )
}

export default HeaderSubMenu