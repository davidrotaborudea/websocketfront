import React, { useState } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const FlightForm = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [curse, setCurse] = useState('');
    const [velocity, setVelocity] = useState('');
    const [altitude, setAltitude] = useState('');
    const [code, setCode] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        const socket = new SockJS('http://localhost:8080/flight-websocket');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            const flightInfo = {
                flight,
                latitude,
                longitude,
                curse,
                velocity,
                altitude,
                code,
            };

            stompClient.send('/app/updateFlight', {}, JSON.stringify(flightInfo));
        });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Update Flight Information
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                <TextField
                    fullWidth
                    label="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    margin="normal" />

                <TextField
                    fullWidth
                    label="Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    margin="normal" />

                <TextField
                    fullWidth
                    label="Altitude"
                    value={altitude}
                    onChange={(e) => setAltitude(e.target.value)}
                    margin="normal" />

                <TextField
                    fullWidth
                    label="Velocity"
                    value={velocity}
                    onChange={(e) => setVelocity(e.target.value)}
                    margin="normal" />

                <TextField
                    fullWidth
                    label="Curse"
                    value={curse}
                    onChange={(e) => setCurse(e.target.value)}
                    margin="normal" />

                <TextField
                    fullWidth
                    label="Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    margin="normal" />

                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Update Flight
                </Button>

            </Box>
        </Container>
    );
};

export default FlightForm;