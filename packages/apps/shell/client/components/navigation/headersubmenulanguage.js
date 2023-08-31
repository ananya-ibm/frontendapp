import React,{useEffect,useState} from 'react'
import * as S from './headersubmenulanguage.styles';
import arrow from '../../static/images/header/arrow.png';

const HeaderSubMenuLanguage =(props)=>{
    
    const [invstatus,setinvstatus] = useState()
    const [langselect,setlangselect] = useState(false)
    //console.log(props.count)
    useEffect(()=>{
        if(props.count===1){
            setinvstatus(props.languagestataus)
        }
        else {
            setinvstatus(false)
        }
    },[props.count,props.languagestataus])

    const languageSelect = () =>{
        setlangselect(!langselect);
    }
    return(
        <>
            <S.Headersubmenulanguage isSlide={invstatus}>
                <div id="sidebarMenu">
                    <ul className="sidebarMenuInner">
                        <li onClick={languageSelect}>English {langselect && <div id="tick-mark"></div>}</li>
                        <li>Tamil</li>
                        <li>Hindi</li>
                    </ul>
                </div>
            </S.Headersubmenulanguage>
      </>
    )
}

export default HeaderSubMenuLanguage