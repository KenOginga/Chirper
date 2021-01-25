import React, { useEffect, useState } from "react";
import { useCustomer, useSetCustomer } from "../../Contexts/customer-context";
import axios from "axios";
import CustomerList from "../CustomerList";
import InputWithIcon from "../InputWithIcon";
import TextAreaWithIcon from "../TextAreaWithIcon";

export default function CustomerInfoForm() {
    const [filter, setFilter] = useState("");
    const [customers, setCustomers] = useState([]);
    const customer = useCustomer();
    const setCustomer = useSetCustomer();

    const getAllCustomers = async function () {
        axios.get("/api/customer/getAll/").then(res => {
            setCustomers(res.data);
        })
    }

    useEffect(() => {
        getAllCustomers();
    })

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="row m-5 w-75">
                    <div className="col-4 p-5">
                        <div className="card">
                            <div className="card-header">
                                Customers
                            </div>
                            <div className="card-body">
                                <InputWithIcon
                                    label={<i className='fa fa-search' />}
                                    inputProps={{
                                        placeholder: "search",
                                        onChange: (e) => {setFilter(e.target.value)}
                                    }}
                                />
                                <CustomerList customers={customers} filter={filter}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-8 p-5">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <InputWithIcon
                                        label={<i className='fa fa-user' />}
                                        inputProps={{
                                            placeholder: "Name",
                                            value: customer ? customer.fullName : "",
                                            onChange: (e) => { setCustomer({ ...customer, fullName: e.target.value }) }
                                        }}
                                    />
                                </div>
                                <div className="col-6">
                                    <InputWithIcon
                                        label={<i className='fa fa-phone' />}
                                        inputProps={{
                                            placeholder: "Phone Number",
                                            value: customer ? customer.phone : "",
                                            onChange: (e) => { setCustomer({ ...customer, phone: e.target.value }) }
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <InputWithIcon
                                        label={<i className='fa fa-home' />}
                                        inputProps={{
                                            placeholder: "Address",
                                            value: customer ? customer.address : "",
                                            onChange: (e) => { setCustomer({ ...customer, address: e.target.value }) }
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <InputWithIcon
                                        label={<i className='fas fa-city' />}
                                        inputProps={{
                                            placeholder: "City",
                                            value: customer ? customer.city : "",
                                            onChange: (e) => { setCustomer({ ...customer, city: e.target.value }) }
                                        }}
                                    />
                                </div>
                                <div className="col-4">
                                    <InputWithIcon
                                        label={<i className='fas fa-city' />}
                                        inputProps={{
                                            placeholder: "State",
                                            value: customer ? customer.state : "",
                                            onChange: (e) => { setCustomer({ ...customer, state: e.target.value }) }
                                        }}
                                    />
                                </div>
                                <div className="col-4">
                                    <InputWithIcon
                                        label={<i className='fas fa-city' />}
                                        inputProps={{
                                            placeholder: "Zip",
                                            value: customer ? customer.zip : "",
                                            onChange: (e) => { setCustomer({ ...customer, zip: e.target.value }) }
                                        }}
                                    />
                                </div>
                            </div>
                            <TextAreaWithIcon
                                label={<><i className='fas fa-book' /> <span>Notes:</span></>}
                                inputProps={{
                                    rows: 5
                                }}
                            />
                        </div>
                        <div className="p-5">
                            <button className="btn btn-danger float-left">Delete Customer</button>
                            <button className="btn btn-light float-right  mx-3">Cancel</button>
                            <button className="btn btn-success float-right  mx-3">Update and Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}