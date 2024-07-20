import React, { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addRestaurantData, updateRestaurantData } from "./service";
import { Context } from "../../Context";

export const CommonForm = ({type}) => {
    const { showAlertState, alertMessageState, alertTypeState } = useContext(Context);
	const [showAlert, setShowAlert] = showAlertState;
	const [alertMessage, setAlertMessage] = alertMessageState; 
	const [alertType, setAlertType] = alertTypeState; 

    const [errors, setErrors] = useState({});
	const [formData, setFormData] = useState({
        name: type== 'edit' ? localStorage.getItem("name") : '',
        description: type== 'edit' ? localStorage.getItem("description") : '',
        address: type== 'edit' ? localStorage.getItem("address") : '',
        city: type== 'edit' ? localStorage.getItem("city") : '',
    });

	let history = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);
        setErrors(newErrors);
 
        if (Object.keys(newErrors).length === 0) {
            if(type=='add'){
                // Form submission logic here
                const newDataArray = { name: formData.name, description: formData.description, address: formData.address, city: formData.city};
                addRestaurantData(newDataArray)
                .then((response) => {
                    console.log("Data Added", response)
                    setAlertType('success')
                    setAlertMessage(`You have successfully added record no.  ${response.id}`)
                    setShowAlert('true')
                    // need to add success message
                })
                .catch(() => {
                    setAlertType('danger')
                    setAlertMessage('Looks Api Failure, please try again')
                    setShowAlert('true')
                    console.log("Api failed")
                    // need to add error message
                })
                // array.push();
            } else if (type == 'edit'){
                // Form submission logic here
                // Getting an index of an array
                const id = localStorage.getItem("id");
                // let index = array.map(function (e) {return e.id;}).indexOf(id);
                // let a = array[index];
                // // Putting the value from the input
                // // textfield and replacing it from
                // // existing for updation
                // a.Name = formData.name;
                // a.Address = formData.address;
                // a.City = formData.city;
                // a.Description = formData.description;

                const updatedDataArray = { name: formData.name, description: formData.description, address: formData.address, city: formData.city};
                updateRestaurantData(updatedDataArray, id)
                .then((response) => {
                    setAlertType('success')
                    setAlertMessage(`You have successfully updated record no. ${response.id}`)
                    setShowAlert('true')
                    console.log("Data updated", response)
                    // need to add success message
                })
                .catch(() => {
                    setAlertType('danger')
                    setAlertMessage('Looks Api Failure, please try again')
                    setShowAlert('true')
                    console.log("Api failed")
                    // need to add error message
                })
            }
             // Redirecting to home page after creation done
             history("/");
             console.log('Form submitted successfully!');
        } else {
            console.log(`Form submission failed
             due to validation errors.`);
        }
    };

    const validateForm = (data) => {
        const errors = {}; 
        if (!data.name.trim()){
            errors.name = 'Name is required';
        }
        if (!data.description.trim()) {
            errors.description = 'Description is required';
        }
        if (!data.address.trim()) {
            errors.address = 'Address is required';
        }
        if (!data.city.trim()) {
            errors.city = 'City is required';
        }
        return errors;
    };

    const handleChange = (e) => {
        //    let newData = []
            const { name, value } = e.target;
            // newData[name]= value
            // validateForm(newData)
            setFormData({
                ...formData,
                [name]: value,
            });
        };

    return(
        <Form className="d-grid gap-2" style={{ margin: "5rem" }}>
            {/* Fetching a value from input textfield and set using handlechange*/}
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control
                    onChange={handleChange}
                    type="text"
                    name="name"
                    label="name"
                    aria-label="name"
                    value={formData.name}
                    placeholder="Enter Name"
                    isValid={formData.name}
                    isInvalid={errors.name}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Control
                    onChange={handleChange}
                    type="textarea"
                    name="description"
                    value={formData.description}
                    placeholder="Enter Description"
                    isValid={formData.description}
                    isInvalid={errors.description}
                    required
                />
            </Form.Group>
            {/* Fetching a value from input textfield and update using handle change*/}
            <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Control
                    onChange={handleChange}
                    type="text"
                    name="address"
                    value={formData.address}
                    placeholder="Address"
                    isValid={formData.address}
                    isInvalid={errors.address}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Control
                    onChange={handleChange}
                    type="text"
                    name="city"
                    value={formData.city}
                    placeholder="City"
                    isValid={formData.city}
                    isInvalid={errors.city}
                    required
                />
            </Form.Group>
            <div className="row">
                <div className="col-xs-12 col-2 ">
                {/* handing a onclick event in button for firing a function */}
                    <Button onClick={(e) => handleSubmit(e)} variant="primary" size="lg" type="submit">
                    { type == 'add' ? 'Add' : 'Update'}
                    </Button>
                </div>
                {/* Redirecting back to home page */}
                <div className="col-xs-12 col-2 ">
                    <Link to="/">
                        <Button variant="info" size="lg">
                            Home
                        </Button>
                    </Link>
                </div>
            </div>
        </Form>
    );
}