let m1Current = 66000;

if (JSON.parse(localStorage.getItem("m1Current")) === null) {
  localStorage.setItem("m1Current", m1Current);
}

m1CurrentUpdated = JSON.parse(localStorage.getItem("m1Current"));

let stock_data1 = [
  { name: "JPM", id: 1, image: "Images/JPM.jpg", obtained: 5467, goal: 10000 },
  {
    name: "DUK",
    id: 2,
    image: "Images/dukeicon.png",
    obtained: 7196,
    goal: 10000,
  },
  {
    name: "MSFT",
    id: 3,
    image: "Images/MSFTicon.png",
    obtained: 5688,
    goal: 10000,
  },
  {
    name: "AAPL",
    id: 4,
    image: "Images/aaplicon.png",
    obtained: 5722,
    goal: 10000,
  },
  {
    name: "VICI",
    id: 5,
    image: "Images/viciicon.png",
    obtained: 594,
    goal: 3000,
  },
  {
    name: "QYLD",
    id: 6,
    image: "Images/qyld logo.jpg",
    obtained: 2447,
    goal: 20000,
  },
  {
    name: "JEPI",
    id: 6,
    image: "Images/jepiicon.png",
    obtained: 1904,
    goal: 10000,
  },
];

if (JSON.parse(localStorage.getItem("stock_data")) === null) {
  localStorage.setItem("stock_data", JSON.stringify(stock_data1));
}

let stock_data = JSON.parse(localStorage.stock_data);

let calculate_percentage = (dividend, divisor) => {
  return Math.floor((dividend / divisor) * 100);
};

let toggleModal = (name) => {
  let modal = document.querySelector(`#${name}modal`);

  modal.classList.toggle("showModal");
};

let m1Update = () => {
  let UpdateBox = document.querySelector("#m1Update");
  console.log(UpdateBox);

  localStorage.setItem("m1Current", JSON.stringify(UpdateBox.value));
  location.reload();
};

let editNewValues_stock = (name) => {
  let updateCurrent = document.querySelector(`#${name}_invest_enter`).value;
  let updateGoal = document.querySelector(`#${name}_goal_enter`).value;

  console.log(updateCurrent);
  console.log(updateGoal);

  let array = JSON.parse(localStorage.getItem("stock_data"));

  array.forEach((stock) => {
    if (name === stock.name) {
      if (updateCurrent === "" && updateGoal === "") {
        alert("Please enter values for either box");
      } else if (updateCurrent !== undefined && updateGoal === "") {
        stock.obtained = updateCurrent;
        localStorage.setItem("stock_data", JSON.stringify(array));
        location.reload();
      } else if (updateCurrent === "" && updateGoal !== undefined) {
        stock.goal = updateGoal;
        localStorage.setItem("stock_data", JSON.stringify(array));
        location.reload();
      } else if (updateCurrent !== undefined && updateGoal !== undefined) {
        stock.obtained = updateCurrent;
        stock.goal = updateGoal;
        localStorage.setItem("stock_data", JSON.stringify(array));
        location.reload();
      }
    }
  });
};

let editNewValues_crypto = (name) => {
  let updateCurrent = document.querySelector(`#${name}_invest_enter`).value;
  let updateGoal = document.querySelector(`#${name}_goal_enter`).value;

  let array = JSON.parse(localStorage.getItem("crypto_data"));

  array.forEach((stock) => {
    if (name === stock.name) {
      if (updateCurrent === "" && updateGoal === "") {
        alert("Please enter values for either box");
      } else if (updateCurrent !== undefined && updateGoal === "") {
        stock.obtained = updateCurrent;
        localStorage.setItem("stock_data", JSON.stringify(array));
        location.reload();
      } else if (updateCurrent === "" && updateGoal !== undefined) {
        stock.goal = updateGoal;
        localStorage.setItem("stock_data", JSON.stringify(array));
        location.reload();
      } else if (updateCurrent !== undefined && updateGoal !== undefined) {
        stock.obtained = updateCurrent;
        stock.goal = updateGoal;
        localStorage.setItem("stock_data", JSON.stringify(array));
        location.reload();
      }
    }
  });
};

