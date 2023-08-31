
import React from 'react';
import performance from '../../static/images/my_performance/my_performance.png'

const MyPerformance = (props) => {
    return(
      <div>
        <div style={{width:"100vw",marginTop:"5vh",fontSize:"60px",fontWeight:"900",padding:"3 rem"}}>
          My Performance
        </div>
        <div>
        <img style={{width:"100%"}} src={performance} alt="image missing" />
        </div>
      </div>
    )
}
export default MyPerformance;  