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
const user = auth.currentUser();


//signOut

function signOut() {
    auth.signOut();
    alert("Signed out successfully");
    window.location = "signin.html"
}


