import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Student from '../Student/Student';
import Input from '../Input/Input';
import './style.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    axios.get('https://api.hatchways.io/assessment/students')
      .then(({ data }) => {
        setStudents(() => 
          data.students.map(student => {
            return {
              ...student,
              tags: []
            };
          })
        );
      })
      .catch(err => console.error(err));
  }, []);

  const appendTag = (studentId, tag) => {
    setStudents(prevState => (
      prevState.map(student => {
        if (student.id === studentId) {
          return {
            ...student,
            tags: [...student.tags, tag]
          };
        }
        return student;
      })
    ));
  }
  
  return (
    <div className="students">
      <div className="input-box">
        <Input 
          inputSize='input--large'
          placeholder="Search by name"
          name='name'
          value={name}
          setState={setName}
        />
        <Input
          inputSize="input--large" 
          placeholder="Search by tag"
          name='tag'
          value={tag}
          setState={setTag}
        />
      </div>
        {students // first filter is for searching by name
        .filter(student => {
          const fullName = `${student.firstName} ${student.lastName}`;
          
          if (!name || fullName.toLowerCase().includes(name.toLowerCase())) {
            return student;
          }
          return false;
        }) // second filter is for seaching by tag
        .filter(student => {
          const tagMatch = student.tags.some(studentTag =>
            studentTag.toLowerCase().includes(tag.toLowerCase())
          );
          if (!tag || tagMatch) {
            return student;
          } 
          return false;
        })
        .map(student => 
          <Student 
            key={student.id} 
            student={student}
            appendTag={appendTag}
          />
        )}
    </div>
  );
}
export default StudentList;
