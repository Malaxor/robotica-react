import React, { useState, useEffect, useMemo, Fragment } from 'react';
import Input from '../Input/Input';
import averageGrade from '../../utils/averageGrade';
import './style.css';

const Student = ({ 
  appendTags,
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
  const [tags, setTags] = useState([]);
  const [displayGrades, setDisplayGrades] = useState(false);
  
  const onTagsSubmit = e => {
    if (tag.length) {
      e.preventDefault();
      setTags(prevState => [...prevState, tag]);
      setTag('');
    }
  }
  
  useEffect(() => {
    appendTags(studentId, tags);
  }, [tags, studentId, appendTags]);

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
        {displayGrades && <>
          <ul className="student__grades">
            {grades.map((grade, index) => 
              <li key={index} className="student__grade">Test {index + 1} &mdash; <span>{grade}%</span></li>
            )}
          </ul>
        </>}
        <ul className="student__tags">
          {studentTags.map((tag, index) => <li key={index} className="student__tag">{tag}</li>)}
        </ul>
        <form action="#" className="student__form" onSubmit={onTagsSubmit}>
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
          onClick={() => setDisplayGrades(!displayGrades)}
        >
          <div className="horizontal"></div>
          {!displayGrades && <>
              <div className="vertical"></div>
            </>}
        </button>
      </div>
    </div>
  );
}

export default Student;
