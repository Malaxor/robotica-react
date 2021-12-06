const averageGrade = grades => {
  let total = 0;

  for(let grade of grades) {
    total += parseInt(grade);
  }
  return Math.round(total / grades.length * 100) / 100;
}
export default averageGrade;
