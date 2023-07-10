import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../../spinner/Spinner";

const EmpList = () => {
  const [query, setQuery] = useState({
    text: "",
  });

  const [state, setState] = useState({
    loading: false,
    employees: [],
    filteredEmployees: [],
    errorMessage: "",
    currentPage: 1,
    employeesPerPage: 4,
  });

  useEffect(() => {
    setState({ ...state, loading: true });
    axios
      .get("https://6499f4d679fbe9bcf840315a.mockapi.io/employees")
      .then((res) => {
        setState({
          ...state,
          loading: false,
          employees: res.data,
          filteredEmployees: res.data,
        });
        console.log(res.data);
      })
      .catch((err) => {
        setState({
          ...state,
          loading: false,
          errorMessage: err.message,
        });
      });
  }, []);

  const handleDelete = (empId) => {
    axios
      .delete(`https://6499f4d679fbe9bcf840315a.mockapi.io/employees/${empId}`)
      .then((res) => {
        setState({ ...state, loading: true });
        axios
          .get("https://6499f4d679fbe9bcf840315a.mockapi.io/employees")
          .then((res) => {
            setState({
              ...state,
              loading: false,
              employees: res.data,
              filteredEmployees: res.data,
            });
          });
      })
      .catch((err) => console.log(err));
  };

  const searchfun = (e) => {
    setQuery({
      ...query,
      text: e.target.value,
    });
    const theEmployees = state.employees.filter((employee) => {
      return employee.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setState({
      ...state,
      filteredEmployees: theEmployees,
      currentPage: 1,
    });
  };

  const { loading, filteredEmployees, currentPage, employeesPerPage } = state;

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const goToPreviousPage = () => {
    setState({ ...state, currentPage: currentPage - 1 });
  };

  const goToNextPage = () => {
    setState({ ...state, currentPage: currentPage + 1 });
  };

  return (
    <>
      <section className="employee-search p-3">
        <div className="container">
          <div className="grid">
            <div className="col">
              <p className="h3 fw-bold">
                Employee Manager
                <Link to={"/employees/add"} className="btn btn-primary ms-2">
                  <i className="fa fa-plus-circle mb-2"></i> New
                </Link>
              </p>
            </div>

            <div className="row">
              <div className="col">
                <form className="row">
                  <div className="mb-2 col">
                    <input
                      name="text"
                      value={query.text}
                      onChange={searchfun}
                      type="text"
                      placeholder="Search By Names"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2 col">
                    <input
                      type="submit"
                      placeholder="Search By Names"
                      className="btn btn-outline-dark"
                      value="Search"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <section className="employee-list">
          <div className="container">
            <div className="row">
              {currentEmployees.length > 0 &&
                currentEmployees.map((employee) => {
                  return (
                    <div className="col-md-6" key={employee.id}>
                      <div className="card my-2">
                        <div className="card-body">
                          <div className="row align-items-center d-flex justify-content-around">
                            <div className="col-md-4">
                              <img
                                src={employee.photo}
                                alt="user"
                                className="emp-img"
                              />
                            </div>
                            <div className="col-md-7">
                              <ul className="list-group">
                                <li className="list-group-item list-group-item-action">
                                  Name:{" "}
                                  <span className="fw-bold">
                                    {employee.name}
                                  </span>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Mobile:{" "}
                                  <span className="fw-bold">
                                    {employee.mobile}
                                  </span>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Email:{" "}
                                  <span className="fw-bold">
                                    {employee.email}
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <div className="col-md-1 d-flex flex-column align-items-center">
                              <Link
                                to={`/employees/view/${employee.id}`}
                                className="btn btn-warning my-1"
                              >
                                <i className="fa fa-eye"></i>
                              </Link>
                              <Link
                                to={`/employees/edit/${employee.id}`}
                                className="btn btn-primary my-1"
                              >
                                <i className="fa fa-pen"></i>
                              </Link>
                              <button
                                className="btn btn-danger my-1"
                                onClick={() => handleDelete(employee.id)}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3 mb-3">
            {currentPage > 1 && (
              <button
                onClick={goToPreviousPage}
                className="btn btn-outline-dark me-2"
              >
                Previous
              </button>
            )}
            {currentPage < totalPages && (
              <button onClick={goToNextPage} className="btn btn-outline-dark">
                Next
              </button>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default EmpList;
