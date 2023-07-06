

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase,ref,onValue} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
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
const db = getDatabase();
const dataRef = ref(db, "sp/");

onValue(dataRef, (snapshot) => {
  const data = snapshot.val();
  var n=data["cspn"]["number"]
  for (let index = 1; index < n+1; index++) {
    const name=data[index].name;
    const address=data[index].address;
    const phone=data[index].phone;
    const pin=data[index].pin;
    console.log(pin);
    
    // data[index].stars;
    var inr='<div class="card" id='+index+' onclick="proceed('+index+')"><div class="container" ><h4><b>'+name+'</b></h4><p>'+address+'</p><p>'+phone+'</p><p>'+pin+'</p></div></div>';
    console.log(inr);
    var newelement=document.createElement("div");
    newelement.innerHTML=inr
    console.log(newelement);
    document.body.appendChild(newelement);



  }
  
  
});
