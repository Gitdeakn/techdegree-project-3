const userName = document.getElementById('name'); //Selects text area for name
const otherJobInput = document.querySelector('.other-job-role') //Selects text area for other job role
const jobRoll = document.getElementById('title'); //
const color = document.getElementById('color');
const design = document.getElementById('design')


userName.focus();//When page loads name input is automaticly selected
otherJobInput.style.display = 'none'; //Hides otherJobInput 'text area'
color.disabled = true;

// This event listener will hide or display 'input text area' based of selected job role
jobRoll.addEventListener('change', () => {
  if (jobRoll.value == 'other') {
    otherJobInput.style.display = 'block';    
  } else {
    otherJobInput.style.display = 'none';
  }
});

design.addEventListener ('change', (e) => {
  color.disabled = false;
  const colorSelectionList = color.children;
  for (let i = 0; i < colorSelectionList.length; i++){
    const eventValue = e.target.value;
    const attribute = colorSelectionList[i].getAttribute('data-theme');
    if (eventValue == attribute) {
      colorSelectionList[i].hidden = false;
      colorSelectionList[i].setAttribute('selected', true);
      colorSelectionList[0].selected = true;
    } else {
      colorSelectionList[i].hidden = true;
      colorSelectionList[i].setAttribute('selected', false); 
      colorSelectionList[0].selected = true;
    } 
  }
});

const activitiesElement = document.getElementById('activities-box');
const totalElement = document.getElementById('activities-cost'); 
let totalCost = 0;
activitiesElement.addEventListener('change', (e) => {
  const dataCost = parseInt(e.target.getAttribute('data-cost'))
  if (e.target.checked) {
    totalCost += dataCost;
  } else {
    totalCost -= dataCost;
  }
  console.log(totalCost);
  totalElement.innerHTML = `Total: ${totalCost}`
});


const userPayment = document.getElementById('payment');
const paymentOptionsList = userPayment.children
paymentOptionsList[1].selected = true;
const creditcardDiv = document.getElementById('credit-card');
const paypalDiv = document.getElementById('paypal');
paypalDiv.hidden = true;
const bitcoinDiv = document.getElementById('bitcoin');
bitcoinDiv.hidden = true;


userPayment.addEventListener ('change', (e) =>{
  if (bitcoinDiv.id == e.target.value){
    bitcoinDiv.hidden = false;
    paypalDiv.hidden = true;
    creditcardDiv.hidden = true;
    } else if (paypalDiv.id == e.target.value){
    bitcoinDiv.hidden = true;
    paypalDiv.hidden = false;
    creditcardDiv.hidden = true;
    } else if (creditcardDiv.id == e.target.value){
    bitcoinDiv.hidden = true;
    paypalDiv.hidden = true;
    creditcardDiv.hidden = false;
    } 
});






















