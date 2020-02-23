import React, { useCallback } from "react";
import Webcam from "react-webcam";

import {Button, Box, Card, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import {sendServerRequestWithBody} from "../api/restfulAPI";
import useWindowDimensions from "../utils/windowDimensions";
import resizeImage from "../utils/resizeImage";

const WebcamSection = props => {

    const videoConstraints = { facingMode: "environment" };
    const { height, width } = useWindowDimensions();
    if (width >= 960) {
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
    } else {
        return (
            <Paper>
                <Card>
                    <div style={{ position: "relative" }}>
                        <Webcam
                            audio={false}
                            ref={props.webcamRef}
                            height={Math.floor(height * 0.7)}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                        />
                        <Grid container
                              style={{ position: "absolute", bottom: "10px" }}
                              direction={"column"}
                              justify={"center"}
                              alignItems={"center"}
                              alignContent={"center"}
                              spacing={5}
                        >
                            <Grid item>
                                <div style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "50%" }}>
                                    <IconButton variant="contained" onClick={props.capture}>
                                        <PhotoCamera />
                                    </IconButton></div>
                            </Grid></Grid></div>
                </Card>
            </Paper>
        );
    }
};

const SideMenuContent = props => {
    return (
        <>
            <Grid item>
                <Typography variant={"h3"}>Recyclable</Typography>
            </Grid>
            <Grid item>
                <Typography variant={"body1"}>
                    You finish your delicious diabetes-in-a-bottle beverage graciously provided by the good organizers
                    of HackCU, and then turn your attention to the problem of the plastic or light aluminum container
                    with which you are about to pollute the environment. You inspect it for a recycling number or
                    instruction, but in your sleep-deprived deliriousness, find nothing.  What will you do??
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant={"body1"}>
                    Attempting to recycle containers that can't be recycled causes a lot of havoc and extra work for
                    recycling plants, thereby decreasing their efficiency and increasing their cost. But putting
                    extra waste in the landfills is just as bad: this practice is entirely unsustainable.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant={"body1"}>
                    This is where Recyclable comes in: with just a brief interaction with our app using a mobile
                    device of your choice, you can quickly determine which waste articles are recyclable in your area.
                    By using our app, you save your recycling facilities time and work while also reducing
                    unnecessary waste in our landfills!
                </Typography>
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
            <Grid container direction={"column"} spacing={3}>
                <SideMenuContent {...props} />
            </Grid>
        );
    } else {
        return null;
    }

};

const CameraPage = props => {

    const webcamRef = React.useRef(null);
    let { setPicUri, setPage, retrieveClassificationResponse } = props;

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
        resizeImage(imageSrc, 1024, uri => {
            console.log('resized:', uri);
            sendServerRequestWithBody("getProductType", {"dataUri": uri}).then(r => {
                console.log(r);
                retrieveClassificationResponse(r);
            });
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
                <WebcamSection webcamRef={webcamRef} capture={capture}/>
            </Grid>
            <Grid item xs={12} md={5}>
                <SideTextMenu capture={capture}/>
            </Grid>
        </Grid>
    );
};

export default CameraPage;