//create Modals also
let populate_dashboard_stock = (array_stock) => {
  const m1Tracker = document.querySelector("#m1Tracker");
  const modalSpace = document.querySelector(".modalSpace");

  m1Tracker.innerHTML = `
    <img class="mainIcon" onclick=toggleModal("m1") src="Images/m1icon.png" />
    <div id="m1ProgressBarContainer" class="mainProgressBarContainer">
      <span class="mainProgressBar">${calculate_percentage(
        m1CurrentUpdated,
        100000
      )}%</span>
    </div>`;

  let percentage_bar = document.querySelector(`.mainProgressBar`);
  percentage_bar.style.width = `${calculate_percentage(
    m1CurrentUpdated,
    100000
  )}%`;

  array_stock.forEach((stock) => {
    m1Tracker.innerHTML += `
    <div class="holdingWrapper" id="holdingWrapper${stock.id}">
    <img class="holdingicon" id="${stock.name}icon" src="${stock.image}" />
    <div
      class="holdingProgressBarContainer"
      id="${stock.name}ProgressBarContainer"
    >
      <span class="HoldingProgressBar" id="${
        stock.name
      }ProgressBar">${calculate_percentage(stock.obtained, stock.goal)}%</span>
    </div>

    <button class = "editButton" onclick = toggleModal("${
      stock.name
    }")><img class = "editicon" src = "Images/editicon.png"></img></button>
  
  </div>`;

    modalSpace.innerHTML += `<div class = "modal" id = "${stock.name}modal">

      <div><button class = "closeButton" onclick = toggleModal("${stock.name}")><img class = "closeImg" src= "Images/close.png"> </button>
      </div>

      <div class = "modalSpace"> 

        <div class = "modalContent">
          <div class = "form"> 
            <form>
              <input type = "number" placeholder = "Update Current Value" id = "${stock.name}_invest_enter"/>
              <input type = "number" placeholder = "Update Goal" id = "${stock.name}_goal_enter"/>
            </form> 
          </div>
          <div class = "currentData"> 
            <div class = "currentDataNum"> Current: ${stock.obtained}</div>
            <div class = "currentDataNum"> Goal: ${stock.goal}</div>
          </div>

        </div>  
        <button class = "submitButton" onclick = editNewValues_stock("${stock.name}")>Submit</button> 
      </div>

     </div>`;

    //  editNewValues("${stock.name}" , "${stock.id}") throws an error

    let percentage_bar = document.querySelector(`#${stock.name}ProgressBar`);
    percentage_bar.style.width = `${calculate_percentage(
      stock.obtained,
      stock.goal
    )}%`;
  });
};

let populate_dashboard_crypto = (array_crypto) => {
  const cryptoTracker = document.querySelector("#cryptoTracker");
  const modalSpace = document.querySelector(".modalSpace");
  let crypto_total = 0;
  let crypto_invested = 0;

  array_crypto.forEach((crypto) => {
    crypto_invested += crypto.obtained;
  });
  array_crypto.forEach((crypto) => {
    crypto_total += crypto.goal;
  });

  let crypto_figure = calculate_percentage(crypto_invested, crypto_total);

  cryptoTracker.innerHTML = `
    <img class="mainIcon" src="Images/crypto.jpg" />
    <div id="cryptoProgressBarContainer" class="mainProgressBarContainer">
      <span class="mainProgressBar" id = "cryptoProgressBar">${crypto_figure}%</span>
    </div>`;

  let crypto_percentage_bar = document.querySelector("#cryptoProgressBar");
  crypto_percentage_bar.style.width = `${crypto_figure}%`;

  array_crypto.forEach((crypto) => {
    cryptoTracker.innerHTML += `
    <div class="holdingWrapper" id="holdingWrapper${crypto.id}">
    <img class="holdingicon cryptoicon" id="${crypto.name}icon" src="${
      crypto.image
    }" />
    <div
      class="holdingProgressBarContainer cryptoProgressBarContainer"
      id="${crypto.name}ProgressBarContainer"
    >
      <span class="HoldingProgressBar" id="${
        crypto.name
      }ProgressBar">${calculate_percentage(
      crypto.obtained,
      crypto.goal
    )}%</span>
    </div>

    <button class = "editButton" onclick = toggleModal("${
      crypto.name
    }")><img class = "editicon" src = "Images/editicon.png"></img></button>
  
  </div>`;

    modalSpace.innerHTML += `<div class = "modal" id = "${crypto.name}modal">

      <div><button class = "closeButton" onclick = toggleModal("${crypto.name}")><img class = "closeImg" src= "Images/close.png"> </button>
      </div>

      <div class = "modalSpace"> 

        <div class = "modalContent">
          <div class = "form"> 
            <form>
              <input type = "number" placeholder = "Update Current Value" id = "${crypto.name}_invest_enter"/>
              <input type = "number" placeholder = "Update Goal" id = "${crypto.name}_goal_enter"/>
            </form> 
          </div>
          <div class = "currentData"> 
            <div class = "currentDataNum"> Current: ${crypto.obtained}</div>
            <div class = "currentDataNum"> Goal: ${crypto.goal}</div>
          </div>

        </div>  
        <button class = "submitButton" onclick = editNewValues_crypto("${crypto.name}")>Submit</button> 
      </div>

     </div>`;

    let percentage_bar = document.querySelector(`#${crypto.name}ProgressBar`);
    percentage_bar.style.width = `${calculate_percentage(
      crypto.obtained,
      crypto.goal
    )}%`;
  });
};

//Crypto Section

let crypto_data1 = [
  {
    name: "USDC",
    id: 1,
    image: "Images/usdcicon.png",
    obtained: 2500,
    goal: 12000,
  },
  {
    name: "DAI",
    id: 2,
    image: "Images/daiIcon.png",
    obtained: 0,
    goal: 12000,
  },
  {
    name: "PAX",
    id: 3,
    image: "Images/paxIcon.png",
    obtained: 0,
    goal: 12000,
  },
];

if (JSON.parse(localStorage.getItem("crypto_data")) === null) {
  localStorage.setItem("crypto_data", JSON.stringify(crypto_data1));
}

let crypto_data = JSON.parse(localStorage.getItem("crypto_data"));

populate_dashboard_stock(stock_data);

populate_dashboard_crypto(crypto_data);
