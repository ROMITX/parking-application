import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase,ref,onValue,set} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
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

var uid=localStorage.getItem('spid');
const dataRef = ref(db, "sp/"+uid+"/bookings");
var aprove=localStorage.getItem('aprove');
if (aprove=='') {
  console.log('nothing')
  
} else {
  const cref=ref(db, "sp/"+uid+"/bookings/"+aprove+'/'+'/inr');
  update(cref)
  console.log('succ')

}
var dt=0;
onValue(dataRef, (snapshot) => {
  const data = snapshot.val();
  dt=data;
  var n=data["noi"]["number"]
  for (let index = 1; index < n+1; index++) {
    var info=data[index];
    var by =info.by;
    var date= info.date;
    var days=info.days;
    var time=info.time;
    var hours=info.hours;
    var status=info.inr.aprove;
    if (status==0) {
      var inr='<div class="column"><div class="card"><h3>Consumer details</h3><p>'+'Booking done by:'+by+'</p><p>'+'Booking done on date:'+date+'</p><p>'+'Booking done on time :'+time+'</p><p>'+'Booking done for days :'+days+'</p><p>'+'Booking done for hours :'+hours+'</p><button class="REGISTER" id="accept" onclick=change('+index+',1)>Accept</button><button class="REGISTER" id="decline" onclick=change('+index+',-1)>Decline</button></div>';
      var ele=document.createElement('div')
      ele.innerHTML=inr;
      document.body.appendChild(ele);
    } else if (status==1) {
      var inr='<div class="column"><div class="card"><h3>Consumer details</h3><p>'+'Booking done by:'+by+'</p><p>'+'Booking done on date:'+date+'</p><p>'+'Booking done on time :'+time+'</p><p>'+'Booking done for days :'+days+'</p><p>'+'Booking done for hours :'+hours+'</p> <br></br> <br></br> <br></br><p>Aproved</p> </div>';
      var ele=document.createElement('div')
      ele.innerHTML=inr;
      document.body.appendChild(ele);
    } else {
      console.log(by)
    }

  }
  
});
function update(ref) {
  var num=localStorage.getItem('status');
  set(ref, {
    aprove: num,
    })
  
}

