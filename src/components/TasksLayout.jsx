import React, { useState, useEffect } from "react";
import AddTaskModal from "./AddTaskModal.jsx";
import { Button, Table, Card, Form } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "../css/TaskLayout.css"; // Ensure to create and import your CSS file here
import CountdownTimer from "../common/CountdownTimer.jsx";
import { useParams } from "react-router-dom";

function TasksLayout() {
  let { name } = useParams();

  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterStatus, setFilterStatus] = useState("all");
  const tasksPerPage = 10;

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setCurrentPage(0);
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    const totalPages = Math.ceil((tasks.length - 1) / tasksPerPage);
    if (currentPage >= totalPages) {
      setCurrentPage(totalPages - 1);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "completed") return task.completed;
    if (filterStatus === "not-completed") return !task.completed;
    return true;
  });

  const pageCount = Math.ceil(filteredTasks.length / tasksPerPage);
  const offset = currentPage * tasksPerPage;
  const currentTasks = filteredTasks.slice(offset, offset + tasksPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="tasks-layout">
      <h1 className="text-center">Welcome {name}!</h1>

      <div className="d-flex justify-content-end mb-3">
        <Form.Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-dropdown"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not-completed">Not Completed</option>
        </Form.Select>
        <Button
          variant="custom"
          onClick={() => setIsModalOpen(true)}
          className="btn-custom"
        >
          Add New Task
        </Button>
      </div>

      <Card className="task-card">
        <Card.Body>
          <Table striped bordered hover className="task-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Title</th>
                <th>Created On</th>
                <th>Deadline</th>
                <th>Time Left</th>
                <th>Completed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.length > 0 ? (
                currentTasks.map((task, index) => (
                  <tr key={task.id}>
                    <td>{index + 1 + offset}</td>
                    <td>{task.title}</td>
                    <td>{task.createdOn.toLocaleDateString()}</td>
                    <td>{task.deadline.toLocaleDateString()}</td>
                    <td>
                      <CountdownTimer deadline={task.deadline} />
                    </td>
                    <td>{task.completed ? "Yes" : "No"}</td>
                    <td>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() =>
                          updateTask({ ...task, completed: !task.completed })
                        }
                      >
                        {task.completed ? "Undo" : "Complete"}
                      </Button>{" "}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No tasks available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {filteredTasks.length > tasksPerPage && (
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center mt-3"}
          activeClassName={"active"}
          previousClassName={currentPage === 0 ? "disabled" : ""}
          nextClassName={currentPage === pageCount - 1 ? "disabled" : ""}
        />
      )}

      <AddTaskModal
        show={isModalOpen}
        addTask={addTask}
        closeModal={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default TasksLayout;
