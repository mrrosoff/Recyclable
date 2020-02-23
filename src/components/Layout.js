import React, { useState } from "react";
import Webcam from "react-webcam";

import Navigation from "./Navigation";

import Container from '@material-ui/core/Container';
import DetailsPage from './pages/DetailsPage';

import { sendServerRequestWithBody } from "../api/restfulAPI";

const videoConstraints = {
    facingMode: "user"
};

const CameraPage = () => {
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(() => {
            const imageSrc = webcamRef.current.getScreenshot();
        },
        [webcamRef]
    );

    return (
        <>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />
            <button onClick={capture}>Capture photo</button>
        </>
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
            { page ? <DetailsPage dataUri={picUri}/> : <CameraPage setPicUri={setPicUri} setPage={setPage} /> }
            <Navigation page={page} setPage={setPage} />
        </Container>
    );
};

export default Layout;
