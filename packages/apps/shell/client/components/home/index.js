
import React from 'react';
import shellimg1 from '../../static/images/homepage/shell_home.jpg'
import shellimg2 from '../../static/images/homepage/shell_prod.jpg'
const Home = (props) => {
    return(
        <div style={{width:"100vw"}}>
           <div>
            <img style={{width:"100%"}} src={shellimg1} alt="image missing" />
           </div>
           <div>
            <img style={{width:"100%",marginTop:"30px"}} src={shellimg2} alt="image missing"/>
           </div>
        </div>
    )
}
export default Home;