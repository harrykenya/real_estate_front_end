let apiUrl="http://localhost:3000"

function loadpageData(){
  function listsRealtor(){
    const realtorContainerElementId = document.getElementById("feature_realtors");
    fetchRealtor()
    .then((realtors) => { 
      document.getElementById("loader").style.display = "none"; //before displaying the realtors the loader to first display then display the images
      console.log(realtors['realtor'].length)
      // Check if we have any realtors.
      if(realtors["realtor"].length > 0 ){
        // For each realtor, display a realtor card
        realtors['realtor'].forEach((realtor) => {
          realtorContainerElementId.appendChild(realtorCard(realtor));
        });
      } else {
        realtorContainerElementId.innerText = "No realtors found.";
      }
    })
    .catch((e) => {
      console.log(e);
    });    
  }
  listsRealtor();
}

document.addEventListener('DOMContentLoaded', loadpageData);

async function fetchRealtor(){
  try{
    const response = await fetch(`${apiUrl}/realtors`);
    if (!response.ok){
      throw new Error(`Failed to fech posts: ${response.status}`);
    }
    return await response.json();
  }catch(e){
    console.log(e);
  }
}

function realtorCard(realtor){
  console.log(realtor);
  const realtorCard = document.createElement('div'); //creating the realtor card
  realtorCard.classList.add('realtor_card');
  realtorCard.classList.add('col-md-6');
  realtorCard.classList.add('col-lg-4');
  realtorCard.classList.add('mb-4');
  realtorCard.innerHTML = `
  <div class="card realtor-preview">
      <img class="card-img-top" src="${realtor.realtorImage}" alt="${realtor.name}">
      <div class="card-body">
        <hr>
        <div class="row py-2 text-secondary">
          <div class="col-6">
              <p>${realtor.name}<p></div>
          <div class="col-6">
            <p>${realtor.email}<p></div>
        </div>
        <hr>
        <a href="index.html" class="btn btn-primary btn-block">view realtor</a>
      </div>
  </div>
  `;
  return realtorCard;
}

window.onunload = function(){
  document.removeEventListener('DOMContentLoaded', loadpageData);
}

