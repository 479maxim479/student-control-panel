export {	
	getFio, 
	getStudyPeriod, 
	getBirthDateData, 
	getAge, 
	getSortStudents, 
	createStudent, 
	filteredArray
};
	
	function getFio(obj) {
		let { lastName, firstName, middleName } = obj;
		return [lastName, firstName, middleName].filter((v) => v).join(' ');
	}
	
	function getStudyPeriod(obj) {
		let currentTime = new Date().getFullYear() - obj.yearOfStudy
		if(currentTime > 4) {
			return 'Закончил'
		}
		return `${currentTime} курс`
	}
	
	function getBirthDateData(obj) {
		let yyyy = obj.birthDate.getFullYear();
		let mm = obj.birthDate.getMonth() + 1;
		let dd = obj.birthDate.getDate();
	
		if(mm < 10) mm = '0' + mm;
		if(dd < 10) dd = '0' + dd;
	
		return `${dd}.${mm}.${yyyy}`
	}
	
	function getAge(obj) {
		let age = Math.floor((new Date() - new Date(obj.birthDate).getTime()) / 3.15576e10)
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

	function createStudent ( lastName, firstName, middleName, birthDate, yearOfStudy, department ) {
		return { lastName, firstName, middleName, birthDate: new Date(birthDate), yearOfStudy, department }
	}

