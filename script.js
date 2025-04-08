const bar=document.getElementById('bar');
const close=document.getElementById('close');
const nav=document.getElementById('navbar');

if (bar){
    bar.addEventListener('click',()=>{
        nav.classList.add('active');
    }
    )
}


if (close){
    close.addEventListener('click',()=>{
        nav.classList.remove('active');
    }
    )
}


/* filepath: /c:/Users/culli/Desktop/Viatel Website/script.js */

document.querySelector('.fa-shopping-cart').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.cartTab').classList.add('active');
});

document.querySelector('.cart_close_btn').addEventListener('click', () => {
    document.querySelector('.cartTab').classList.remove('active');
});