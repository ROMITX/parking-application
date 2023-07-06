var uid=localStorage.getItem('userid');
var name=uid.split('@')[0]
if (uid=='') {
    document.getElementById('login').innerText='LOGIN'
    document.getElementById('login').addEventListener("click", function() {location.href='LOGINPAGE.html'});
} else {
    document.getElementById('login').innerText='LOGOUT';
    document.getElementById('user').innerText='HI '+ name;
    document.getElementById('login').addEventListener("click", function() {
        localStorage.setItem('userid','')
        location.href='HOMEPAGE.html'
    });
    
}
