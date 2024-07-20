// Filename - components/Home.js

import React, {useState, useEffect, useContext} from "react";
import { Button, Table, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import CustomPagination from "../Utils/CustomPagination";
import { getRestaurantData, deleteRestaurantData } from "./service";
import { getPaginatedData } from "../Utils/Common"
import Alert from 'react-bootstrap/Alert';
import { Context } from "../../Context";


export const List = () => {
	const [totalData, setTotalData] = useState([]);
	const [currentPageData, setCurrentPageData] = useState([]);
	const [currentPage, setCurrentPage] = useState("1");
	const itemPerPage = 10;
	const { showAlertState, alertMessageState, alertTypeState } = useContext(Context);
	const [showAlert, setShowAlert] = showAlertState;
	const [alertMessage, setAlertMessage] = alertMessageState; 
	const [alertType, setAlertType] = alertTypeState; 

	const paginationClicked = (event, itemClicked = '') => {
		if(event) {
			itemClicked = event.target.text;
		} 
		if(itemClicked){
			itemClicked = itemClicked;
		}
		const startIndex = (itemClicked - 1) * itemPerPage;
		const pageRecords = getPaginatedData(totalData, startIndex, itemPerPage)
		setCurrentPageData(pageRecords);
		setCurrentPage(itemClicked);
	}
	
	const  setID = (id, name, description, address, city) => {
		localStorage.setItem("id", id);
		localStorage.setItem("name", name);
        localStorage.setItem("description", description);
		localStorage.setItem("address", address);
		localStorage.setItem("city", city);

	}

	const dismisAlert = () => {
		setShowAlert(false)
		setAlertMessage('')
		setShowAlert('')
	}

	const restaurantData = async () => {
		await getRestaurantData()
		.then((response) => {
			const startIndex = (currentPage - 1) * itemPerPage;
			const pageRecords = getPaginatedData(response, startIndex, itemPerPage)		
			setCurrentPageData(pageRecords)
			setTotalData(response)
		})
		.catch((error) => {
			console.log('API Error', error)
		})
	}

	useEffect(()=> {
		restaurantData()
	}, [])

	// Deleted function - functionality
	// for deleting the entry
	const deleted = (id) => {
		deleteRestaurantData(id)
			.then((response) => {
				// success message need to show case
				console.log('success', response)
				setAlertType('success')
				setAlertMessage(`You have successfully Deleted record no. ${response.id}`)
				setShowAlert('true')
			})
			.catch((error) => {
				console.log('API Error', error)
				setAlertType('danger')
				setAlertMessage('Looks Api Failure, please try again')
				setShowAlert('true')
			})

		// deleting the entry with index
		setTotalData(totalData.filter((obj) => obj.id !== id));
		let newCurrantPageData = currentPageData.filter((obj) => obj.id !== id)
		setCurrentPageData(newCurrantPageData);
		if(newCurrantPageData?.length == 0){
			paginationClicked('', currentPage - 1)
		}
	}

	return (
		<Container>
			{showAlert && ( 
				<div className="mt-4">
					<Alert 
						variant={alertType}
						onClose={() => dismisAlert()} 
						dismissible> 
						<p>{alertMessage}</p> 
					</Alert> 
				</div>
            )} 
			<div className="row text-end">
				<div className="mb-4 mt-4">
					<Link to="/create">
						<Button variant="warning" size="lg">
							Add Restaurant
						</Button>
					</Link>
				</div>
			</div>
			<div className="row">
				<div className="col-12 mb-4">
					<Table striped bordered hover responsive size="sm">
						<thead>
							<tr>
								<th>Id</th>
								<th>Name</th>
								<th>Description</th>
								<th>Address</th>
								<th>City</th>
								{/* <th>Created at</th> */}
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{/* Mapping though every element 
								in the array and showing the 
								data in the form of table */}
							{currentPageData.map((item) => {
								return (
									<tr>
										<td>{item.id}</td>
										<td>{item.name}</td>
										<td>{item.description}</td>
										<td>{item.address}</td>
										<td>{item.city}</td>
										{/* <td>{item.createdAt}</td> */}
										{/* getting theid,name, and 
											address for storing these
											value in the jsx with 
											onclick event */}
										<td>
											<div className="d-flex">
													<Link to={`/edit`} className="me-4">
														<Button
															onClick={(e) =>
																setID(
																	item.id,
																	item.name,
																	item.description,
																	item.address,
																	item.city,
																)
															}
															variant="info"
														>
														<img src="/edit.svg" height={15} />
														</Button>
													</Link>
											{/* Using thr deleted function passing the id of an entry */}
													<Button
														onClick={(e) =>
															deleted(item.id)
														}
														// variant="danger"
													>
														<img src="/delete.svg" height={15} />
													</Button>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</div>
			</div>
			{/* Pagination utilitis */}
			<div className="row float-end">
				< CustomPagination 
					totalDataLength = {totalData?.length}
					currentPage = {currentPage}
					itemPerPage = {itemPerPage}
					paginationClicked = {paginationClicked}
				/>
			</div>

			
		</Container>
	);
}
