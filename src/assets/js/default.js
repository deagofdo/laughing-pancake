function changeColor() {
   document.body.style.backgroundImage = 'none';  
   document.getElementById('menu1').style.display = 'block'; 
   document.getElementById('menu2').style.display = 'none';  
   document.getElementById('menu3').style.display = 'none';   
}

function changeColor_1() {
   document.body.style.backgroundImage = 'none';  
   document.getElementById('menu2').style.display = 'block'; 
   document.getElementById('menu1').style.display = 'none';  
   document.getElementById('menu3').style.display = 'none';      
}

function changeColor_2() {
   document.body.style.backgroundImage = 'none';  
   document.getElementById('menu3').style.display = 'block'; 
   document.getElementById('menu1').style.display = 'none';  
   document.getElementById('menu2').style.display = 'none';      
}

function bgdefault()
{
document.body.style.backgroundImage = 'url(assets/img/bg.png)';  
document.getElementById('menu1').style.display = 'none';
document.getElementById('menu2').style.display = 'none';
document.getElementById('menu3').style.display = 'none';
}