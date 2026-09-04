async function register() {
    let use = document.getElementById("name").value;
    let ema = document.getElementById("email").value;
    let t = document.getElementById("contact").value;
    let pass = document.getElementById("password").value;
    let stream = document.getElementById("stream").value;

    let new_user = {
        "name": use,
        "email": ema,
        "contact": t,
        "password": pass,
        "stream": stream
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new_user)
    };
    const response = await fetch('http://localhost:5000/students/register', requestOptions);
    const data = await response.json();

    alert(data.message)
    window.location.href = ""
}
async function getuser() {
    const response = await fetch('http://localhost:5000/students/allstudents');
    const data = await response.json();
    if (data.message) {
        const allusers = data.students;
        let temp = ''
        for (let i = 0; i < allusers.length; i++) {
            temp += `
         <tr>
            <td>${allusers[i].name}</td>
            <td>${allusers[i].email}</td>
            <td>${allusers[i].contact}</td>
            <td>${allusers[i].stream}</td>
            <td><button class="btn btn-danger" onclick="Delete_User('${allusers[i]._id}')">Delete</button></td>
            <td><button class="btn btn-success" onclick="Edit_User('${allusers[i]._id}')">Edit</button></td>
                           
        </tr>
        `
        }
        document.getElementById("list").innerHTML = temp
    }
    else {
        document.getElementById("list").innerHTML = "User not found"
    }

}

function Edit_User(_id)
{
    localStorage.setItem("_id", _id)
    window.location.href = "edit_details.html"
}


async function getDetailsById()
{
    let _id = localStorage.getItem("_id")
    const response = await fetch(`http://localhost:5000/students/getdetails/${_id}`);
    const data = await response.json();
    const student = data.student;
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;
    document.getElementById("password").value = student.password;
    document.getElementById("stream_val").innerHTML = student.stream;
}

async function Delete_User(_id) {
    
    if(confirm("Are u sure to delete this record? "))
    {
        const requestOptions = {
            method: 'DELETE',
        }
        const response = await fetch(`http://localhost:5000/students/deletedetails/${_id}`, requestOptions);
        const data = await response.json();
        if (data.message) {
            alert("Data deleted");
            getuser()
        }
    }
}
async function Update_User(_id) {
    if (confirm("Are you sure")) {
    let _id = localStorage.getItem("_id")
    let use = document.getElementById("name").value;
    let ema = document.getElementById("email").value;
    let t = document.getElementById("contact").value;
    let pass = document.getElementById("password").value;
    let stream = document.getElementById("stream").value;

    let new_user = {
        "name": use,
        "email": ema,
        "contact": t,
        "password": pass,
        "stream": stream
    }

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new_user)
    };
    const response = await fetch(`http://localhost:5000/students/updatedetails/${_id}`, requestOptions);
    const data = await response.json();
    window.location.href = "details.html";
    }
}
async function searchstudents(){
    let search = document.getElementById("search").value
    try{
        let search_use = {
            "search":search
        };
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(search_use)
    };
        const response = await fetch("http://localhost:5000/students/search",requestOptions);
        const data = await response.json();
        let body = document.getElementById("list");
        body.innerHTML="";
        if(!data.success){
            body = innerHTML = `
                <tr>
                    <td colspan="4">${data.message}</td>
                </tr>`;
            return;
        }
        data.students.forEach(student => {
            body.innerHTML += `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.contact}</td>
                    <td>${student.stream}</td>
                </tr>
            `;
        });
    }
    catch(err){
        console.error(err);
        alert("Something went wrong.");
    }
}