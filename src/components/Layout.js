import React, { useState } from "react";
import Webcam from "react-webcam";

import Navigation from "./Navigation";

import { Button, Box, Container, Grid } from '@material-ui/core';
import DetailsPage from './pages/DetailsPage';

import { sendServerRequestWithBody } from "../api/restfulAPI";

const videoConstraints = {
    facingMode: "environment"
};

const CameraPage = () => {
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
    }, [webcamRef]);

    return (
        <Grid container
              justify={"center"}
              alignContent={"center"}
              alignItems={"center"}
              direction={"column"}
              spacing={5}
        >
            <Grid item>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        height={"600"}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" onClick={capture}>Capture photo</Button>
            </Grid>
        </Grid>
    );
};
/*
const CameraPage = (props) => {
    const {setPicUri, setPage} = props;

    const handleTakePhoto = (dataUri) => {
        console.log(dataUri);
        setPicUri(dataUri);
        sendServerRequestWithBody("getProductType", {"dataUri": dataUri}).then(r => console.log(r));
    };
    const handleTakePhotoAnimationDone = (dataUri) => {
        setPage(1);
    };

    return <CameraComponent handleTakePhoto={handleTakePhoto} handleTakePhotoAnimationDone={handleTakePhotoAnimationDone} />;
};*/

const Layout = props => {

    const [picUri, setPicUri] = useState('');
    const [page, setPage] = useState(0);

    return(
        <Container>
            <Grid container justify={"center"} alignContent={"center"} alignItems={"center"} direction={"column"}>
                <Grid item>
                    <Box height={"90vh"}>
                        { page ? <DetailsPage dataUri={picUri}/> : <CameraPage setPicUri={setPicUri} setPage={setPage} /> }
                    </Box>
                </Grid>
                <Grid item>
                    <Navigation page={page} setPage={setPage} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Layout;
