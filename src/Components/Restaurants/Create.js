// Filename - Components/Create.js
import React from "react";
import { Container } from "react-bootstrap";
import { CommonForm } from "./CommonForm";

export const Create = () => {
	return (
        <Container>
            <CommonForm type={"add"} />
        </Container>
	);
}