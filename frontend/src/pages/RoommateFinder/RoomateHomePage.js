//Author: Lins George (B00895654)

import React, { useState, form, Fragment, useEffect } from "react";
import { AppBar, Button, IconButton, Toolbar, Typography, Tabs, Tab, CardContent, Grid } from "@material-ui/core";
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PostRoomatesAd from "./PostRoomatesAd";
import ListRoomates from "./ListRoomates";
import NavigationBar from "../NavigationBar/Navbar";


export default function RoomateHomePage() {

    const [value, setValue] = useState("list");
    const onHandleChange = (event, newValue) => {
        //console.log(newValue);
        setValue(newValue);
        
    };


    return (
        <div>
        <NavigationBar />
           
            <div>
                <Tabs
                    onChange={onHandleChange}
                    value={value}
                    centered
                    textColor="black"
                    indicatorColor="primary"
                    aria-label="basic tabs example"
                // variant="fullWidth"
                >
                    <Tab value="list" label="Show Roomate listings" />
                    <Tab value="post" label="Post Roomate Listing" />

                </Tabs>
            </div>
            {value == "list" ? (
                <ListRoomates />
            ) : <PostRoomatesAd setValue />}

        </div>
    );
}