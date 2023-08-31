import styled, { css } from 'styled-components';


export const Headermenu = styled('div')`
#sidebarMenu {
    height: 100%;
    position: fixed;
    left: ${(props) => props.chekMenu ? '15.5rem' : '-45rem'};
    width: 100%;
    margin-top: 0px;
    transform: ${(props) => props.chekMenu ? 'translateX(-25%)' : 'translateX(-78%)'};
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

`;