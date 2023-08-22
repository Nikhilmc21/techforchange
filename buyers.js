let settingsModal = document.querySelector("#settingsModal");
let requestModal = document.querySelector("#requestModal");
let modals = document.querySelectorAll(".modal");
const d = new Date();

modals.forEach(modal => {
    modal.style.transform = "translateY(-200%)";
});

function showModalSettings() {
    settingsModal.style.transform = "translateY(0%)";
}

function closeModalSettings() {
    settingsModal.style.transform = "translateY(-200%)";
}

function showModalRequest() {
    requestModal.style.transform = "translateY(0%)";
}

function closeModalRequest() {
    requestModal.style.transform = "translateY(-200%)";
}

const requestContainer = document.querySelector(".requestContainer");
let previousReqContainer = requestContainer.innerHTML;

window.addEventListener('DOMContentLoaded', () => {
  let indexBook = 0

  const listItemsText = document.querySelectorAll(".requestText");
  const listItemsGrades = document.querySelectorAll(".requestGrade");
  const listItemsDates = document.querySelectorAll(".requestDate");

  db.collection('sellersData')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let documentData = doc.data();
        listItemsText[indexBook].innerText = documentData.book;
        listItemsGrades[indexBook].innerText = documentData.grade;
        listItemsDates[indexBook].innerText = documentData.date;
        indexBook++
        previousReqContainer = requestContainer.innerHTML;
      });
      document.querySelector(".blueBoxCenter").style.display = "block";
    })
    .catch((error) => {
      console.error("Error getting documents:", error);
  });
});

let bookGetDropdown = document.querySelector("#bookGetDropdown");
let gradeGetDropdown = document.querySelector("#gradeGetDropdown")
let getRequestBtn = document.querySelector(".getRequest");
let foundDiv = document.querySelector(".foundDiv");
let dropdownDiv = document.querySelector(".dropdownDiv");

let requestData = {
    book: "",
    grade: ""
};

let resultContainer = document.querySelector(".results-container");
let loadingContainer = document.querySelector(".loading-container");
let userId = null

window.addEventListener('load', () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userDisplayName = user.displayName;
        userId = user.uid;
  
        let bookDropdown = document.querySelector("#bookGetDropdown");
        let gradeDropdown = document.querySelector("#gradeGetDropdown");
        let getRequestBtn = document.querySelector(".getRequest");
  
        getRequestBtn.addEventListener("click", () => {
            let selectedOptionBook = bookDropdown.options[bookDropdown.selectedIndex].text;
            let selectedOptionGrade = gradeDropdown.options[gradeDropdown.selectedIndex].text;
  
            let requestData = {
                book: selectedOptionBook,
                grade: selectedOptionGrade,
                uid: userId,
                udn: userDisplayName,
                date: d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear().toString().slice(-2)
            };

            let getDocName = requestData.book.substring(0, 4) + "_" + requestData.grade.slice(requestData.grade.length - 2);
  
            //Check sellers collection
            db.collection('sellersData')
              .where(firebase.firestore.FieldPath.documentId(), '>=', getDocName)
              .where(firebase.firestor
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                e.FieldPath.documentId(), '<', getDocName + '\uf8ff')
              .get()
              .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    //If there is no request like this in sellers, upload a request to buyers

                    let docName = requestData.book.substring(0, 4) + "_" + requestData.grade.slice(requestData.grade.length - 2) + "%" + requestData.uid;
                    db.collection("buyersData").doc(docName).set(requestData)
                    .then(() => {
                      console.log("Document added with custom name: ", docName);
                    })
                    .catch((error) => {
                      console.error("Error adding document: ", error);
                    });

                    loadingContainer.style.animation = "slideIn 1s ease";
                    loadingContainer.style.transform = "translateX(0%)";
                    loadingContainer.style.display = "flex";
                    setTimeout(() => {
                      document.querySelector(".notifyNotThere").innerText = "We'll email you when a seller arrives!"
                    }, 1000);
                } else {
                    querySnapshot.forEach((doc) => {
                        let documentData = doc.data();
                        console.log("Matching Document Data:", documentData);
                        document.querySelector(".nameContainer").innerText = "User " + documentData.udn
                        document.querySelector(".bookContainer").innerText = "Is giving a " + documentData.book + " book of " + documentData.grade
                    });
                    setTimeout(() => {
                      loadingContainer.style.animation = "slideIn 1s ease";
                      loadingContainer.style.transform = "translateX(0%)";
                      loadingContainer.style.display = "flex";
                    }, 1000)
                    setTimeout(() => {
                      resultContainer.style.display = "flex";
                      loadingContainer.style.animation = "slideOut 1s ease";
                      loadingContainer.style.transform = "translateX(200%)";
                    }, 5000)
                }
              })
              .catch((error) => {
                console.error("Error getting documents:", error);
            });

        });

      } else {
        window.location.href = "/login/login.html"
      }
    });
  });



  const backArrow = document.querySelector(".backArrow");
  const searchRequestBtn = document.querySelector(".searchRequest");
  const searchInput = document.querySelector(".searchInput");
  const noItemsDiv = document.querySelector(".noItems");



