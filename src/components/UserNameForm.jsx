import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../css/UserNameForm.css"; // Import the custom CSS file
import { regex } from "../common/helpers";
import { useNavigate } from "react-router-dom";

function UserNameForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    let userNameError = "";
    if (!name.trim()) {
      userNameError = "Name is required field";
    } else if (name.length < 2) {
      return "Name is too short";
    } else if (!regex.test(name)) {
      return "Name can only contain letters and spaces";
    }

    if (userNameError) {
      setError(userNameError);
    } else {
      setError("");
      navigate(`/task-management/${name}`);
    }
  };

  return (
    <div className="username-form-container">
      <Form onSubmit={handleSubmit} className="username-form">
        <Form.Group controlId="formUserName">
          <Form.Label>Enter Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`form-input ${error ? "is-invalid" : ""}`}
          />
          {error && <span className="text-danger">{error}</span>}
        </Form.Group>
        <Button variant="custom" type="submit" className="btn-submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UserNameForm;
