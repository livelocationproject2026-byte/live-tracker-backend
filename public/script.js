function showMailMessage(){
    alert("Please send query to livelocationproject2026@gmail.com");
}

/* PASSWORD SHOW HIDE */

function togglePassword(id, icon){

    const input = document.getElementById(id);

    if(input.type === "password"){

        input.type = "text";

        icon.classList.remove("bx-hide");
        icon.classList.add("bx-show");

    }else{

        input.type = "password";

        icon.classList.remove("bx-show");
        icon.classList.add("bx-hide");
    }
}

/* USERID VALIDATION */

function validateUserId(){

    const userid = document.getElementById("userid").value;

    const error = document.getElementById("error");

    const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,50}$/;

    if(!pattern.test(userid)){

        error.innerText =
        "User ID must contain uppercase, lowercase, number & special character";

        return false;
    }

    error.innerText = "";

    return true;
}

/* PASSWORD VALIDATION */

function validatePassword(){

    const password =
    document.getElementById("password").value;

    const confirmPassword =
    document.getElementById("confirmPassword").value;

    const error =
    document.getElementById("passwordError");

    const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if(password !== confirmPassword){

        error.innerText = "Passwords do not match";

        return false;
    }

    if(!pattern.test(password)){

        error.innerText = "Weak Password";

        return false;
    }

    return true;
}