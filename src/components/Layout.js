import React, { useState } from "react";

import CameraComponent from "./CameraComponent";
import Navigation from "./Navigation";

import Container from '@material-ui/core/Container';
import DetailsPage from './pages/DetailsPage';

import { sendServerRequestWithBody } from "../api/restfulAPI";

const CameraPage = (props) => {
    const {setPicUri, setPage} = props;

    const handleTakePhoto = (dataUri) => {
        console.log(dataUri);
        setPicUri(dataUri);
        new Promise(() => {sendServerRequestWithBody("getProductType", {"dataUri": dataUri})}).then(response => {
            console.log("response");
            // props.setObjectDetails(...);
        });
    }
    const handleTakePhotoAnimationDone = (dataUri) => {
        setPage(1);
    }

    return <CameraComponent handleTakePhoto={handleTakePhoto} handleTakePhotoAnimationDone={handleTakePhotoAnimationDone} />;
}



const Layout = props => {

    const [picUri, setPicUri] = useState('');
    const [page, setPage] = useState(0);
    const [objectDetails, setObjectDetails] = useState({'name': '', 'recyclable': null});

    return(
        <Container>
            <div style={{minHeight: "90vh"}}>
                    {page ?
                        <DetailsPage dataUri={picUri} objectDetails={objectDetails} />
                        : <CameraPage setPicUri={setPicUri} setPage={setPage} setObjectDetails={setObjectDetails} />
                    }
            </div>
            <div style={{minHeight: "10vh"}}>
                <Navigation page={page} setPage={setPage} />
            </div>
        </Container>
    );
};

export default Layout;