var gen_value = "";
var edu;
var profile;
var age;
var state;
var district;

const form = document.querySelector('.needs-validation');

const nameInput = document.getElementById('name');
const NameFeedback = document.getElementById('nameFeedback');

nameInput.addEventListener('input', () => {
  if (nameInput.value.length >= 1) {
    nameInput.setCustomValidity('');
    nameInput.classList.add('is-valid');
    nameInput.classList.remove('is-invalid');
  } else {
    nameInput.setCustomValidity('Name must have atleast a single character');
    NameFeedback.textContent = "Name must have atleast a single character";
    nameInput.classList.add('is-invalid');
    nameInput.classList.remove('is-valid');
  }
});

const emailInput = document.getElementById('email');
const emailFeedback = document.getElementById('emailFeedback');

emailInput.addEventListener('input', () => {
  const emailValue = emailInput.value.trim();
  const patt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!patt.test(emailValue)) {
    emailInput.setCustomValidity('Please enter a valid email address.');
    emailInput.classList.add('is-invalid');
    emailInput.classList.remove('is-valid');
  } else {
    emailInput.setCustomValidity(''); 
    emailInput.classList.add('is-valid');
    emailInput.classList.remove('is-invalid');
  }
});

const contactInput = document.getElementById("contactno");
const contactFeedback = document.getElementById('mobileFeedback');

contactInput.addEventListener('input',()=> {
  const phoneValue = contactInput.value.trim(); 
  const patt = /^[6-9]\d{9}$/;

  if (!patt.test(phoneValue)) {
    contactInput.setCustomValidity('Phone number must start with {6,7,8,9} and contains 10digits');
    contactFeedback.textContent = "Phone number must start with {6,7,8,9} and contains 10digits";
    contactInput.classList.add('is-invalid');
    contactInput.classList.remove('is-valid');
  }else {
    contactInput.setCustomValidity(''); 
    contactInput.classList.add('is-valid');
    contactInput.classList.remove('is-invalid');
  }
});

