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
const db = getDatabase();
var currentvw = localStorage.getItem('current')
console.log(currentvw)
document.getElementById('book').addEventListener("click", function() {
    var datetime=document.getElementById('dt').value;
    var dtm=new Date(datetime);
    var days=document.getElementById('days').value;
    var hour=document.getElementById('hour').value;
    console.log(dtm.toLocaleDateString())
    console.log(dtm.getHours())
    book(dtm.toLocaleDateString(),dtm.getHours(),days,hour)
});
const dataRef = ref(db, "sp/");
var current=localStorage.getItem('current')


onValue(dataRef, (snapshot) => {
  const data = snapshot.val();
  var info=data[current]
  document.getElementById('name').innerText=info.name
  document.getElementById('phn').innerText="phone no: "+info.phone
  document.getElementById('adr').innerText="Address: "+info.address
  document.getElementById('pin').innerText="PIN: "+info.pin
  document.getElementById('map').innerHTML=info.map
  document.getElementById('slot1').innerText="Parking spot available for 2wheelers: "+info.nots
  document.getElementById('slot2').innerText="Parking spot available for 4wheelers: "+info.nofs
  document.getElementById('cph').innerText="1hour charge  : for 2 wheeler: "+info.poh2+"  & for 4 wheeler:"+info.poh4
  document.getElementById('count').addEventListener('click',function() {
    var wheel= document.getElementById('choosevehicle').value;
    var days=document.getElementById('days').value;
    var hour=document.getElementById('hour').value;
    console.log(wheel);
    if (wheel=="2-wheeler") {
        console.log(info.poh2)
        var cost=((days*24)+hour)*info.poh2
        document.getElementById('tc').innerText='TOTAL COST = '+cost
        
    } else {   
        var cost=((days*24)+hour)*info.poh4
        document.getElementById('tc').innerText='TOTAL COST = '+cost
    }
});
});


const star=ref(db, 'sp/'+currentvw+'/bookings/noi');
var index=0

try {
    onValue(star, (snapshot) => {
        const data = snapshot.val();
        index =data["number"]});
    
} catch (error) {
    index=0
}
function book(date,time,days,hours) {
    index=index+1
    set(ref(db, 'sp/'+currentvw+'/bookings/noi'), {
        number:index});
    set(ref(db, 'sp/'+currentvw+'/bookings/'+index), {
        date:date,
        time:time,
        days:days,
        hours:hours,
        by:localStorage.getItem('userid')
      
    });
    set(ref(db, 'sp/'+currentvw+'/bookings/'+index+'/inr'), {
        aprove:0});

}

var userId = localStorage.getItem('userid');
var user=userId.split("@")[0];
console.log(user)
var nov=0;
try {
    const star=ref(db, 'users/' + user+"/nov");
    onValue(star, (snapshot) => {
        const data = snapshot.val();
        nov=data["number"]
      });
    
} catch (error) {
    nov=0
}
const select = document.querySelector('select'); 
onValue(ref(db, 'users/' + user), (snapshot) => {
    var data1 = snapshot.val();
    console.log(data1)
    for (let index = 1; index < nov+1; index++) {
        var element = data1[index];
        console.log(element)

        let newOption = new Option(element.vehicleModel,element.vehicleType);
        select.add(newOption,undefined);        
    }});
