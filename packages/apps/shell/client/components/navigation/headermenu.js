import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import * as S from './headermenu.styles';
import arrow from '../../static/images/header/arrow.png'
import HeaderSubMenu from './headersubmenu';
const HeaderMenu =(props)=>{
    const history = useHistory();
    const [submenuslide,setsubmenuslide] = useState(false)
    const slideSubmenu=()=>{
        setsubmenuslide(true)
        props.arrowAppear(true)
    }
    return(
        <>
            <S.Headermenu chekMenu={props.check}>
                <div id="sidebarMenu">
                    <ul className="sidebarMenuInner">
                        <li onClick={()=>{ history.push("/my-profile");
                        location.reload();
                        }}>My Profile</li>
                        <li onClick={()=>{ history.push("/my-performance");
                        location.reload();
                        }}>My Performance</li>
                        <li onClick={()=>{ history.push("/my-earnings");
                        location.reload();
                        }}>My Earnings</li>
                        <li onClick={()=>{ history.push("/my-redemption");
                        location.reload();
                        }}>My Redemption</li>
                        <li>Help and Support<img src={arrow} alt="logo is missing"/></li>
                        <li onClick={slideSubmenu}>Settings<img src={arrow} alt="logo is missing"/></li>
                    </ul>
                </div>
            </S.Headermenu>
            <HeaderSubMenu checksubmenuslide={submenuslide} backArrw={props.backArrw} languagepageAppear={props.languagepageAppear} count={props.count}/>
      </>
    )
}

export default HeaderMenu