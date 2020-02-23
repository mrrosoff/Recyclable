import React from "react";

import Camera, { FACING_MODES } from "react-html5-camera-photo";
import 'react-html5-camera-photo/build/css/index.css';

const CameraComponent = (props) => {
    const { handleTakePhoto, handleTakePhotoAnimationDone } = props;
    return <Camera
        onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
        onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
        idealFacingMode={FACING_MODES.ENVIRONMENT}
        idealResolution={{width: 1908, height: 4032}}
    />;
}

export default CameraComponent;