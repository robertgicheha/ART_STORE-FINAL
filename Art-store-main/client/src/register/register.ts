
let signupBtn = document.getElementById("regbutton") as HTMLButtonElement;
let formgroup = document.querySelector(".form") as HTMLDivElement; 

signupBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("clicked");
    let name = document.getElementById("name") as HTMLInputElement;
    let email = document.getElementById("email") as HTMLInputElement;
    let password = document.getElementById("password1") as HTMLInputElement;
    let password2 = document.getElementById("password2") as HTMLInputElement;


    if (name.value === "" || email.value === "" || password.value === "" || password2.value === "") {
        let error = document.createElement("p");
        error.innerHTML = "Please fill all fields";
        error.style.color = "red";
        error.style.fontSize = "12px";
        formgroup.insertAdjacentElement("afterbegin", error);
        setTimeout(() => {
            error.remove();
        }, 3000);

    } else if (password.value !== password2.value) {
        let error = document.createElement("p");
        error.innerHTML = "Passwords do not match";
        error.style.color = "red";
        error.style.fontSize = "12px";
        formgroup.insertAdjacentElement("afterbegin", error);
        setTimeout(() => {
            error.remove();
        }, 3000);
    }
    else {
        let authdata = await createacc(name.value, email.value, password.value);{
            let token = authdata['token']
            localStorage.setItem("token", token);
            window.location.href ="../index.html";
            
        }
    }
});


const createacc = async (name:string, email: string, password: string) => {
    let response = await fetch("http://localhost:4000/users/register", {
        method: "POST",
        body: JSON.stringify({
            Name:name,
            Email:email,
            Password:password
        }),
        headers: {
            "content-type": "application/json"
        }
    });

    if (response.status === 401) {
        let error = document.createElement("p");
        error.innerHTML = "Invalid email or password";
        error.style.color = "red";
        error.style.fontSize = "12px";
        formgroup.insertAdjacentElement("afterbegin", error);
        setTimeout(() => {
            error.remove();
        }, 3000);
    } else if (response.status === 400) {
        let error = document.createElement("p");
        error.innerHTML = "User already exists";
        error.style.color = "red";
        error.style.fontSize = "12px";
        formgroup.insertAdjacentElement("afterbegin", error);
        setTimeout(() => {
            error.remove();
        }, 3000);
    } else {
        let data = await response.json();
        return data;
    }
}