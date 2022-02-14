var baseUrl = "https://bits-apogee.org/collegeambassador";
var baseUrl1 = "https://www.bits-apogee.org/collegeambassador";

var getCollegeUrl = baseUrl + "/college";
var getCollegeUrl1 = baseUrl1 + "/college";
var registerUrl = baseUrl + "/register";
var registerUrl1 = baseUrl1 + "/register";

function populateCollegeField() {
  fetch(getCollegeUrl)
    .then((res) => res.json())
    .then((data) => {
      data = data.data;
      data.forEach((element) => {
        var name = element.name;
        var id = element.id;
        var option = document.createElement("option");
        option.value = id;
        option.innerHTML = name;
        document.getElementById("regform-collegeselect").append(option);
      });
      document.getElementById("loading-colleges").style.display = "none";
      document.getElementById("regform-collegeselect").disabled = false;
    })
    .catch((err) => {
      console.log(err);
      fetch(getCollegeUrl1)
        .then((res) => res.json())
        .then((data) => {
          data = data.data;
          data.forEach((element) => {
            var name = element.name;
            var id = element.id;
            var option = document.createElement("option");
            option.value = id;
            option.innerHTML = name;
            document.getElementById("regform-collegeselect").append(option);
          });
          document.getElementById("loading-colleges").style.display = "none";
          document.getElementById("regform-collegeselect").disabled = false;
        })
        .catch((err) => {
          console.log(err);
          document.getElementById("loading-colleges").innerHTML =
            "Error occurred while loading colleges!";
        });
    });
}

function onSubmitRegister() {
  var first = document.getElementById("regform-first").value;
  // var last = document.getElementById('regform-last').value;
  var email = document.getElementById("regform-email").value;
  // var address = document.getElementById('regform-address').value;
  var college = document.getElementById("regform-collegeselect").value;
  //var collegeStrength = document.getElementById('regform-collegestrength').value;
  var city = document.getElementById("regform-city").value;
  var yearOfStudy = document.getElementById("regform-yearofstudy").value;
  //var fieldOfStudy = document.getElementById('regform-fieldofstudy').value;
  var mobile = document.getElementById("regform-mobile").value;
  var source = document.getElementById("regform-sourceselect").value;
  if (source==="others") {
    source=document.getElementById("regform-other-source").value;
  }

  //var goodCand = document.getElementById('regform-goodcand').value;
  //var pastExp = document.getElementById('regform-pastexp').value;
  //var hasMailingList = document.getElementById('regform-boolmailinglist').value === "Yes" ? true : false;

  document.getElementById("submit").disabled = true;
  document.getElementById("msg").innerHTML = "Registering. Please wait...";

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
    info_source:source
  };

  fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(requestObject),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("submit").disabled = false;

      const { message } = data;
      if (message) {
        document.getElementById("msg").innerHTML = message;
      } else {
        document.getElementById("msg").innerHTML =
          "Unknown error occured, contact administrator";
      }
    })
    .catch((err) => {
      console.log(err);
      fetch(registerUrl1, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify(requestObject),
      })
        .then((res) => res.json())
        .then((data) => {
          document.getElementById("submit").disabled = false;
          const { message } = data;
          if (message) {
            document.getElementById("msg").innerHTML = message;
          } else {
            document.getElementById("msg").innerHTML =
              "Unknown error occured, contact administrator";
          }
        })
        .catch((err) => {
          console.log(err);
          document.getElementById("submit").disabled = false;
          document.getElementById("msg").innerHTML =
            "Unknown error occured, contact administrator";
        });
    });
}

populateCollegeField();

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  onSubmitRegister();
});
