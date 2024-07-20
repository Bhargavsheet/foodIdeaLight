import React from 'react';
import * as router from 'react-router'
import { MemoryRouter } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom'
import { CommonForm } from "./CommonForm";
import { Context } from '../../Context';

const navigate = jest.fn()

// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})
beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

// test("Testing Name Input box ", async () => {
//     // let checkInput = screen.getByRole("textbox")
//     render(<CommonForm type={"add"}/>)
//     const checkInput = await screen.findByRole("textbox", { name: /name/i });
//     expect(checkInput).toBeInTheDocument();
// })


test('search tests', async () => {
    const ContextProvider = ({ children }) => {
        const [showAlert, setShowAlert] = React.useState(true);
        const [alertMessage, setAlertMessage] = React.useState('Test alert');
        const [alertType, setAlertType] = React.useState('warning');

        const value = { 
            showAlertState: [showAlert, setShowAlert], 
            alertMessageState: [alertMessage, setAlertMessage],
            alertTypeState : [alertType, setAlertType]
        }
      return <Context.Provider value={value}>{children}</Context.Provider>;
    };
    render(<MemoryRouter><CommonForm type={"add"}/></MemoryRouter>, { wrapper: ({ children }) => <ContextProvider>{children}</ContextProvider> });
    // const checkInput = await screen.findByRole("text", { name: /name/i });
    // expect(checkInput).toBeInTheDocument();
});
