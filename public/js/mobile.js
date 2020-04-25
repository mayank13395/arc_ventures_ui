
    function dropDownForMobile(x) {
        if (x.matches) { // If media query matches
          console.log('kkkkkkkkkkkkk');
          isMobileView = true;
  
          
  
        } else {
          // document.body.style.backgroundColor = "pink";
          isMobileView = false;
        }
      }
  
      var x = window.matchMedia("(max-width: 768px)")
      dropDownForMobile(x); // Call listener function at run time
      x.addListener(dropDownForMobile);
  
  
  
      //mobile side nav functionality
  
      function openNav() {
        console.log(
          'goitttttit'
        );
        document.getElementById("mySidenav").style.display = "block";
    document.getElementById("mySidenav").style.width = "175px";
    document.getElementById("mySidenav").style.transition = "0.5s";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  
  
  document.getElementById('main-contents').addEventListener('click', ()=>{
    console.log('hide');
    
    document.getElementById("mySidenav").style.display = "none";
  });
  
  