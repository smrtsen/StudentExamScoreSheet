import React, { useState } from "react";
import { nanoid } from "nanoid";
import "./Students.css";
import data from "../mock-data.json";
import StudentsTable from "./StudentsTable";

const Students = () => {
  const [students, setStudents] = useState(data);
  const [filteredStudents, setFilteredStudents] = useState(data);
  const [filterScoreForm, setFilterScoreForm] = useState("");
  const [filterScoreTo, setFilterScoreTo] = useState("");
  const [filterClass, setFilterClass] = useState([]);
  const [addFormData, setAddFormData] = useState({
    studentName: "",
    score: "",
    class: "",
  });

  const HandleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newStudent = {
      id: nanoid(),
      studentName: addFormData.studentName,
      score: addFormData.score,
      class: addFormData.class,
    };

    const newStudents = [...students, newStudent];
    setStudents(newStudents);
  };

  const handleDeleteClick = (studentId) => {
    const newStudents = [...students];

    const index = students.findIndex((student) => student.id === studentId);

    newStudents.splice(index, 1);

    setStudents(newStudents);
  };

  const scoreFIlterInputChange = (event) => {
    console.log(event.target.value);
    if (event.target.name === "from") setFilterScoreForm(event.target.value);
    else setFilterScoreTo(event.target.value);
  };

  const classFIlterInputChange = (event) => {
    let tempFilterClass = filterClass;
    if (tempFilterClass.indexOf(event.target.value) > -1) {
      const index = tempFilterClass.indexOf(event.target.value);
      if (index > -1) {
        tempFilterClass.splice(index, 1);
      }
    } else {
      tempFilterClass.push(event.target.value);
    }
    setFilterClass(tempFilterClass);
  };

  const applyFilter = () => {
    let filteredValue = students;
    if (filterScoreForm && filterScoreTo) {
      filteredValue = students.filter(
        (data) =>
          parseInt(data.score) >= filterScoreForm &&
          parseInt(data.score) <= filterScoreTo &&
          filterClass.indexOf(data.class) > -1
      );
    } else if (filterScoreForm) {
      filteredValue = students.filter(
        (data) =>
          parseInt(data.score) >= filterScoreForm &&
          filterClass.indexOf(data.class) > -1
      );
    } else if (filterScoreTo) {
      filteredValue = students.filter(
        (data) =>
          parseInt(data.score) <= filterScoreTo &&
          filterClass.indexOf(data.class) > -1
      );
    } else if (!filterScoreForm && !filterScoreTo) {
      filteredValue = students.filter(
        (data) => filterClass.indexOf(data.class) > -1
      );
    }

    setFilteredStudents(filteredValue);
  };

  const resetFilter = () => {
    setFilteredStudents(students);
  };

  return (
    <div>
      <h2>ADD A STUDENT RECORD</h2>
      <form>
        <input
          type="text"
          name="studentName"
          required="required"
          placeholder="Enter Student Name"
          onChange={HandleAddFormChange}
        />
        <input
          type="number"
          name="score"
          required="required"
          placeholder="Enter Score"
          onChange={HandleAddFormChange}
        />
        <input
          type="radio"
          name="class"
          value="A"
          onChange={HandleAddFormChange}
        />
        <label for="rd1">A</label>
        <br />
        <input
          type="radio"
          name="class"
          value="B"
          onChange={HandleAddFormChange}
        />
        <label for="rd2">B</label>
        <br />
        <input
          type="radio"
          name="class"
          value="C"
          onChange={HandleAddFormChange}
        />
        <label for="rd3">C</label>
        <br />

        <button type="Submit" onClick={handleAddFormSubmit}>
          Create A Record
        </button>
      </form>

      <h2>Filter By</h2>
      <div>
        <div>
          <b>Score</b> From{" "}
          <input
            name="from"
            value={filterScoreForm}
            onChange={scoreFIlterInputChange}
          />{" "}
          To{" "}
          <input
            name="to"
            value={filterScoreTo}
            onChange={scoreFIlterInputChange}
          />
        </div>
        <div>
          <b>Class</b>
          <span className="checkboxContainer">
            A
            <input
              value="A"
              type={"checkbox"}
              onChange={classFIlterInputChange}
            />
          </span>
          <span className="checkboxContainer">
            {" "}
            B
            <input
              value="B"
              type={"checkbox"}
              onChange={classFIlterInputChange}
            />
          </span>
          <span className="checkboxContainer">
            C
            <input
              value="C"
              type={"checkbox"}
              onChange={classFIlterInputChange}
            />
          </span>
        </div>
        <button onClick={applyFilter}>Apply Filter</button>
        <button onClick={resetFilter}>Reset Filter</button>
      </div>
      <table className="studentTable">
        <tr>
          <th>Student Name</th>
          <th>Score</th>
          <th>Class</th>
          <th>Action</th>
        </tr>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <StudentsTable
                student={student}
                handleDeleteClick={handleDeleteClick}
              />
            ))
          ) : (
            <div>No Data Found</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
