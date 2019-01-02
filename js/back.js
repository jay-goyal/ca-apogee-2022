var baseUrl = 'https://bits-apogee.org/2019/collegeambassador';

var getCollegeUrl = baseUrl + '/college';
var registerUrl = baseUrl + '/register'



function populateCollegeField() {
    fetch(getCollegeUrl)
    .then(res => res.json())
    .then(data => {
        data = data.data;
        data.forEach(element => {
            var name = element.name;
            var id = element.id;
            var option = document.createElement('option');
            option.value = id;
            option.innerHTML = name;
            document.getElementById('regform-collegeselect').append(option);
        });
    })
    .catch(console.log);
}

function onSubmitRegister(){
    var first = document.getElementById('regform-first').value;
    // var last = document.getElementById('regform-last').value;
    var email = document.getElementById('regform-email').value;
    // var address = document.getElementById('regform-address').value;
    var college = document.getElementById('regform-collegeselect').value;
    //var collegeStrength = document.getElementById('regform-collegestrength').value;
    var city = document.getElementById('regform-city').value;
    var yearOfStudy = document.getElementById('regform-yearofstudy').value;
    //var fieldOfStudy = document.getElementById('regform-fieldofstudy').value;
    var mobile = document.getElementById('regform-mobile').value;
    //var goodCand = document.getElementById('regform-goodcand').value;
    //var pastExp = document.getElementById('regform-pastexp').value;
    //var hasMailingList = document.getElementById('regform-boolmailinglist').value === "Yes" ? true : false;

    var requestObject = {
        email: email,
        name: first,
        // last: last,
        // address: address,
        //strength: collegeStrength,
        year: yearOfStudy,
        //degree: fieldOfStudy,
        mobile: mobile,
        //what: goodCand,
        //experience: pastExp,
        //list: hasMailingList,
        city: city,
        college: college,
    };
    console.log(requestObject);
    console.log(JSON.stringify(requestObject));

    fetch(registerUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify(requestObject)
    }).then(res => res.json())
    .then(data => {
        console.log(data);
        const {message} = data;
        if(message){
            document.getElementById('msg').innerHTML = message;
        }
        else{
            document.getElementById('msg').innerHTML = "Unknown error occured, contact administrator";
        }
    })
    .catch(console.log);
}

populateCollegeField();

document.getElementsByClassName('regform-submit')[0].addEventListener('click', (e) => {
    e.preventDefault();
    onSubmitRegister();
});