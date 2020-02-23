import React from "react";

const DetailsPage = (props) => {
    return <>
        <div style={{marginLeft: "auto", marginRight: "auto", width: 'fit-content', paddingTop: "5vh", marginBottom: "6px"}}>
            <img src={props.dataUri} style={{borderRadius: "50%", width:"40vh", height:"40vh", objectFit: "cover"}}/>
        </div>
        <div style={{marginLeft: "auto", marginRight: "auto", width: 'fit-content', marginTop: "6px", marginBottom: "6px"}}>
            <h3>Coca-Cola can</h3>
        </div>
        <div style={{marginLeft: "auto", marginRight: "auto", width: 'fit-content', marginTop: "6px", marginBottom: "6px"}}>
            <h4>It's recyclable!</h4>
        </div>
        </>;
}

export default DetailsPage;