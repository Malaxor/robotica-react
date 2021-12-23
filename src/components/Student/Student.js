import React, { useState, useRef, useMemo } from 'react';
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
  const studentGradesEl = useRef();
  
  const onTagSubmit = e => {
    if (tag) {
      e.preventDefault();
      appendTag(studentId, tag);
      setTag('');
    }
  }
  const avgGrade = useMemo(() => averageGrade(grades), [grades]);

  return (
    <div className="student">
      <img src={pic} alt={fullName} className="student__img" />
      <div className="student__information">
        <h3 className="student__name">{fullName}</h3>
        <ul className="student__details">
          <li className="student__detail">Email: {email}</li>
          <li className="student__detail">Compay: {company}</li>
          <li className="student__detail">Skill: {skill}</li>
          <li className="student__detail">Average: {avgGrade}%</li>
        </ul>
        <ul ref={studentGradesEl} className="student__grades">
          {grades.map((grade, index) => 
            <li key={index} className="student__grade">Test {index + 1} &mdash; {grade}%</li>
          )}
        </ul>
        <div className="student__tags">
          {studentTags.length > 0 && 
            studentTags.map((tag, index) => <span key={index} className="student__tag">{tag}</span>)}
        </div>
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
          onClick={() => studentGradesEl.current.classList.toggle('open')}
        >
          <div className="horizontal"></div>
          <div className="vertical"></div>
        </button>
      </div>
    </div>
  );
}

export default Student;
