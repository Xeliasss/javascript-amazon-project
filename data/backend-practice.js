const xhr = new XMLHttpRequest(); 

xhr.addEventListener('load', () => {
    console.log('Response received:', xhr.response);
});


xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();
xhr.response
