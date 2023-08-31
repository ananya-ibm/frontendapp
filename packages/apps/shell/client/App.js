/* eslint-disable react/prop-types */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React,{useState} from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/home';
import MyRedemption from './components/myRedemption';
import Header from './components/navigation/header';
import MainLayout from './hoc/mainLayout';
import * as S from './App.styles';
import MyEarnings from './components/myEarnings';
import MyPerformance from './components/myPerformance';
import { Faq } from './components/Faq/Faq.styles';
import FaQ from './components/Faq/Faq';
import ContactUs from './components/Contactus/Contactus';
import MyProfile from './components/myProfile'
function App() {
return (
    <S.FontUpdated>
    <BrowserRouter>
      <Header/>
      <MainLayout>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/my-redemption" component={MyRedemption} />
          <Route path="/my-earnings" component={MyEarnings} />
          <Route path="/my-performance" component={MyPerformance} />   
          <Route path="/my-profile" component={MyProfile} />          
          <Route path="/faq" component={FaQ} />
          <Route path="/contactus" component={ContactUs} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  </S.FontUpdated>
  );
}
export default App;