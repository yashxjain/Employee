import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const EditEmp = () => {
  let { empId } = useParams();
  let [state, setState] = useState({
    loading: false,
    employee: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      title: "",
    },
    errorMessage: "",
  });
  let navigate = useNavigate();

  useEffect(() => {
    setState({ ...state, loading: true });
    axios
      .get(`https://6499f4d679fbe9bcf840315a.mockapi.io/employees/${empId}`)
      .then((res) => {
        setState({
          ...state,
          loading: false,
          employee: res.data,
        });
        console.log(res.data);
      })
      .catch((err) => {
        setState({
          ...state,
          loading: false,
          erroeMessage: err.message,
        });
      });
  }, [empId]);

  let updateInp = (eve) => {
    setState({
      ...state,
      employee: {
        ...state.employee,
        [eve.target.name]: eve.target.value,
      },
    });
  };

  let submitForm = (events) => {
    events.preventDefault();
    axios
      .put(
        `https://6499f4d679fbe9bcf840315a.mockapi.io/employees/${empId}`,
        state.employee,
        empId
      )
      .then((res) => {
        setState([...state, res.data]);
        navigate("/", { replace: true });
        // console.log(res.data);
      })
      .catch((err) => {
        setState({
          ...state,
          errorMessage: err.message,
        });
        // navigate(`/employees/edit/${empId}`, { replace: true });
      });
    navigate("/", { replace: true });
  };

  let { loading, employee, errorMessage } = state;

  return (
    <>
      <section className="add-employee p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-primary fw-bold">Edit Employee Details</p>
              
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                    name="name"
                    onChange={updateInp}
                    required="true"
                    value={employee.name}
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    name="photo"
                    onChange={updateInp}
                    required="true"
                    value={employee.photo}
                    type="text"
                    className="form-control"
                    placeholder="Photo URL"
                  />
                </div>
                <div className="mb-2">
                  <input
                    name="mobile"
                    onChange={updateInp}
                    required="true"
                    value={employee.mobile}
                    type="number"
                    className="form-control"
                    placeholder="Mobile No."
                  />
                </div>
                <div className="mb-2">
                  <input
                    name="email"
                    onChange={updateInp}
                    required="true"
                    value={employee.email}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-2">
                  <input
                    name="title"
                    onChange={updateInp}
                    required="true"
                    value={employee.title}
                    type="text"
                    className="form-control"
                    placeholder="Title"
                  />
                </div>

                <div className="mb-2">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Update Change"
                  />
                  <Link to={"/employees/list"} className="btn btn-dark ms-2">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <img className="emp-img" src={employee.photo} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditEmp;
