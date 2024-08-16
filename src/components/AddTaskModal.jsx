import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AddTaskModal({ addTask, closeModal, show }) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState(getTodayDate());
  const [errors, setErrors] = useState({ title: "", deadline: "" });
  function getTodayDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  const handleSubmit = () => {
    let titleError = "";
    let deadlineError = "";

    if (!title.trim()) {
      titleError = "Task title is required.";
    }
    if (!deadline) {
      deadlineError = "Deadline is required.";
    }

    if (titleError || deadlineError) {
      setErrors({ title: titleError, deadline: deadlineError });
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      createdOn: new Date(),
      deadline: new Date(deadline),
    };

    addTask(newTask);
    setTitle("");
    setDeadline("");
    setErrors({ title: "", deadline: "" });
    closeModal();
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <Modal show={show} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTaskTitle">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              isInvalid={!!errors.title}
            />
            {errors.title && (
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="formTaskDeadline" className="mt-3">
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="date"
              value={deadline}
              min={today}
              onChange={(e) => setDeadline(e.target.value)}
              isInvalid={!!errors.deadline}
            />
            {errors.deadline && (
              <Form.Control.Feedback type="invalid">
                {errors.deadline}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="custom" onClick={handleSubmit}>
          Add Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddTaskModal;