document.querySelector(".backArrow").addEventListener("click", () => {
  requestContainer.innerHTML = previousReqContainer;
  document.querySelector(".backArrow").style.display = "none";
})

document.querySelectorAll(".exitBtn").forEach(button => {
  button.addEventListener("click", () => {
    loadingContainer.style.animation = "slideOut 1s ease";
    loadingContainer.style.transform = "translateX(200%)";
    resultContainer.style.animation = "slideOut 1s ease";
    setTimeout(() => {
      resultContainer.style.display = "none";
      resultContainer.style.transform = "translateX(0%)";
    }, 1000)
  })
})

let listItems = document.querySelectorAll(".requestItem");

listItems.forEach(item => {
  item.addEventListener("click", () => {
    parts = item.children
    console.log(parts)
    let subjectName = parts[0].innerText
    let grade = parts[1].innerText
    console.log(grade)
    let docName = subjectName.toString().substring(0, 4) + "_" + grade.toString().slice(requestData.grade.length - 2) + "%" + userId;
    console.log(docName)
    db.collection("sellersData").where(firebase.firestore.FieldPath.documentId(), '==', docName)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        resultContainer.style.display
        document.querySelector(".nameContainer").innerText = "User " + data.udn
        document.querySelector(".bookContainer").innerText = "Is giving a " + data.book + " book of " + data.grade
        setTimeout(() => {
          showModalRequest()
          loadingContainer.style.animation = "slideIn 1s ease";
          loadingContainer.style.transform = "translateX(0%)";
          loadingContainer.style.display = "flex";
        }, 1000)
        setTimeout(() => {
          loadingContainer.style.animation = "slideOut 1s ease";
          loadingContainer.style.transform = "translateX(200%)";
          resultContainer.style.display = "flex";
        }, 5000)
      });
      } else {
        console.log('Document not found.');
      }
    })
    .catch((error) => {
      console.log('Error getting documents:', error);
    });
  })
})

function searchBar(searchKeyword) {
  console.log("level1")
  db.collection('sellersData').get()
    .then((querySnapshot) => {
      noItemsDiv.style.display = "none";
      requestContainer.innerHTML = ""
      console.log("level2")
      if(!querySnapshot.empty) {
        console.log("level3")
        noItemsDiv.style.display = "none";
        querySnapshot.forEach((doc) => {
          console.log(doc)
          if(doc.data().book.trim().includes(searchKeyword) || doc.data().grade.trim().includes(searchKeyword)) {
            console.log("Fired")
            const data = doc.data();
            const resultItem = document.createElement('div');
            resultItem.classList.add("requestItem");
            requestContainer.appendChild(resultItem);
    
            const titleItem = document.createElement('p');
            titleItem.classList.add("requestText");
            titleItem.innerText = data.book;
            resultItem.appendChild(titleItem);
    
            const gradeItem = document.createElement('p');
            gradeItem.classList.add("requestGrade");
            gradeItem.innerText = data.grade;
            resultItem.appendChild(gradeItem);
    
            const dateItem = document.createElement('p');
            dateItem.classList.add("requestDate");
            dateItem.innerText = data.date;
            resultItem.appendChild(dateItem);

            backArrow.style.display = "flex";
        }
        });
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

searchRequestBtn.addEventListener("click", () => {
  const searchKeyword = searchInput.value.trim();
  searchBar(searchKeyword)
});