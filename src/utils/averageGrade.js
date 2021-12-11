const averageGrade = grades => {
  const total = grades.reduce((total, grade) => total + parseInt(grade) ,0);
  return Math.round(total / grades.length * 100) / 100;
}
export default averageGrade;
