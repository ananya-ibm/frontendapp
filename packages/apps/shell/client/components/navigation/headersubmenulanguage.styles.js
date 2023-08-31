import styled, { css } from 'styled-components';


export const Headersubmenulanguage = styled('div')`
#sidebarMenu {
    height: 100%;
    position: fixed;
    left: ${(props) => props.isSlide ? '15.5rem' : '-45rem'};
    width: 100%;
    margin-top: 0px;
    transform: ${(props) => props.isSlide ? 'translateX(-25%)' : 'translateX(-78%)'};
    transition: transform 500ms ease-in-out;
    background: #fff;
}
.sidebarMenuInner{
    margin:0;
    padding:0;
    border-top: 1px solid rgba(255, 255, 255, 0.10);
}
.sidebarMenuInner li{
    display:flex;
    list-style: none;
    color: #000;
    font-size:2rem;
    padding: 20px;
    margin:1.5rem auto;
    cursor: pointer;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 1px solid rgba(255, 255, 255, 0.10);
}
.sidebarMenuInner li img{
    transform: rotate(178deg);
    width:1.8%;
}
#tick-mark {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 30px;
    right:1rem;
}

#tick-mark::before {
    position: absolute;
    left: 0;
    top: 50%;
    height: 50%;
    width: 3px;
    background-color: #336699;
    content: "";
    transform: translateX(10px) rotate(-45deg);
    transform-origin: left bottom;
}

#tick-mark::after {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 100%;
    background-color: #336699;
    content: "";
    transform: translateX(10px) rotate(-45deg);
    transform-origin: left bottom;
}

`;