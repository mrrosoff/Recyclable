import React from "react";

import { CircularProgress, Grid, Typography } from '@material-ui/core';

const DetailsPage = (props) => {
    let {objectDetails: {name, recyclable}} = props;

    let message = "Not sure if it's recyclable";
    let color = "auto";
    if (typeof(recyclable) == "boolean") {
        message = recyclable ? "It's recyclable!" : "It's not recyclable :(";
        color = recyclable ? "green" : "red";
    }

    name = name.charAt(0).toUpperCase() + name.slice(1);

    return(
        <Grid container justify={"center"} alignItems={"center"} alignContent={"center"} direction={"column"} spacing={3}>
            <Grid item>
                <img src={props.dataUri} style={{border: "5px solid " + color, borderRadius: "50%", width:"45vh", height:"45vh", objectFit: "cover"}}/>
            </Grid>
            {name || recyclable ?
                <>
                    <Grid item>
                        <Typography variant={"h3"}>{name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"h4"} style={{color: color}}>{message}</Typography>
                    </Grid>
                </>
                :
                <Grid item>
                    <CircularProgress />
                </Grid>
            }
        </Grid>
    )
        ;
}

export default DetailsPage;
