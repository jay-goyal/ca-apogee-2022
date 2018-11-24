var baseUrl = 'http://test.bits-apogee.org/2019/collegeambassador';

var getCollegeUrl = baseUrl + '/college';





function populateCollegeField() {
    fetch(getCollegeUrl)
    .then(res => res.json())
    .then(data => {
        data = data.data;
        data.forEach(element => {
            var name = element.name;
            var option = document.createElement('option');
            option.value = name;
            option.innerHTML = name;
            document.getElementById('college-select').append(option);
        });
    })
    .catch(console.log);
}

populateCollegeField();