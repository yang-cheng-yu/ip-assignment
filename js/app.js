document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
    // Calling directly because we only have 1 js file
    initForm();
}

function initForm() {
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', () => {
        window.scroll({top: 0, behavior: 'smooth'});
        validateForm();
    });
}

function validateForm() {
    const studentId = document.getElementById('studentId');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const birthDate = document.getElementById('birthDate');
    const gender = document.getElementById('gender');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const street = document.getElementById('street');
    const city = document.getElementById('city');
    const province = document.getElementById('province');
    const post = document.getElementById('post');

    let isValid = true;
    const messages = [];
    const checks = [
        {field: studentId, regex: /^[a-zA-Z]{3}\.\d{3}\.\d{1,4}$/, error: "Invalid student ID - Format: abc.123.1(234)"},
        {field: firstName, regex: /^[a-zA-Z]{0,15}$/, error: "Invalid first name - 15 letters max"},
        {field: lastName, regex: /^[a-zA-Z]{0,25}$/, error: "Invalid last name - 25 letters max"},
        {field: username, regex: /^[a-zA-Z]{6,10}$/, error: "Invalid username - 6-10 letter limit"},
        {field: password, regex: /^.*\d.*\d.*$/, error: "Invalid password - Require min. 2 numbers (0-9)"},
        {field: password, regex: /^.*[a-z].*[a-z].*$/, error: "Invalid password - Require min. 2 lowercase letters"},
        {field: password, regex: /^.*[A-Z].*$/, error: "Invalid password - Require min. 1 uppercase letter"},
        {field: password, regex: /^.*[!@#$%^&*()\-+=_\[\]{}|\\;:'",.<>\/?`~].*$/, error: "Invalid password - Require min. 1 special character"},
        {field: gender, regex: /^[a-zA-Z]+$/, error: "Please select a gender"},
        {field: phone, regex: /^\d{10}|\(\d{3}\)\s?\d{3}\-\d{4}$/, error: "Invalid phone - Format: 1234567890 OR (123)456-7890"},
        {field: email, regex: /^[a-z0-9\.]+@[a-z]+\.[a-z]{2,6}(\.[a-z]{2,6})?$/, error: "Invalid email - Please check your email address"},
        {field: birthDate, regex: /^\d{4}\-\d{2}\-\d{2}$/, error: "Invalid date - Format: YYYY-MM-DD"},
        {field: post, regex: /^([a-zA-Z]\d){3}$/, error: "Invalid post - Format: A1A1A1"},
        {field: street, regex: /^.+$/, error: "Invalid street - Please write a street"},
        {field: city, regex: /^[a-zA-Z]+$/, error: "Invalid street - Please use letters only"},
        {field: province, regex: /^[a-zA-Z]+$/, error: "Invalid province - Please use letters only"}
    ];

    if (studentId.value === "" || firstName.value === "" || lastName.value === "" || username.value === "" ||
        password.value === "" || birthDate.value === "" || gender.value === "" || email.value === "" ||
        phone.value === "" || street.value === "" || city.value === "" || province.value === "" || post.value === "")
    {
        const fields = document.querySelectorAll('input, select');
        fields.forEach(field => {
            if (field.value === "") {
                field.classList.remove('success');
                field.classList.add('error');
            }
            else {
                field.classList.remove('error');
                field.classList.remove('success');
            }
        })
        messages.push("Fill out all fields");
        isValid = false;
    }
    else {
        checks.forEach(check => {
            if (!check.regex.test(check.field.value.trim())) {
                isValid = false;
                messages.push(check.error);
                check.field.classList.remove('success');
                check.field.classList.add('error');
            }
            else {
                check.field.classList.remove('error');
                check.field.classList.add('success');
            }
        })
    }

    if (isValid) {
        showAlert("Student registered successfully", "success", "alert-container");
    } else {
        showAlert(`Error registering student: <ul><li>${messages.join('</li><li>')}</ul>`, "danger", "alert-container");
    }
}

function showAlert(message, type, alertPlaceholderId) {
    const alertPlaceholder = document.getElementById(alertPlaceholderId);
    alertPlaceholder.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('');

    alertPlaceholder.append(wrapper);
}
