function getFormData() {
  const storedFormData = JSON.parse(localStorage.getItem("formData")) || [];
  return storedFormData;
}

function calculateDaysLived(dob) {
  const birthDate = new Date(dob);
  const currentDate = new Date();
  const timeDiff = currentDate - birthDate;
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
}


function filterUsers(filters) {
  const formData = getFormData();

  return formData.filter(user => {
    let matches = true;

    // Age filter with conditions
    if (filters.ageCondition && filters.age) {
      if (filters.ageCondition === 'greater') matches = matches && user.age > filters.age;
      if (filters.ageCondition === 'less') matches = matches && user.age < filters.age;
      if (filters.ageCondition === 'equal') matches = matches && user.age === filters.age;
    }

    // Days lived filter with conditions
    if (filters.daysLivedCondition && filters.daysLived) {
      const userDaysLived = calculateDaysLived(user.dateOfBirth);
      if (filters.daysLivedCondition === 'greater') matches = matches && userDaysLived > filters.daysLived;
      if (filters.daysLivedCondition === 'less') matches = matches && userDaysLived < filters.daysLived;
      if (filters.daysLivedCondition === 'equal') matches = matches && userDaysLived === filters.daysLived;
    }

    if (filters.state) matches = matches && user.state?.toLowerCase().includes(filters.state.toLowerCase());
    if (filters.district) matches = matches && user.district?.toLowerCase().includes(filters.district.toLowerCase());
    if (filters.username) matches = matches && user.userName?.toLowerCase().includes(filters.username.toLowerCase());
    if (filters.name) matches = matches && user.fullName?.toLowerCase().includes(filters.name.toLowerCase());

    // Email filter
    if (filters.mailid) {
      const email = user.email?.toLowerCase();
      if (filters.mailid.startsWith('.')) {
        matches = matches && email.endsWith(filters.mailid.toLowerCase());
      } else {
        matches = matches && email.includes(filters.mailid.toLowerCase());
      }
    }

    // Pincode filter
    if (filters.pincode) matches = matches && user.pinCode === filters.pincode;

    // Education filter
    if (filters.education) matches = matches && user.education === filters.education;

    if (filters.gender) matches = matches && user.gender === filters.gender;


    // PAN Card filter
    if (filters.panCard) {
      const lastLetter = user.pan?.slice(-1)?.toLowerCase();
      matches = matches && lastLetter === filters.panCard.toLowerCase();
    }

    return matches;
  });
}
const secretKey = '00000500000000000000000000000000';
function decryptData(encryptedData) {
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
  return decryptedData;
}

function displayUsers(users) {
  const resultsContainer = document.getElementById("results-container");
  resultsContainer.innerHTML = "";

  users.forEach(user => {
    const decryptedPAN = decryptData(user.pan); // Decrypt PAN before displaying

    const userDiv = document.createElement("div");
    userDiv.className = "card";
    userDiv.innerHTML = `
      <img src="${user.profilePicture || '/path/to/default/image.png'}" alt="Profile Picture">
      <div class="card-body">
        <h5 class="card-title">${user.fullName}</h5>
        <p class="card-text"><span>Email:</span> ${user.email}</p>
        <p class="card-text"><span>Age:</span> ${user.age}</p>
        <p class="card-text"><span>Gender:</span> ${user.gender}</p>
        <p class="card-text"><span>Education:</span> ${user.education}</p>
        <p class="card-text"><span>State:</span> ${user.state}</p>
        <p class="card-text"><span>District:</span> ${user.district}</p>
        <p class="card-text"><span>Pincode:</span> ${user.pinCode}</p>
        <p class="card-text"><span>Username:</span> ${user.userName}</p>
        <p class="card-text"><span>Days Lived:</span> ${calculateDaysLived(user.dateOfBirth)}</p>
        <p class="card-text"><span>Contact No:</span> ${user.contactno}</p>
        <p class="card-text"><span>Date of Birth:</span> ${user.dateOfBirth}</p>
        <p class="card-text"><span>PAN No:</span> ${decryptedPAN}</p>
      </div>
    `;
    resultsContainer.appendChild(userDiv);
  });
}


const stateInput = document.getElementById("state-filter");
const districtInput = document.getElementById("district-filter");

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("search-button").addEventListener("click", function () {
    const ageCondition = document.getElementById("age-condition").value;
    const age = parseInt(document.getElementById("age-filter").value);
    const education = document.getElementById("education-filter").value;
    const daysLivedCondition = document.getElementById("days-lived-condition").value;
    const daysLived = parseInt(document.getElementById("days-lived-filter").value);
    const state = document.getElementById("state-filter").value;
    const district = document.getElementById("district-filter").value;
    const gender = document.getElementById("gender-filter").value;
    const pincode = document.getElementById("pincode-filter").value;
    const username = document.getElementById("username-filter").value;
    const name = document.getElementById("name-filter").value;
    const panCard = document.getElementById("pan-card-filter").value;
    const mailid = document.getElementById("mailid-filter").value;

    const filters = { age, ageCondition, daysLived, daysLivedCondition, state,district, pincode,gender,  username, mailid, panCard, name, education };
    const filteredUsers = filterUsers(filters);
    displayUsers(filteredUsers);
  });

  const emailInput = document.getElementById("email-filter");
  if (emailInput) {
    emailInput.addEventListener("blur", function () {
      if (emailInput.value && !emailInput.value.startsWith(".")) {
        emailInput.value = `.${emailInput.value}`;
      }
    });
  }

  const panCardInput = document.getElementById("pan-card-filter");
  if (panCardInput) {
    panCardInput.addEventListener("input", function () {
      panCardInput.value = panCardInput.value.slice(0, 1).toUpperCase();
    });
  }


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
