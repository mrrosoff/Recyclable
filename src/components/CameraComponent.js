import React, { useCallback } from "react";
import Webcam from "react-webcam";

import {Button, Box, Card, Grid, Paper, Typography} from "@material-ui/core";

import {sendServerRequestWithBody} from "../api/restfulAPI";
import useWindowDimensions from "../utils/windowDimensions";

const WebcamSection = props => {

    const videoConstraints = { facingMode: "environment" };
    const { height, width } = useWindowDimensions();

    return(
        <Paper>
            <Card>
                <Webcam
                    audio={false}
                    ref={props.webcamRef}
                    height={Math.floor(height * 0.7)}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
            </Card>
        </Paper>
    );
};

const SideMenuContent = props => {
    return (
        <>
            <Grid item>
                <Typography variant={"h3"}>Recyclable</Typography>
            </Grid>
            <Grid item>
                <Typography variant={"body1"}>Use this tool to find out if an item is recyclable.</Typography>
            </Grid>
            <Grid item>
                <Button size="large" variant="contained" color="primary" onClick={props.capture}>Capture Photo</Button>
            </Grid>
        </>
    );
};

const SideTextMenu = props => {

    const { height, width } = useWindowDimensions();

    if (width >= 960) {
        return(
            <Grid container direction={"column"} spacing={5}>
                <SideMenuContent {...props} />
            </Grid>
        );
    } else {
        return(
            <Grid container
                  direction={"column"}
                  justify={"center"}
                  alignItems={"center"}
                  alignContent={"center"}
                  spacing={5}
            >
                <SideMenuContent {...props} />
            </Grid>
        );
    }

};

const CameraPage = props => {

    const webcamRef = React.useRef(null);
    let { setPicUri, setPage } = props;

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        sendServerRequestWithBody("getProductType", {"dataUri": imageSrc}).then(r => {
            console.log(r);
        });
        setPage(1);
        setPicUri(imageSrc);
    }, [webcamRef]);

    return (
        <Grid container
              justify={"center"}
              alignContent={"center"}
              alignItems={"center"}
              spacing={5}
              style={{paddingBottom: "10vh"}}
        >
            <Grid item xs={12} md={7}>
                <WebcamSection webcamRef={webcamRef}/>
            </Grid>
            <Grid item xs={12} md={5}>
                <SideTextMenu capture={capture}/>
            </Grid>
        </Grid>
    );
};

export default CameraPage;
