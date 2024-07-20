// Filename - Components/Edit.js
import React from "react";
import { Container } from "react-bootstrap";
import { CommonForm } from "./CommonForm";

export const Edit = () => {
	return (
		<Container>
            <CommonForm type={"edit"} />
        </Container>
	);
}