import React from "react";

import { CircularProgress, Grid, Typography } from '@material-ui/core';

const DetailsPage = (props) => {
    let {objectDetails: {name, recyclable, type}} = props;

    let message = "Not sure if it's recyclable";
    let color = "auto";
    if (typeof(recyclable) == "boolean") {
        message = recyclable ? "It's recyclable!" : "It's not recyclable :(";
        color = recyclable ? "green" : "red";
    }

    name = name.charAt(0).toUpperCase() + name.slice(1);

    return(
        <Grid container>
            <Grid item xs={12}>
                <Grid container justify={"center"} alignItems={"center"} alignContent={"center"} direction={"column"} spacing={3}>
                    <Grid item>
                        <img src={props.dataUri} style={{border: "5px solid " + color, borderRadius: "50%", width:"45vh", height:"45vh", objectFit: "cover"}}/>
                    </Grid>
                    {name || recyclable ?
                        <>
                            <Grid item>
                                <Typography variant={"h4"}>{name}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant={"h5"} style={{color: color}}>{message}</Typography>
                            </Grid>
                            {type ?
                                <Grid item>
                                    <Typography variant={"body2"} style={{color: color}}>Plastic Type: {type}</Typography>
                                </Grid>
                                : null
                            }

                        </>
                        :
                        <Grid item>
                            <CircularProgress />
                        </Grid>
                    }
                </Grid>
            </Grid>
            {(name || recyclable) && false?
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Typography variant={"body1"}>
                                &#8226; Type 1 (polyethylene terephthalate) is commonly found in soft drink and water bottles.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body1"}>
                                &#8226; Type 2 (high-density polyethylene) is found in most hard plastics such as milk jugs, laundry detergent bottles, and some dishware.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body1"}>
                                &#8226; Type 3 (polyvinyl chloride) includes items such as shampoo bottles, shower curtains, hula hoops, credit cards, wire jacketing, medical equipment, siding, and piping.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body1"}>
                                &#8226; Type 4 (low-density polyethylene) is found in shopping bags, squeezable bottles, tote bags, clothing, furniture, and carpet.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body1"}>
                                &#8226; Type 5 is polypropylene and makes up syrup bottles, straws, Tupperware, and some automotive parts.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body1"}>
                                &#8226; Type 6 is polystyrene and makes up meat trays, egg cartons, clamshell containers, and compact disc cases.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body1"}>
                                &#8226; Type 7 includes all other plastics such as bulletproof materials, 3- and 5-gallon water bottles, cell phone and tablet frames, safety goggles and sunglasses.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                : null
            }
        </Grid>
    );
};

export default DetailsPage;
