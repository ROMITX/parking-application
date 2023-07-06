import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase,ref,set,onValue } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
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
var cspn= 0;
const db = getDatabase();
const star=ref(db, "sp/cspn");
try {
    onValue(star, (snapshot) => {
        const data = snapshot.val();
        cspn=data["number"]
      });
    
} catch (error) {
    cspn=0
}

function writeUserData(user,name,nofs,nots,address,pin,map,phone,poh2,poh4) {
    
    cspn=cspn+1
    localStorage.setItem('spid', cspn);
    set(ref(db, 'sp/cspn'), {
        number:cspn});
    set(ref(db, 'sp/'+cspn), {
        user:user,
        name:name,
        nofs: nofs,
        nots: nots,
        address: address,
        pin: pin,
        map: map,
        phone: phone,
        poh2:poh2,
        poh4:poh4
      
    });


    console.log("s")
  }


document.getElementById("clickbuttons").addEventListener("click", function() {
    var userId = localStorage.getItem('userid');
    var user=userId.split(".");
    var name= document.getElementById('name').value;
    var fslots = document.getElementById('fslots').value;
    var tslots = document.getElementById('tslots').value;
    var Address = document.getElementById('Address').value;
    var pin = document.getElementById('pin').value;
    var map = document.getElementById('map').value;
    var phone= document.getElementById('phone').value;
    var poh2=document.getElementById('poh2').value;
    var poh4=document.getElementById('poh4').value;
    writeUserData(user[0],name,fslots,tslots,Address,pin,map,phone,poh2,poh4)
    alert(user.email+" parking spot created successfully!!!");
    location.href = 'HOMEPAGE.HTML'
});