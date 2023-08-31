import React,{useEffect,useState} from 'react'
import * as S from './helpandsupport.styles';
//import arrow from '../../static/images/header/arrow.png';
import { Link, withRouter,useHistory } from 'react-router-dom';

const HelpandSupport =(props)=>{
    
    const [helpsuportstatus,sethelpsuportstatus] = useState()
    //const [langselect,setlangselect] = useState(false)
    //console.log(props.count)
    const history = useHistory()
    useEffect(()=>{
        console.log(props.history)
        if(!props.backArrw){
            sethelpsuportstatus(props.helpandsupportslide)
        }
        else {
            sethelpsuportstatus(false)
        }
    })

    // const languageSelect = () =>{
    //     setlangselect(!langselect);
    // }
    const Changeurl = (url) =>{
        history.push(url);
        location.reload();
    }
    return(
        <>
            <S.HelpandSupport isSlide={helpsuportstatus}>
                <div id="sidebarMenu">
                    <ul className="sidebarMenuInner">
                        <li onClick={()=> Changeurl('/contactus')}>Contact Us</li>
                        <li onClick={()=> Changeurl('/faq')}>FAQ</li>
                        
                    </ul>
                </div>
            </S.HelpandSupport>
      </>
    )
}

export default withRouter(HelpandSupport)