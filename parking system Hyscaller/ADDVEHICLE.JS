import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase,ref,set } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyCjWyG7l19fAQxaymLZKW4a0ngFAIwrJ38",
    authDomain: "parking-application-4f4b7.firebaseapp.com",
    projectId: "parking-application-4f4b7",
    storageBucket: "parking-application-4f4b7.appspot.com",
    messagingSenderId: "828808314263",
    appId: "1:828808314263:web:25a929d809f6235bdc58d2",
    measurementId: "G-EMH5R5BY79",
    databaseURL: "https://parking-application-4f4b7-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
const app = initializeApp(firebaseConfig);

var nov=0;
try {
    const star=ref(db, 'users/' + userId+"/nov");
    onValue(star, (snapshot) => {
        const data = snapshot.val();
        nov=data["number"]
      });
    
} catch (error) {
    nov=0
}

function writeUserData(userId, vehicleType,vehiclecatgory, registrationNumber, insuranceNumber,vehicleModel) {
    const db = getDatabase();
    nov=nov+1
    console.log(nov)
    set(ref(db, 'users/' + userId+"/"+nov), {
        vehicleModel:vehicleModel,
        vehicleType: vehicleType,
        registrationNumber: registrationNumber,
        insuranceNumber: insuranceNumber,
        vehicleModel: vehicleModel,
        vehiclecatgory: vehiclecatgory
      
    });
    set(ref(db, 'users/' + userId+"/nov"), {
        number:nov
    });
    console.log("s")
  }


document.getElementById("clickbuttons").addEventListener("click", function() {
    var userId = localStorage.getItem('userid');
    var user=userId.split("@");
    var vehicleType = document.getElementById('vehicleType').value;
    var vehiclecatgory = document.getElementById('vehiclecatgory').value;
    var registrationNumber = document.getElementById('registrationNumber').value;
    var insuranceNumber = document.getElementById('insuranceNumber').value;
    var vehicleModel = document.getElementById('vehicleModel').value;
    writeUserData(user[0] ,vehicleType,vehiclecatgory,registrationNumber,insuranceNumber,vehicleModel)
    alert("vehicle"+vehicleModel+" added successfully!!!    returning to home page");
});
