import React, { useState } from "react";
import Webcam from "react-webcam";

import Navigation from "./Navigation";

import { Button, Box, Container, Grid } from '@material-ui/core';
import DetailsPage from './pages/DetailsPage';

import { sendServerRequestWithBody } from "../api/restfulAPI";
import useWindowDimensions from "../utils/windowDimensions";

const videoConstraints = {
    facingMode: "environment"
};

const CameraPage = props => {
    const webcamRef = React.useRef(null);
    const { height, width } = useWindowDimensions();

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        props.setPicUri(imageSrc);
        props.setPage(1);
        console.log(imageSrc);
        console.log(webcamRef.current);
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
                        height={parseInt(height*0.7)}
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
    const [objectDetails, setObjectDetails] = useState({'name': '', 'recyclable': null});

    return(
        <Container>
            <Grid container justify={"center"} alignContent={"center"} alignItems={"center"} direction={"column"}>
                <Grid item>
                    <Box height={"90vh"}>
                        { page ? <DetailsPage dataUri={picUri} objectDetails={objectDetails} /> : <CameraPage setPicUri={setPicUri} setPage={setPage} /> }
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
