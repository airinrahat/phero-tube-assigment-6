
const loadBtn = async (id) => {
    const url = `https://openapi.programming-hero.com/api/videos/categories`;
    const res = await fetch(url);
    const data = await res.json();
  
    showbtn(data.data);
  };
  
  const showbtn = (data) => {
    console.log(data);
  
    const cardBtnContainer = document.getElementById("card-btn");
    cardBtnContainer.innerHTML = "";
  
    data.forEach((data) => {
      const div = document.createElement("div");
      const button = document.createElement("button");
      button.textContent = data.category;
      button.type = "button";
      button.classList.add("btn", "btn-secondary");
  
      // Check if the button corresponds to "All" category and add "active-btn" class
      if (data.category === "All") {
        button.classList.add("active-btn");
      }
  
      // Add an event listener to toggle the active class on button click
      button.addEventListener("click", () => {
        // Remove active class from all buttons in the container
        const buttons = cardBtnContainer.querySelectorAll("button");
        buttons.forEach((btn) => {
          btn.classList.remove("active-btn");
        });
  
        // Add active class to the clicked button
        button.classList.add("active-btn");
  
        // Call the loadCCard function with the category_id
        loadCCard(data.category_id);
      });
  
      div.classList.add("d-flex", "justify-content-center", "mb-5");
      div.appendChild(button);
      cardBtnContainer.appendChild(div);
    });
  };
  
  const loadCCard = async (id) => {
    const url = `https://openapi.programming-hero.com/api/videos/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
  
    showCard(data.data);
  };
  
  const loadCACard = async (id) => {
    const url = `https://openapi.programming-hero.com/api/videos/category/1000`;
    const res = await fetch(url);
    const data = await res.json();
  
    return data.data;
  };
  
  const showCard = (data) => {
    console.log(data);
    // html data inject with dom
  
    function formatTime(seconds) {
      if (!seconds) {
        
        return ""; // No posted_date, return an empty string
      }
  
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
  
      if (hours > 0 && minutes > 0) {
        return `${hours}hrs ${minutes}min`;
      } else if (hours > 0) {
        return `${hours}hrs`;
      } else {
        return `${minutes}min`;
      }
    }
  
    const cardContainer = document.getElementById("card-info");
    cardContainer.innerHTML = "";
    const cardContainerr = document.getElementById("card-api");
    cardContainerr.innerHTML = "";
  
    if (data.length > 0) {
      data.forEach((data) => {
        const seconds = data.others.posted_date;
        const formattedTime = formatTime(seconds);
        const div = document.createElement("div");
        div.classList.add("col-lg-3");
        div.classList.add("col-md-6");
        div.innerHTML = `  <div class="card border border-0 ">
        <div class="time-position">
          <img
            src="${data.thumbnail}"
            class="card-img-top rounded-2 " style="height:170px"
            alt="..."
          />
          <p>${formattedTime}</p>
        </div>
  
        <div class="d-flex pt-3 gap-4">
          <img
            src=" ${data.authors[0].profile_picture}"
            class="rounded-circle"
            style="height: 50px; width: 50px"
            alt=""
          />
  
          <div>
            <h5 class="card-title fs-6">
            ${data.title}
            </h5>
            <div class="d-flex gap-3">
              <p class="m-0"> ${data.authors[0].profile_name}
              
              </p>
              
              <span>${
                  data.authors[0].verified === true
                    ? `<i class="bi bi-patch-check-fill text-primary"></i>`
                    : ""
                }</span>
        
            </div>
            <p class="m-0">${data.others.views}</p>
            
          </div>
        </div>
      </div>`;
        cardContainer.appendChild(div);
      });
    } else {
      const div = document.createElement("div");
      div.innerHTML = `<div class="text-center">
        <img src="https://i.ibb.co/HHVPD28/fi-5301987.jpg" alt="" />
        <h1>
          <b
            >Oops!! Sorry, There is no <br />
            content here</b
          >
        </h1>
      </div>`;
      cardContainerr.appendChild(div);
    }
  };
  
  const sortCardsByViewsAll = () => {
    loadCACard().then((data) => {
      data.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views));
      showCard(data);
    });
  };
  
  document.addEventListener("DOMContentLoaded", async () => {
    const sortButton = document.getElementById("sortButton");
    sortButton.addEventListener("click", sortCardsByViewsAll);
  
    const initialData = await loadCACard();
    showCard(initialData);
  });
  
  loadBtn();
  loadCCard();
  loadCACard();
  