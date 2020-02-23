import React from 'react';
import { BottomNavigation, BottomNavigationAction }from '@material-ui/core';

import CameraIcon from '@material-ui/icons/CameraAlt';
import DetailsIcon from '@material-ui/icons/Info';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({ root: { position: 'fixed', bottom: 0, padding: 10, width: '100%' } });

const Navigation = (props) => {

    const styles = useStyles();

    return (
        <BottomNavigation
            showLabels
            value={props.page}
            className={styles.root}
            onChange={(event, newValue) => props.setPage(newValue)}
        >
            <BottomNavigationAction label="Camera" icon={<CameraIcon />} />
            <BottomNavigationAction label="Details" icon={<DetailsIcon />} />
        </BottomNavigation>);
};

export default Navigation;