const dobInput = document.getElementById("dob");
  const dobFeedback = document.getElementById("dobFeedback");

  dobInput.addEventListener("input", () => {
    const dobValue = dobInput.value;
    const dobDate = new Date(dobValue);
    const year = dobDate.getFullYear();
    const today = new Date();
    const ageDiff = today - dobDate.getTime();
    const ageDate = new Date(ageDiff);
    age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (!dobValue) {
      dobInput.setCustomValidity("Date of Birth cannot be empty.");
      dobFeedback.textContent = "Date of Birth cannot be empty.";
      dobInput.classList.add("is-invalid");
      dobInput.classList.remove("is-valid");
    } else if (year < 1950 || year > 2010) {
      dobInput.setCustomValidity("Date of Birth must be between 1950 and 2010.");
      dobFeedback.textContent = "Date of Birth must be between 1950 and 2010.";
      dobInput.classList.add("is-invalid");
      dobInput.classList.remove("is-valid");
    } else {
      dobInput.setCustomValidity("");
      dobFeedback.textContent = "";
      dobInput.classList.add("is-valid");
      dobInput.classList.remove("is-invalid");
    }
  });


  const panInput = document.getElementById("pan");
  const panFeedback = document.getElementById("panFeedback")

  panInput.addEventListener('input',() => {
    const panValue = panInput.value; 
    const patt = /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/;
    if (panValue === "") {
      panInput.setCustomValidity("PAN field cannot be empty.");
      panFeedback.textContent = "PAN field cannot be empty.";
      panInput.classList.add("is-invalid");
      panInput.classList.remove("is-valid");
    }
    if (!patt.test(panValue)) {
      panInput.setCustomValidity("Invalid PAN number.");
      panFeedback.textContent = "Invalid PAN number.";
      panInput.classList.add("is-invalid");
      panInput.classList.remove("is-valid");
    }
    else {
      panInput.setCustomValidity("");
      panFeedback.textContent = "";
      panInput.classList.add("is-valid");
      panInput.classList.remove("is-invalid");
    }

  });


  const usernameInput = document.getElementById("username");
  const usernameFeedback = document.getElementById("usernameFeedback");

  usernameInput.addEventListener('input',() => {
    const usernameValue = usernameInput.value; 
    const patt = /^(?=.*\d)[A-Za-z\d]{6,25}$/;
    if (!patt.test(usernameValue)) {
      usernameInput.setCustomValidity("Invalid username");
      usernameFeedback.textContent = "Invalid username";
      usernameInput.classList.add("is-invalid");
      usernameInput.classList.remove("is-valid");
    }
    else {
      usernameInput.setCustomValidity("");
      usernameFeedback.textContent = "";
      usernameInput.classList.add("is-valid");
      usernameInput.classList.remove("is-invalid");
    }
  });
  

  const passInput = document.getElementById("password");
  const passFeedback = document.getElementById("passFeedback");

  passInput.addEventListener('input', () =>  {
    const passwordValue = passInput.value; 
    const weakPattern = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z]).{8,15}$/; 
    const strongPattern = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,15}$/;

    if(passwordValue.length<8){
      passInput.setCustomValidity("Password must have atleast 8 characters");
      passFeedback.textContent = "Password must have atleast 8 characters";
      passInput.classList.add("is-invalid");
      passInput.classList.remove("is-valid");
    }
  
    else if (!weakPattern.test(passwordValue)) {
      passInput.setCustomValidity("Should include at least an uppercase letter, a lowercase letter and a number");
      passFeedback.textContent = "Should include at least an uppercase letter, a lowercase letter and a number";
      passInput.classList.add("is-invalid");
      passInput.classList.remove("is-valid");
    }
  
    else if (!strongPattern.test(passwordValue)) {
      passInput.setCustomValidity("Not a strong Password. Consider using an uppercase letter, a lowercase letter, a number, and a special character.");
      passFeedback.textContent = "Not a strong Password. Consider using an uppercase letter, a lowercase letter, a number, and a special character.";
      passInput.classList.add("is-invalid");
      passInput.classList.remove("is-valid");
    }
    else {
      passInput.setCustomValidity("");
      passFeedback.textContent = "";
      passInput.classList.add("is-valid");
      passInput.classList.remove("is-invalid");
    } 
  });


const confirmPassInput = document.getElementById("confirmPass");
const confirmPassFeedback = document.getElementById("confirmPassFeedback");

  confirmPassInput.addEventListener('input',() => {
    const confirmPasswordValue = confirmPassInput.value.trim(); 
    const passwordValue = passInput.value.trim(); 
    if (confirmPasswordValue !== passwordValue) {
      confirmPassInput.setCustomValidity("Confirm Password should match the Password field.");
      confirmPassFeedback.textContent = "Confirm Password should match the Password field.";
      confirmPassInput.classList.add("is-invalid");
      confirmPassInput.classList.remove("is-valid");
    }

    else{
      confirmPassInput.setCustomValidity("");
      confirmPassFeedback.textContent = "";
      confirmPassInput.classList.add("is-valid");
      confirmPassInput.classList.remove("is-invalid");
    }
  
  });

  


