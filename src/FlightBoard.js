import React, { useState, useEffect, use } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import FlightForm from "./FlightForm";

const FlightBoard = () => {
    const [flightData, setFlightData] = useState([]);

    useEffect(() => {
        
        const socket = new SockJS('http://localhost:8080/flight-websocket');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            stompClient.subscribe("/topic/flights", (messages) => {
                console.log("Mensaje recibido:", messages.body);
                
                if (messages.body) {
                    
                    const updateFlight = JSON.parse(messages.body);
                    setFlightData(prevData => {
                        const updateData = prevData.filter(data => data.code !== updateFlight.code);
                        return [...updateData, updateFlight];
                    });
                }
            });
        });

        return () => {
            stompClient.disconnect();
        };


    }, []);

    return (
        <div>
            <FlightForm />
            <TableContainer component={Paper} sx={{ mt: 3}}>
                <Table>
                    <TableHead>
                    <TableCell>Flight</TableCell>
                    <TableCell>Latitude</TableCell>
                    <TableCell>Longitude</TableCell>
                    <TableCell>Curse</TableCell>
                    <TableCell>Velocity</TableCell>
                    <TableCell>Altitude</TableCell>
                    <TableCell>Code</TableCell>
                    </TableHead>
                    <TableBody>
                        {flightData.map((flightInfo, index) => (
                            <TableRow key={index}>
                                <TableCell>{flightInfo.code}</TableCell>
                                <TableCell>{flightInfo.latitude}</TableCell>
                                <TableCell>{flightInfo.longitude}</TableCell>
                                <TableCell>{flightInfo.curse}</TableCell>
                                <TableCell>{flightInfo.velocity}</TableCell>
                                <TableCell>{flightInfo.altitude}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )

}

export default FlightBoard;