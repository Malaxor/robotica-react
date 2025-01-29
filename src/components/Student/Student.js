import React, { useState, useMemo } from 'react';
import Input from '../Input/Input';
import averageGrade from '../../utils/averageGrade';
import './style.css';

const Student = ({ 
  appendTag,
  student: {
    id: studentId,
    firstName,
    lastName,
    pic,
    email,
    company,
    skill, 
    grades,
    tags: studentTags
  }}) => {
  const fullName = `${firstName} ${lastName}`;
  const [tag, setTag] = useState('');
  const [showStudentGrades, setShowStudentGrades] = useState(false)
  
  const onTagSubmit = e => {
    if (tag) {
      e.preventDefault();
      appendTag(studentId, tag);
      setTag('');
    }
  }
  const avgGrade = useMemo(() => averageGrade(grades), [grades]);

  return (
    <figure className="student">
      <img src={pic} alt={fullName} className="student__img" />
      <section className="student__information">
        <h2 className="student__name">{fullName}</h2>
        <ul className="student__details">
          <li className="student__detail">Email: {email}</li>
          <li className="student__detail">Compay: {company}</li>
          <li className="student__detail">Skill: {skill}</li>
          <li className="student__detail">Average: {avgGrade}%</li>
        </ul>
        {showStudentGrades && 
          <ol className="student__grades">
            {grades.map((grade, index) => 
              <li key={index} className="student__grade">Test {index + 1} &mdash; {grade}%</li>
            )}
          </ol>
        }
        <ul className="student__tags">
          {studentTags.length > 0 && 
            studentTags.map((tag, index) => <li key={index} className="student__tag">{tag}</li>)}
        </ul>
        <form action="#" className="student__form" onSubmit={onTagSubmit}>
          <Input 
            inputSize="input--small" 
            placeholder="Add a tag"
            name='tag'
            value={tag}
            setState={setTag}
          />
        </form>
        <button 
          className="btn"
          onClick={() => setShowStudentGrades(!showStudentGrades)}
        >
          <div className="horizontal"></div>
          {!showStudentGrades && <div className="vertical"></div>}
        </button>
      </section>
    </figure>
  );
}

export default Student;
