export {	
	getFio, 
	getStudyPeriod, 
	getBirthDateData, 
	getAge, 
	getSortStudents, 
	filteredArray,
	clearFiltrationForm,
	clearCreateForm
};
	
	function getFio(obj) {
		let { lastName, name, surname } = obj;
		return [lastName, name, surname].filter((v) => v).join(' ');
	}
	
	function getStudyPeriod(obj) {
		let currentTime = new Date().getFullYear() - obj.studyStart
		if(currentTime > 4) {
			return 'Закончил'
		}
		return `${currentTime} курс`
	}
	
	function getBirthDateData(obj) {
		let yyyy = new Date(obj.birthday).getFullYear();
		let mm = new Date(obj.birthday).getMonth() + 1;
		let dd = new Date(obj.birthday).getDate();
	
		if(mm < 10) mm = '0' + mm;
		if(dd < 10) dd = '0' + dd;
	
		return `${dd}.${mm}.${yyyy}`
	}
	
	function getAge(obj) {
		let age = Math.floor((new Date() - new Date(obj.birthday).getTime()) / 3.15576e10)
		let lastNumberAge = String(age).split('').at(-1)
		
		if(/[1]/.test(+lastNumberAge)) {
			return `${age} год`;
		}

		if(/[2,3,4]/.test(+lastNumberAge)) {
			return `${age} года`;
		}

		return `${age} лет`;
	}

	function getSortStudents(arr, field, dir) {
		let arrCopy = arr.slice(0);
		return arrCopy.sort((a, b) => {
			if((dir ? a[field] < b[field] : a[field] > b[field]))
			return -1
		})
	}

	function filteredArray(arr, property, value) {
		let result = []
		let copyArr = arr.slice(0)
	
		for(let item of copyArr) {
			if(String(item[property]).toLowerCase().includes(value.toLowerCase())) result.push(item)
		}
		
		return result;
	}

	function clearFiltrationForm() {
		document.querySelector('.btn-danger').addEventListener('click', function() {
			document.getElementById('filter-fio').value = '',
			document.getElementById('filter-department').value = '',
			document.getElementById('filter-study').value = '',
			document.getElementById('filter-finish-study').value = ''
		})
	}

	function clearCreateForm() {
		document.getElementById('reset-button').addEventListener('click', function() {
			document.getElementById('input-lastname').value = '',
				document.getElementById('input-firstName').value = '',
				document.getElementById('input-middleName').value = '',
				new Date(document.getElementById('input-birthday').value = ''),
				document.getElementById('input-study').value = '',
				document.getElementById('input-department').value = ''
		})
	}