const pinCodeInput = document.getElementById("pinCode");
  const pinCodeFeedback = document.getElementById("pinCodeFeedback")


  pinCodeInput.addEventListener("input", () => {
    const pinCodeValue = pinCodeInput.value;
    const patt = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
  
    if (!patt.test(pinCodeValue)) {
      pinCodeInput.setCustomValidity("PinCode must only contain numbers and should not start with 0.");
      pinCodeFeedback.textContent = "PinCode must only contain numbers and should not start with 0.";
      pinCodeInput.classList.add("is-invalid");
      pinCodeInput.classList.remove("is-valid");
    } else {
      pinCodeInput.setCustomValidity("");
      pinCodeFeedback.textContent = "";
      pinCodeInput.classList.add("is-valid");
      pinCodeInput.classList.remove("is-invalid");
    }
  });

  const genderInput = document.getElementById("gender");
  const genderFeedback = document.getElementById("genderFeedback");


  genderInput.addEventListener("input", () =>{
  const gender = document.querySelector('input[name="gender"]:checked'); 
  if (gender) {
    gen_value = gender.value; 
    genderFeedback.textContent = "";
    genderInput.classList.add("is-valid");
    genderInput.classList.remove("is-invalid");
  }

  else {
    genderInput.setCustomValidity("Please choose a gender.");
      genderFeedback.textContent = "Please choose a gender.";
      genderInput.classList.add("is-invalid");
      genderInput.classList.remove("is-valid");
  }
});

const stateInput = document.getElementById("state");
const stateFeedback = document.getElementById("stateFeedback");

stateInput.addEventListener('input', () => {
  // Access the selected index and text directly from stateInput
  const selectedIndex = stateInput.selectedIndex;
  state = stateInput.options[selectedIndex].text;

  if (selectedIndex === 0) { // Check if the first option is selected
    stateInput.setCustomValidity("State can't be empty");
    stateFeedback.textContent = "State can't be empty";
    stateInput.classList.add("is-invalid");
    stateInput.classList.remove("is-valid");
  } else {
    stateInput.setCustomValidity("");
    stateFeedback.textContent = "";
    stateInput.classList.add("is-valid");
    stateInput.classList.remove("is-invalid");
  }
});


const districtInput = document.getElementById("district");
const districtFeedback = document.getElementById("districtFeedback");

districtInput.addEventListener('input',()=>{
  const selectedIndex = districtInput.selectedIndex;
  district = districtInput.options[selectedIndex].text;
  if ( document.getElementById('district').selectedIndex == 0 ) {
    districtInput.setCustomValidity("District can't be empty");
      districtFeedback.textContent = "District can't be empty";
      districtInput.classList.add("is-invalid");
      districtInput.classList.remove("is-valid");
  }
  else {
    districtInput.setCustomValidity("");
    districtFeedback.textContent = "";
    districtInput.classList.add("is-valid");
    districtInput.classList.remove("is-invalid");
  }
});


const eduInput = document.getElementById("education");
const eduFeedback = document.getElementById("educationFeedback");

  eduInput.addEventListener('input',() => {
  var e = document.getElementById("education");
  edu = eduInput.options[e.selectedIndex].text;
  if ( document.getElementById('education').selectedIndex == 0 ) {
    eduInput.setCustomValidity("Please Select your Education");
      eduFeedback.textContent = "Please Select your Education";
      eduInput.classList.add("is-invalid");
      eduInput.classList.remove("is-valid");
  }
  else {
    eduInput.setCustomValidity("");
    eduFeedback.textContent = "";
    eduInput.classList.add("is-valid");
    eduInput.classList.remove("is-invalid");
  }
});


const profileInput = document.getElementById("profilepic");
const profileFeedback = document.getElementById("profileFeedback");
const fileSizeDisplay = document.getElementById("fileSizeDisplay");

profileInput.addEventListener("input", () => {
  profile = profileInput.files[0]; 
  const maxSizeInBytes = 2 * 1024 * 1024; 
  const supportedTypes = ['image/png', 'image/jpeg'];
  

  if (!profile) {
    fileSizeDisplay.textContent = "File size: 0.00 MB";
    profileInput.setCustomValidity("Please select a file.");
    profileFeedback.textContent = "Please select a file.";
    profileInput.classList.add("is-invalid");
    profileInput.classList.remove("is-valid");
  } else if (!supportedTypes.includes(profile.type)) {
    profileInput.setCustomValidity("Invalid file type. Please select a PNG or JPEG image.");
    profileFeedback.textContent = "Invalid file type. Please select a PNG or JPEG image.";
    profileInput.classList.add("is-invalid");
    profileInput.classList.remove("is-valid");
  } else if (profile.size > maxSizeInBytes) {
    // profileInput.value = ""; 
    profileInput.setCustomValidity("File size must not exceed 2 MB.");
    profileFeedback.textContent = "File size must not exceed 2 MB.";
    profileInput.classList.add("is-invalid");
    profileInput.classList.remove("is-valid");
  } else {
    fileSizeDisplay.textContent = `File size: ${byteSize(profile.size)}`;
    profileInput.setCustomValidity("");
    profileFeedback.textContent = "";
    profileInput.classList.add("is-valid");
    profileInput.classList.remove("is-invalid");
  }
});

