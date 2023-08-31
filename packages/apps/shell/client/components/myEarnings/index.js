
import React from 'react';
import earnings from '../../static/images/my_earnings/My_Earnings.jpg'
import shellimg2 from '../../static/images/homepage/shell_prod.jpg'
const MyEarnings = (props) => {
    return(
      <div>
        <div style={{width:"100vw",marginTop:"5vh",fontSize:"60px",fontWeight:"900",padding:"3 rem"}}>
          My Earnings
        </div>
        <div>
            <img style={{width:"100%"}} src={earnings} alt="image missing" />
           </div>
           </div>
    )
}
export default MyEarnings;  