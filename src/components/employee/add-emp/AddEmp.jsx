import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const AddEmp = () => {
  let [state, setState] = useState({
    loading: false,
    employee: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      title: "",
    },
  });

  let navigate = useNavigate();

  let submitForm = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://6499f4d679fbe9bcf840315a.mockapi.io/employees",
        state.employee
      )
      .then((res) => {
        setState([...state, res.data]);
      })
      .catch((err) => {
        setState({
          ...state,
          errorMessage: err.message,
        });
        // navigate("/employees/add", { replace: false });
      });
    navigate("/", { replace: true });
  };

  let updateInp = (event) => {
    setState({
      ...state,
      employee: {
        ...state.employee,
        [event.target.name]: event.target.value,
      },
    });
  };
  let { loading, employee, errorMessage } = state;
  return (
    <>
   
      <section className="add-employee p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-success fw-bold">Create New Employee</p>
              
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                    required={true}
                    name="name"
                    value={employee.name}
                    onChange={updateInp}
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="photo"
                    value={employee.photo}
                    onChange={updateInp}
                    type="text"
                    className="form-control"
                    placeholder="Photo URL"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="mobile"
                    value={employee.mobile}
                    onChange={updateInp}
                    type="number"
                    className="form-control"
                    placeholder="Mobile No."
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="email"
                    value={employee.email}
                    onChange={updateInp}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="title"
                    value={employee.title}
                    onChange={updateInp}
                    type="text"
                    className="form-control"
                    placeholder="Title"
                  />
                </div>

                <div className="mb-2">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Create"
                  />
                  <Link to={"/employees/list"} className="btn btn-dark ms-2">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddEmp;
