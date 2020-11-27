import React from "react";

import { Grid, Typography } from '@material-ui/core';

const NoInfoPage = (props) => {

	return(
		<Grid container
			  justify={"center"}
			  alignContent={"center"}
			  alignItems={"center"}
			  style={{height: "75vh"}}
		>
			<Grid item>
				<Typography variant={"h2"} align={"center"}>Please Take A Photo On the Camera Page!</Typography>
			</Grid>
		</Grid>
	);
};

export default NoInfoPage;
