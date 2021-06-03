const first_name = document.getElementById('contact-first_name');
const last_name = document.getElementById('contact-last_name');
const email = document.getElementById('contact-email');
const phone = document.getElementById('contact-phone');
cont search = document.getElementById('search');

export function getCookie(cname) {
  if (typeof window != 'undefined') {
    let name = cname + '='
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
  }
  return null
}

// add contact
document.querySelector('#add-contact').addEventListener('click', () => {

  const jwt = getCookie('token');
  
  const data = {
    first_name: first_name.innerText,
    last_name: last_name.innerText,
    email: email.innerText,
    phone: phone.innerText
  }

  fetch("/api/contact", {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': `Bearer ${jwt}`
      
    },
    body: JSON.stringify(data)
  })

  .then(Response => Response.json())
  .then(data => console.log('add contact'))
})

// search
document.querySelector('#search').addEventListener('click', () => {
  const jwt = getCookie('token');

  fetch("/api/search", {
    method: 'get',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    body: JSON.stringify(search.innerText)
  })

  .then(Response => Response.json())
  .then(search => console.log(search['contacts']))
})

// update contact row
document.querySelector('#save-contact').addEventListener('click', () => {

  const jwt = getCookie('token');
  
  const data = {
    first_name: first_name.innerText,
    last_name: last_name.innerText,
    email: email.innerText,
    phone: phone.innerText
  }
  
  fetch("/api/contact", {
    method: 'put',
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify(data)
  })

  .then(Response => Response.json())
  .then(data => console.log('save contact'))
})

// delete contact row
document.querySelector('#delete-contact').addEventListener('click', () => {

  const jwt = getCookie('token');
  
  const data = {
    first_name: first_name.innerText,
    last_name: last_name.innerText,
    email: email.innerText,
    phone: phone.innerText
  }

  fetch("api/contact", {
    method: 'delete',
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': `Bearer ${jwt}`
    },
    
    body: JSON.stringify(data)
  })

  .then(Response => Response.json())
  .then(data => console.log('delete contact'))

  var id = document.getElementById("table-id").innerText;
  document.getElementsByTagName("tr")[id].remove();

})