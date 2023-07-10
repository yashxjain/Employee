import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../spinner/Spinner";
const ViewEmp = () => {
  let { empId } = useParams();
  let [state, setState] = useState({
    loading: false,
    employee: {},
    errorMessage: "",
  });

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
  }, []);

  let { loading, employee, errorMesage } = state;

  return (
    <>
      <section className="view-employee-intro p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-primary">View Employee</p>
              
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {Object.keys(employee).length > 0 && (
            <section className="view-employee mt-3">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <img src={employee.photo} alt="" className="emp-img" />
                  </div>
                  <div className="col-md-8">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-action">
                        Name: <span className="fw-bold">{employee.name}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Mobile:{" "}
                        <span className="fw-bold">{employee.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Email: <span className="fw-bold">{employee.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Title: <span className="fw-bold">{employee.title}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Link to={"/employees/list"} className="btn btn-dark">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </React.Fragment>
      )}
    </>
  );
};

export default ViewEmp;
