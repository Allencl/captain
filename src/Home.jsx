import React from 'react';

class Page extends React.Component {
  state = {

  };

  render() {
    return (
        <div style={{paddingTop:16,paddingLeft:22,fontSize:26,textAlign:"left"}}>
            <img style={{position:"relative",width:"36px",height:"33px",top:"-3px",width:35,height:30}} src={require("assets/images/sandclock.gif")} alt="" />
            <h1 style={{paddingLeft:12,display:"inline"}}>oh captain my captain!</h1>
        </div>
    );
  }
}


export default Page;
