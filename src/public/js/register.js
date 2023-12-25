


const form = document.getElementById("register_form");



form.addEventListener('submit', event=>{
    event.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/session/register',{
        method:'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    
    }).then(result=>result.json()).then(json =>console.log(json))
    console.log(data);
    
        window.location.replace('http://localhost:8080/api/views/login');
    
})




