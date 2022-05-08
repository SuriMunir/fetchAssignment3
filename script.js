let url =
  'https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=100';

document.body.innerHTML = `<div class="heading">
      <img
        src="https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg"
        alt="cat-icon"
        class="icon"
      />
      <h1>Cat Facts</h1>
    </div>
    <div class="container mt-5 btn-container">
    <button class="btn btn-primary" id="fetchBtn">Get Cat Facts</button>
    </div>
    <div class="container mt-5" id="main"></div>`;

const fetchDataBtn = document.querySelector('#fetchBtn');
const displayContainer = document.querySelector('#main');

fetchDataBtn.addEventListener('click', getData);

async function getData() {
  try {
    displayContainer.innerHTML = '<h2>Fetching Data ...</h2>';
    //fetch data
    let response = await fetch(url);
    //convert to json
    let data = await response.json();
    //data is not good so only showing verified data
    let verifiedData = data.filter((ele) => {
      return ele.status.verified == true;
    });
    displayData(verifiedData);
  } catch (error) {
    console.log(error);
  }
}

function displayData(array) {
  let resultData = array
    .map((ele) => {
      return `<div class="card card-shadow col-md-3 p-0">
      <div class="card-header"><h5 class="card-title m-0">Cat Fact</h5></div>
        <div class="card-body">          
          <p class="card-text">
            ${ele.text}
          </p>
        </div>
      </div>
      `;
    })
    .join('');
  displayContainer.innerHTML = resultData;
}
