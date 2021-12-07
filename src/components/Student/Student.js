import React, { useRef, useState, useEffect, useMemo } from 'react';
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
  const studentGradesEl = useRef();
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [stateUpdated, setStateUpdated] = useState(false);
  
  const onTagsSubmit = e => {
    if (tag.length) {
      e.preventDefault();
      
      setTags(prevState => [...prevState, tag]);
      setStateUpdated(true);
      setTag('');
    }
  }
  useEffect(() => {
    if (stateUpdated) {
      appendTags(studentId, tags);
      setStateUpdated(false);
    };
  }, [stateUpdated, setStateUpdated, tags, appendTags, studentId]);

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
            <li key={index} className="student__grade">Test {index + 1} &mdash; <span>{grade}%</span></li>
          )}
        </ul>
        <ul className="student__tags">
          {studentTags.map((tag, index) => <li key={index} className="student__tag">{tag}</li>)}
        </ul>
        <div className="student__form">
          <form action="#" className="form" onSubmit={onTagsSubmit}>
            <Input 
              inputSize="input--small" 
              placeholder="Add a tag"
              name='tag'
              value={tag}
              setState={setTag}
            />
          </form>
      </div>
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
