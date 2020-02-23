import React from "react";

import CircularProgress from '@material-ui/core/CircularProgress';

const DetailsPage = (props) => {
    const {objectDetails: {name, recyclable}} = props;

    let message = "Not sure if it's recyclable";
    if (typeof(recyclable) == "boolean")
        message = recyclable ? "It's recyclable!" : "It's not recyclable :(";

    
    return <>
        <div style={{marginLeft: "auto", marginRight: "auto", width: 'fit-content', paddingTop: "5vh", marginBottom: "6px"}}>
            <img src={props.dataUri} style={{borderRadius: "50%", width:"40vh", height:"40vh", objectFit: "cover"}}/>
        </div>
        {name || recyclable ? (
        <>
            <div style={{marginLeft: "auto", marginRight: "auto", width: 'fit-content', marginTop: "6px", marginBottom: "6px"}}>
                <h3>{name}</h3>
            </div>
            <div style={{marginLeft: "auto", marginRight: "auto", width: 'fit-content', marginTop: "6px", marginBottom: "6px"}}>
                <h4>{message}</h4>
            </div>
        </>
        ) : (
            <div style={{marginLeft: "auto", marginRight: "auto", width: 'fit-content', marginTop: "auto", marginBottom: "auto"}}>
            <CircularProgress />
        </div>
        )}
        </>;
}

export default DetailsPage;