function validateNumber(event) {
  const keyCode = event.keyCode;
  const excludedKeys = [8, 37, 39, 46];
  if (!((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || excludedKeys.includes(keyCode))) {
    event.preventDefault();
  }
}

function byteSize(sizeInBytes) {
  if (sizeInBytes < 1024) return `${sizeInBytes} Bytes`;
  if (sizeInBytes < 1048576) return `${(sizeInBytes / 1024).toFixed(2)} KB`;
  return `${(sizeInBytes / 1048576).toFixed(2)} MB`;
}

function saveProfilePictureToLocalStorage(file, callback) {
  const reader = new FileReader();

  reader.onload = function (event) {
    const base64String = event.target.result;

    if (callback) callback(base64String); 
  };

  reader.readAsDataURL(file);
}





document.addEventListener("DOMContentLoaded", function () {
form.addEventListener('submit', async function (event){




  form.classList.add('was-validated');

  if (!form.checkValidity()) {
    event.preventDefault(); 
    event.stopPropagation(); 
  } else {
    
    if (profile) {
      saveProfilePictureToLocalStorage(profile, function (base64String) {
        saveFormData(base64String); 
      });
    } else {
      saveFormData(); 
    }
  }
});

fetch("states-districts.json")
    .then((response) => response.json())
    .then((data) => {
      // Populate the state dropdown
      for (const state of Object.keys(data)) {
        const option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        stateInput.appendChild(option);
      }

      // Event listener for state selection
      stateInput.addEventListener("change", () => {
        const selectedState = stateInput.value;

        // Populate the district dropdown
        districtInput.innerHTML = '<option value="" disabled selected>Select a district</option>';
        if (data[selectedState]) {
          data[selectedState].forEach((district) => {
            const option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtInput.appendChild(option);
          });
        }
      });
    })
    .catch((error) => console.error("Error loading states-districts.json:", error));
});
     


function saveFormData(base64String = null) {
  const secretKey = '00000500000000000000000000000000'; // Replace with your actual secret key

  // Function to encrypt data
  function encryptData(data) {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  }

  const formData = {
    fullName: nameInput.value.trim(),
    email: emailInput.value.trim(),
    state: stateInput.value, // Assuming you have a `stateInput` element
    district: districtInput.value, // Assuming you have a `districtInput` element
    pinCode: pinCodeInput.value.trim(),
    contactno: contactInput.value.trim(),
    dateOfBirth: dobInput.value.trim(),
    age: age, // Assuming `age` is calculated elsewhere
    gender: gen_value, // Assuming `gen_value` is determined elsewhere
    education: edu, // Assuming `edu` is determined elsewhere
    pan: encryptData(panInput.value.trim()),
    userName: usernameInput.value.trim(),
    password: encryptData(passInput.value.trim()), // Encrypt and include the password
    picdetails: profile
      ? {
          picName: profile.name.split(".")[0],
          picSize: byteSize(profile.size),
          picType: profile.type.split("/")[1],
        }
      : null,
    profilePicture: base64String,
  };

  const storedFormData = JSON.parse(localStorage.getItem("formData")) || [];
  storedFormData.push(formData);
  localStorage.setItem("formData", JSON.stringify(storedFormData));
}
