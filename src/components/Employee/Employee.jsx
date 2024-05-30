import { useState } from "react";
import generateUniqueId from "generate-unique-id";
import { FaHome, FaUser } from 'react-icons/fa';

function Employee() {
  const [input, setInput] = useState({
    id: '',
    fname: '',
    lname: '',
    email: '',
    address: '',
    phone: ''
  });

  const [view, setView] = useState([]);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      ...input,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
        !input.fname ||
        !input.lname ||
        !input.email ||
        !input.phone
      ) {
        alert("Please fill in all required fields.");
        return;
      }

    if (input.id) {
      let updatedRecord = view.map((rec) => {
        if (rec.id === input.id) {
          return input;
        }
        return rec;
      });
      setView(updatedRecord);
    } else {
      let obj = {
        ...input,
        id: generateUniqueId({
          length: 4,
          useLetters: false
        })
      };

      setView([
        ...view,
        obj
      ]);
    }

    setInput({
      id: '',
      fname: '',
      lname: '',
      email: '',
      address: '',
      phone: ''
    });
  }

  const handleEdit = (id) => {
    let editedRecord = view.filter((rec) => {
      return rec.id === id;
    });
    setInput(editedRecord[0]);
  }

  const handleDelete = (id) => {
    let deletedRecord = view.filter((rec) => {
      return rec.id !== id;
    });
    setView(deletedRecord);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#874F99" }}>
        <div className="container-fluid">
          <div className="row d-flex justify-content-between w-100">
            <div className="col-2">
            <FaHome size={24} style={{ marginRight: '5px',color:"white" }} /> 
            </div>
            <div className="col-10 d-flex justify-content-end">
              <h5 className="text-white"><FaUser size={18} style={{ marginRight: '5px',color:"white" }} />Employee Management</h5>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-4"></div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="px-3 py-2 mb-0" style={{ backgroundColor: "#874F99", color: "white" }}>
              New Employee
            </h2>
            <form className="mt-4 px-3" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group col-md-12 pb-3">
                  <input type="text" id={input.id} hidden />
                </div>
                <div className="form-group col-md-12 pb-3">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" className="form-control" name="fname" value={input.fname} onChange={handleChange} placeholder="Enter first name" />
                </div>
                <div className="form-group col-md-12 pb-3">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" className="form-control" name="lname" value={input.lname} onChange={handleChange} placeholder="Enter last name" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12 pb-3">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" name="email" value={input.email} onChange={handleChange} placeholder="Enter email" />
                </div>
                <div className="form-group col-md-12 pb-3">
                  <label htmlFor="address">Address</label>
                  <textarea className="form-control" name="address" rows="3" value={input.address} onChange={handleChange} placeholder="Enter address"></textarea>
                </div>
              </div>
              <div className="form-group col-md-12 pb-3">
                <label htmlFor="phone">Phone</label>
                <input type="text" className="form-control" name="phone" value={input.phone} onChange={handleChange} placeholder="Enter phone number" />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-success">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-4">
            <hr style={{ backgroundColor: "purple", height: "5px" }} />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-10 py-2" style={{ backgroundColor: "#874F99", color: "white" }}>
            <h3 className="">Manage Employee</h3>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-10">
            <table className="table">
              <thead style={{ backgroundColor: "#874F99", color: "white" }}>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {view.map((data, index) => (
                  <tr key={index + 1}>
                    <td>{data.fname}</td>
                    <td>{data.lname}</td>
                    <td>{data.email}</td>
                    <td>{data.address}</td>
                    <td>{data.phone}</td>
                    <td>
                      <button type="button" className="me-3" onClick={() => handleEdit(data.id)}>Edit</button>
                      <button type="button" onClick={() => handleDelete(data.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Employee;
