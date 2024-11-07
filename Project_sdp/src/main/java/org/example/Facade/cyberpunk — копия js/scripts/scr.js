let users = JSON.parse(localStorage.getItem('users')) || [];

const adminCredentials = {
    username: 'admin',
    password: 'admin123' 
};


document.getElementById('signUpForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('signupUsername').value;
    const firstname = document.getElementById('signupFirstName').value;
    const lastname = document.getElementById('signupLastName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    
    if (users.some(u => u.username === username)) {
        document.getElementById('signupErrorMessage').innerText = 'Это имя пользователя уже занято.';
    } else {
        
        users.push({ username, firstname, lastname, email, password });
        localStorage.setItem('users', JSON.stringify(users)); 
        alert('Регистрация прошла успешно! Вы можете войти теперь.');
        document.getElementById('signUpForm').reset(); 
    }
});


document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (username === adminCredentials.username && password === adminCredentials.password) {
        window.location.href = 'admin.html'; 
    }

   
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert('Добро пожаловать, ' + username + '!');
    } else {
        document.getElementById('loginErrorMessage').innerText = 'Неверные учетные данные.';
    }
});
function displayUsers() {
    const userTableBody = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    userTableBody.innerHTML = ''; 

    users.forEach((user, index) => {
        const row = userTableBody.insertRow();
        row.insertCell(0).innerText = user.username;
        row.insertCell(1).innerText = user.firstname;
        row.insertCell(2).innerText = user.lastname;
        row.insertCell(3).innerText = user.email;
        row.insertCell(4).innerText = user.password;
        
        const actionsCell = row.insertCell(5);
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.onclick = () => editUser(index);
        actionsCell.appendChild(editButton);
        
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Remove';
        deleteButton.onclick = () => deleteUser(index);
        actionsCell.appendChild(deleteButton);
    });
}

function editUser(index) {
    const user = users[index];
    const newUsername = prompt('Enter your new username:', user.username);
    const newFirstName = prompt('Enter a new name:', user.firstname);
    const newLastName = prompt('Enter your new last name:', user.lastname);
    const newEmail = prompt('Enter your new Email:', user.email);
    const newPassword = prompt('Enter your new password:', user.password);
    
    if (newUsername && newFirstName && newLastName && newEmail && newPassword) {
        users[index] = {
            username: newUsername,
            firstname: newFirstName,
            lastname: newLastName,
            email: newEmail,
            password: newPassword
        };
        localStorage.setItem('users', JSON.stringify(users));  
        displayUsers(); 
    }
}


function deleteUser(index) {
    if (confirm('Are you sure you want to remove this user?')) {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users)); 
        displayUsers(); 
    }
}

if (document.getElementById('userTable')) {
    displayUsers();
}
