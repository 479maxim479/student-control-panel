import { 
	getFio,
	getStudyPeriod,
	getBirthDateData, 
	getAge, 
	getSortStudents, 
	createStudent,
	filteredArray 
} from "./helpers.js"

const studentsList = [
	{firstName: 'Максим', lastName: 'Заверткин', middleName: 'Николаевич', birthDate: new Date(1986, 2, 26), yearOfStudy: '2022', department: 'Программирование'},
	{firstName: 'Анна', lastName: 'Штыкова', middleName: 'Владимировна', birthDate: new Date(1987, 11, 1), yearOfStudy: '2020', department: 'Аналитика'},
	{firstName: 'Дмитрий', lastName: 'Николашкин', middleName: 'Григорьевич', birthDate: new Date(1985, 8, 23), yearOfStudy: '2018', department: 'Тестирование'},
	{firstName: 'Иван', lastName: 'Бровкин', middleName: 'Васильевич', birthDate: new Date(1997, 5, 6), yearOfStudy: '2021', department: 'Экономика'},
	{firstName: 'Светлана', lastName: 'Иванова', middleName: 'Алексеевна', birthDate: new Date(1983, 10, 4), yearOfStudy: '2016', department: 'Финансы'}
];

const $studentsList = document.getElementById('students-list');
const $studentsListTH = document.querySelectorAll('.table-bordered th');
let column = 'lastName';
let direction = true;

function newStudentTR(student, num) {
	const $studentTR = document.createElement('tr');
		const $numberTD = document.createElement('td');
		const $fioTD = document.createElement('td');
		const $birthDateTD = document.createElement('td');
		const $firstYearTD = document.createElement('td');
		const $departmentTD = document.createElement('td');

	$numberTD.textContent = num
	$fioTD.textContent = getFio(student)
	$birthDateTD.textContent = `${getBirthDateData(student)} (${getAge(student)})`
	$firstYearTD.textContent = `${student.yearOfStudy} (${getStudyPeriod(student)})`
	$departmentTD.textContent = student.department

	$studentTR.append($numberTD)
	$studentTR.append($fioTD)
	$studentTR.append($birthDateTD)
	$studentTR.append($firstYearTD)
	$studentTR.append($departmentTD)

	let arrow = document.getElementById('arrow')

	return $studentTR
}

function render() {
		
	let studentsListCopy = getSortStudents(studentsList, column, direction);
	$studentsList.innerHTML = ''

	const fioValue = document.getElementById('filter-fio').value,
				departmentValue = document.getElementById('filter-department').value,
				startStudy = document.getElementById('filter-study').value,
				finishStudy = document.getElementById('filter-finish-study').value

	let newArr = [...studentsListCopy].map(item => {
		const result = {
		...item,
		finishStudy: `${Number(item.yearOfStudy) + 4}`,
		fio: `${item.lastName} ${item.firstName} ${item.middleName}`
		};

		return result
	})

	if(fioValue !== '') newArr = filteredArray(newArr, 'fio', fioValue)
	if(departmentValue !== '') newArr = filteredArray(newArr, 'department', departmentValue)
	if(startStudy !== '') newArr = filteredArray(newArr, 'yearOfStudy', startStudy)
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

document.getElementById('filter-form').addEventListener('submit',function(e) {
	e.preventDefault();
	render()
})

document.querySelector('.btn-danger').addEventListener('click', function() {
	document.getElementById('filter-fio').value = '',
	document.getElementById('filter-department').value = '',
	document.getElementById('filter-study').value = '',
	document.getElementById('filter-finish-study').value = ''
})

document.getElementById('reset-button').addEventListener('click', function() {
	document.getElementById('input-lastname').value = '',
		document.getElementById('input-firstName').value = '',
		document.getElementById('input-middleName').value = '',
		new Date(document.getElementById('input-birthDate').value = ''),
		document.getElementById('input-study').value = '',
		document.getElementById('input-department').value = ''

		render()
})

const studentForm = document.getElementById('students-form')
const inputLastname = document.getElementById('input-lastname')
const inputFirsttname = document.getElementById('input-firstName')
const inputMiddlename = document.getElementById('input-middleName')
const inputStudy = document.getElementById('input-study')
const inputDepartment = document.getElementById('input-department')

studentForm.addEventListener('submit', function(e) {
	e.preventDefault();
	studentsList.push(createStudent(
		inputLastname.value.trim(),
		inputFirsttname.value,
		inputMiddlename.value,
		new Date(document.getElementById('input-birthDate').value),
		inputStudy.value,
		inputDepartment.value,
	))
	render()
})

render()







