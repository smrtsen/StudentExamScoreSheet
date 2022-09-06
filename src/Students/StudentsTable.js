import React from 'react';
import './StudentsTable.css';

const StudentsTable = ({student, handleDeleteClick }) => {
    return (
        <tr>
            <td>{student.studentName}</td>
            <td>{student.score}</td>
            <td>{student.class}</td>
            <td>
                <button type="button" onClick={() => handleDeleteClick(student.id)}>Delete</button>
            </td>
          </tr>
    );
};

export default StudentsTable;