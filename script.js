// Firebase config key by which we will access our firebase database
const firebaseConfig = {
    apiKey: "AIzaSyCG7l8aGepjaIwpsAxFyMC8rg09wgsGRfg",
    authDomain: "petmed-b39c6.firebaseapp.com",
    databaseURL: "https://petmed-b39c6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "petmed-b39c6",
    storageBucket: "petmed-b39c6.appspot.com",
    messagingSenderId: "224121657618",
    appId: "1:224121657618:web:b1c6068aa185da28a3bbcb",
    measurementId: "G-ZNT58DVBDS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const user = auth.currentUser;

//Function to generate alerts 
function generate_alert_error(title,description) {
    let document_area = document.getElementById("content-area")
    document_area.insertAdjacentHTML("afterbegin",`<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\"><strong>${title}</strong> ${description}<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div>`)
}

//signup function
function signUp() {
    let email = document.getElementById("floatingInput");
    let password = document.getElementById("floatingPassword");
    let if_user_is_vet = document.getElementById("vetCheckBox");

    auth.createUserWithEmailAndPassword(email.value, password.value)
        .then(function (working) {
            alert("Account created successfully"); 
            if (if_user_is_vet.checked == true) { window.location = "vetinfo.html" } 
            else { window.location = "vets.html"; }
        })

        .catch(function (error) {

            let errorCode = error.code;
            if (errorCode == "auth/weak-password") { generate_alert_error("Weak Password","The password is too weak and the minimum size of password is 6 charecters"); }
            else if (errorCode == "auth/email-already-in-use") { generate_alert_error("Email alreasy used","The email is already in use"); email.value = ""; password.value = ""; }
            else if (errorCode == "auth/invalid-email") { generate_alert_error("Invalid Email","The email id is invalid"); email.value = ""; password.value = ""; }
            else if (errorCode == "auth/operation-not-allowed") { generate_alert_error("Email not","The email is not allowed"); email.value = ""; password.value = ""; }
            else { generate_alert_error("Please try again",""); email.value = ""; password.value = ""; };

            //Debug functions
            // console.log(error.Message);
            // alert(error.code)
            // // email.value = "";
            // // password.value = "";
            // if (if_user_is_vet.checked == true){window.location="vetinfo.html";}// If checkbox is checked then redirect to vetinfo.html
            // else {window.location="vets.html";}// If checkbox is not checked then redirect to vets.html
        });
    // if (if_user_is_vet.checked == true){window.location="vetinfo.html";}// If checkbox is checked then redirect to vetinfo.html
    // else {window.location="vets.html";}// If checkbox is not checked then redirect to vets.html
}

//signIN function
function signIn() {
    let email = document.getElementById("floatingInput");
    let password = document.getElementById("floatingPassword");
    auth.signInWithEmailAndPassword(email.value, password.value).catch(function (error) {

        let errorCode = error.code;

        if (errorCode == "auth/wrong-password") { generate_alert_error("Wrong Password","The password used for the email is incorrect"); email.value = ""; password.value = ""; }
        else if (errorCode == "auth/invalid-email") { generate_alert_error("Invalid Email","The email is invalid"); email.value = ""; password.value = ""; }
        else{
        // console.log(error.code);
        generate_alert_error("An error occured, please try again","");
        }
        email.value = "";
        password.value = "";
    }
    );
    auth.onAuthStateChanged(user => {
        if (user) {
            window.location = 'vets.html'; //After successful login, user will be redirected to vets.html
        }
    });
}

//signOut

function signOut() {
    auth.signOut();
    window.location = "signin.html"
}


//active user to homepage
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // console.log("outside redired")
        if (location.href.split("/").slice(-1) == ("signin.html#","signin.html#?","signin.html","signin.html?") || location.href.split("/").slice(-1) == ("signup.html#","signup.html#?","signup.html","signup.html?")) {
            // console.log(window.location.href)
            // console.log("redirect")
            window.location = 'vets.html';
        }
        else if (location.href.split("/").slice(-1) == ("index.html") || location.href.split("/").slice(-1) == "") {
            let not_logged_button = document.getElementById("not-logged");
            not_logged_button.classList.add("hiden");
            let logged_button = document.getElementById("logged");
            logged_button.classList.remove("hiden");
        }
    }
    else {
        if (location.href.split("/").slice(-1) == ("signin.html#","signin.html#?","signin.html","signin.html?") || location.href.split("/").slice(-1) == ("signup.html#","signup.html#?","signup.html","signup.html?")) {
            // Damn
            // console.log("Damn");
        } 
        else if (location.href.split("/").slice(-1) == ("index.html") || location.href.split("/").slice(-1) == "") {
            let not_logged_button = document.getElementById("not-logged");
            not_logged_button.classList.remove("hiden");
            let logged_button = document.getElementById("logged");
            logged_button.classList.add("hiden");
        }  
    }
})