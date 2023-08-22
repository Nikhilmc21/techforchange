let username = sessionStorage.getItem('username');
let nameTxt = document.querySelector(".nameText");
let id = sessionStorage.getItem('userid');
let modals = document.querySelectorAll("#myModal");

if (username === null|| id === null) {
    window.location.href = "/login/login.html";
}

nameTxt.textContent = "Hey, " + username;

document.addEventListener("DOMContentLoaded", function() {
    setTimeout( () => {
        let slideItems = document.querySelectorAll(".slideitem");
        slideItems.forEach(slide => {
            slide.style.transform = "translateX(0%)";
        })
    }, 1000)
});


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const id = user.uid;
      console.log("User UID:", id);
  
      db.collection('buyersData')
        .get()
        .then((querySnapshot) => {
          let foundDocument = false;
          querySnapshot.forEach((doc) => {
            if (doc.id.includes(id)) {
              foundDocument = true;
              console.log("Matching Document Data:", doc.data());
            }
          });
  
          if (foundDocument) {
            console.log("Document containing UID exists.");
            document.getElementById("overlayRequest").style.display = "none";
          } else {
            console.log("No document containing UID found.");
            document.getElementById("overlayRequest").style.display = "flex";
          }
  
          const loadingDiv = document.querySelector(".loadingDiv");
          loadingDiv.style.transform = "translateX(200%)";
        const slideItems = document.querySelectorAll(".slideitem");

        slideItems.forEach((item) => {
            item.style.transform = "translateX(0%)";
        });
        })
        .catch((error) => {
          console.error("Error getting documents:", error);
        });
    } else {
      window.location.href = "/login/login.html";
    }
  });
  
  
  



modals.forEach(modal => {
    modal.style.transform = "translateY(-200%)";
});

function showModal() {
    modals.forEach(modal => {
        modal.style.animation = "slideDown 1s ease-out";
        modal.style.transform = "translateY(0%)";
    });
}

function closeModal() {
    modals.forEach(modal => {
        modal.style.animation = "slideUp 1s ease-out";
        modal.style.transform = "translateY(-200%)";
    });
}