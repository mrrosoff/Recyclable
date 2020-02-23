import React, { useState } from "react";

import CameraComponent from "./CameraComponent";
import Navigation from "./Navigation";

import Container from '@material-ui/core/Container';
import DetailsPage from './pages/DetailsPage';

const CameraPage = (props) => {
    const {setPicUri, setPage} = props;

    const handleTakePhoto = (dataUri) => {
        console.log(dataUri);
        setPicUri(dataUri);
    }

    const handleTakePhotoAnimationDone = (dataUri) => {
        setPage(1);
    }

    return <CameraComponent handleTakePhoto={handleTakePhoto} handleTakePhotoAnimationDone={handleTakePhotoAnimationDone} />;
}



const Layout = props => {

    const [picUri, setPicUri] = useState('');
    const [page, setPage] = useState(0);

    return(
        <>
            <div style={{minHeight: "90vh"}}>
                    {page ?
                        <DetailsPage dataUri={picUri}/>
                        : <CameraPage setPicUri={setPicUri} setPage={setPage} />
                    }
            </div>
            <div style={{minHeight: "10vh"}}>
                <Navigation page={page} setPage={setPage} />
            </div>
        </>
    );
};

export default Layout;