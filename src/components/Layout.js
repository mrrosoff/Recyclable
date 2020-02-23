import React, { useState } from "react";

import Navigation from "./Navigation";
import DetailsPage from './pages/DetailsPage';
import NoInfoPage from "./pages/NoInfoPage";
import CameraComponent from "./CameraComponent";

import makeStyles from "@material-ui/core/styles/makeStyles";
import { Box, Container, Grid } from '@material-ui/core';

const useStyles = makeStyles({ page: { marginTop: 80, height: "85vh"} });

const Layout = props => {

    const [picUri, setPicUri] = useState('');
    const [page, setPage] = useState(0);
    const [objectDetails, setObjectDetails] = useState({'name': '', 'recyclable': null});

    const classes = useStyles();

    const retrieveClassificationResponse = response => {
        setObjectDetails(response);
    };

    let pageToDisplay = page ? (picUri ?
        <DetailsPage dataUri={picUri} objectDetails={objectDetails} />
        :
        <NoInfoPage />)
        :
        <CameraComponent
            setPicUri={setPicUri}
            setPage={setPage}
            retrieveClassificationResponse={retrieveClassificationResponse}
            setObjectDetails={setObjectDetails}
        />;

    return (
        <>
            <Container>
                <Box className={classes.page}>
                    <Grid container justify={"center"} alignContent={"center"} alignItems={"center"} direction={"column"}>
                        <Grid item>
                            {pageToDisplay}
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Navigation page={page} setPage={setPage} />
        </>
    );
};

export default Layout;
