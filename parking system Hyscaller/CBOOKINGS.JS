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


const CRef = ref(db, "sp/");

onValue(CRef, (snapshot) => {
  const data = snapshot.val();
  var n=data["cspn"]["number"]
  for (let index = 1; index < n+1; index++) {
    bookings(index)

  };});
function bookings(index) {
    const dataRef = ref(db, "sp/"+index+"/bookings");
    onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        var n=data["noi"].number
        console.log(n)
        for (let index = 1; index < n+1; index++) {
          var info=data[index];
          var by =info.by;
          var user=localStorage.getItem('userid');
          if(by==user){
            var by =info.by;
            var date= info.date;
            var days=info.days;
            var time=info.time;
            var hours=info.hours;
            var status=info.inr.aprove;
            var stat=''
            if (status==1) {
                stat='Aproved'
                // 
                
            }else if(status==-1) {
                stat='Declined'
            }else{
                stat='Waiting'
            }
            var inr='<div class="column"><div class="card"><h3>Consumer details</h3><p>'+'Booking done by:'+by+'</p><p>'+'Booking done on date:'+date+'</p><p>'+'Booking done on time :'+time+'</p><p>'+'Booking done for days :'+days+'</p><p>'+'Booking done for hours :'+hours+'</p> <br></br> <br></br> <br></br><p>status:'+stat+'</p> </div>';
            var ele=document.createElement('div')
            ele.innerHTML=inr;
            document.body.appendChild(ele);
          }
        }});
}