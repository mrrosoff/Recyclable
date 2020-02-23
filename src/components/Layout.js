import React, { useState } from "react";

import Navigation from "./Navigation";
import DetailsPage from './pages/DetailsPage';
import CameraComponent from "./CameraComponent";

import makeStyles from "@material-ui/core/styles/makeStyles";
import { Container, Grid } from '@material-ui/core';

const useStyles = makeStyles({ root: { position: 'fixed', bottom: 0, width: '100%' } });

const Layout = props => {

    const [picUri, setPicUri] = useState('');
    const [page, setPage] = useState(0);
    const [objectDetails, setObjectDetails] = useState({'name': '', 'recyclable': null});

    return(
        <>
            <Container>
                <Grid container justify={"center"} alignContent={"center"} alignItems={"center"} direction={"column"}>
                    <Grid item>
                        { page ? <DetailsPage dataUri={picUri}/> : <CameraComponent setPicUri={setPicUri} setPage={setPage} /> }
                    </Grid>
                </Grid>
            </Container>
            <Navigation page={page} setPage={setPage} />
        </>
    );
};

export default Layout;
