import { 
	getFio,
	getStudyPeriod,
	getBirthDateData, 
	getAge, 
	getSortStudents, 
	filteredArray,
	clearFiltrationForm,
	clearCreateForm
} from "./helpers.js"

const $studentsList = document.getElementById('students-list');
const $studentsListTH = document.querySelectorAll('.table-bordered th');
let column = 'lastname';
let direction = true;

function newStudentTR(student, num) {
	const $studentTR = document.createElement('tr');
		const $numberTD = document.createElement('td');
		const $fioTD = document.createElement('td');
		const $birthDateTD = document.createElement('td');
		const $firstYearTD = document.createElement('td');
		const $departmentTD = document.createElement('td');
		const $deleteTD = document.createElement('td')
		$deleteTD.innerHTML = '<button class="btn btn-danger">Удалить</button>'
		



	$numberTD.textContent = num
	$fioTD.textContent = getFio(student)
	$birthDateTD.textContent = `${getBirthDateData(student)} (${getAge(student)})`
	$firstYearTD.textContent = `${student.studyStart} (${getStudyPeriod(student)})`
	$departmentTD.textContent = student.faculty

	$studentTR.append($numberTD)
	$studentTR.append($fioTD)
	$studentTR.append($birthDateTD)
	$studentTR.append($firstYearTD)
	$studentTR.append($departmentTD)
	$studentTR.append($deleteTD)

	$deleteTD.addEventListener('click', function() {
		// if(!confirm('Вы уверены?')) {
		// 	return
		// }
		fetch(`http://localhost:3000/api/students/${student.id}`,{
			method: "DELETE",
		})
		$studentTR.remove()
		render()
	})

	return $studentTR
}

async function render() {
	const response = await fetch('http://localhost:3000/api/students')
	const studentsList = await response.json()

	console.log(studentsList)
	
	let studentsListCopy = getSortStudents(studentsList, column, direction);
	$studentsList.innerHTML = ''

	const fioValue = document.getElementById('filter-fio').value,
				departmentValue = document.getElementById('filter-department').value,
				startStudy = document.getElementById('filter-study').value,
				finishStudy = document.getElementById('filter-finish-study').value

	let newArr = [...studentsListCopy].map(item => {
		const result = {
		...item,
		finishStudy: `${Number(item.studyStart) + 4}`,
		fio: `${item.surname} ${item.name} ${item.lastname}`
		};

		return result
	})

	if(fioValue !== '') newArr = filteredArray(newArr, 'fio', fioValue)
	if(departmentValue !== '') newArr = filteredArray(newArr, 'faculty', departmentValue)
	if(startStudy !== '') newArr = filteredArray(newArr, 'studyStart', startStudy)
	if(finishStudy !== '') newArr = filteredArray(newArr, 'finishStudy',finishStudy)

	newArr.forEach((student, i) => {
			`${$studentsList.append(newStudentTR(student, i + 1))}` 
	})
}

$studentsListTH.forEach(item => {
	item.addEventListener('click', function() {
		column = this.dataset.column;
		direction = !direction;
		render();
	})
});


//Очистка форм
document.getElementById('filter-form').addEventListener('submit',function(e) {
	e.preventDefault();
	render()
})

//Очистка формы фильтрации
clearFiltrationForm()

//Очистка формы заполнения
clearCreateForm()

const studentForm = document.getElementById('students-form')
const inputLastname = document.getElementById('input-lastname')
const inputFirsttname = document.getElementById('input-firstName')
const inputMiddlename = document.getElementById('input-middleName')
const inputStudy = document.getElementById('input-study')
const inputDepartment = document.getElementById('input-department')

studentForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const response = await fetch('http://localhost:3000/api/students', {
		method: "POST",
		headers: {'Content-type': 'application/json'},
		body: JSON.stringify({
			name: inputFirsttname.value,
			surname: inputLastname.value.trim(),
			lastname: inputMiddlename.value,
			birthday: new Date(document.getElementById('input-birthDate').value),
			studyStart: inputStudy.value,
			faculty: inputDepartment.value,
		})
	})

	inputFirsttname.value=''
	inputLastname.value=''
	inputMiddlename.value=''
	new Date(document.getElementById('input-birthDate').value='')
	inputStudy.value=''
	inputDepartment.value=''
	
	const student = await response.json();
	render()
	
})

render()