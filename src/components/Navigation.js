import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CameraIcon from '@material-ui/icons/CameraAlt';
import DetailsIcon from '@material-ui/icons/Info';

const Navigation = (props) => {

    return (
        <BottomNavigation
            value={props.page}
            onChange={(event, newValue) => props.setPage(newValue)}
            showLabels
        >
            <BottomNavigationAction label="Camera" icon={<CameraIcon />} />
            <BottomNavigationAction label="Details" icon={<DetailsIcon />} />
        </BottomNavigation>);
};

export default Navigation;
