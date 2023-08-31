
import React from 'react';
import redemption from '../../static/images/my_redemption/my_redemption.jpg'
import shellimg2 from '../../static/images/homepage/shell_prod.jpg'
import { Color } from 'lamina';
const MyRedemption = (props) => {
    return(<div>
         <div style={{width:"100vw",marginTop:"5vh",fontSize:"60px",fontWeight:"900",padding:"3 rem"}}>
           My Redemption
        </div>
        <div>
        <img style={{width:"100%"}} src={redemption} alt="image missing" />
           </div>
           </div>
    )
}
export default MyRedemption;