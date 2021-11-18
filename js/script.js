const userNameInput = document.getElementById('name'); 
const userEmailInput = document.getElementById('email'); 
const jobRollInput = document.getElementById('title'); 
const otherJobInput = document.querySelector('.other-job-role') 
const colorInput = document.getElementById('color'); 
const designInput = document.getElementById('design'); 
const checkboxes = document.querySelectorAll('input[type=checkbox]'); 
const form = document.querySelector('form'); 
const creditCardNumberInput = document.getElementById('cc-num'); 
const zipCodeInput = document.getElementById('zip'); 
const cvvInput = document.getElementById('cvv'); 
const activitiesField = document.getElementById('activities'); 
const paymentInfoDiv = document.querySelector('.payment-methods'); 

userNameInput.focus();//When page loads the cursor will be in the name input field
otherJobInput.style.display = 'none'; //When page loads it automaticly hides otherJobInput 'text area'
colorInput.disabled = true; //When page is load it disables color from being selected

// This event listener will hide or display 'input text area' based of selected job role
jobRollInput.addEventListener('change', () => {
  if (jobRollInput.value == 'other') {
    otherJobInput.style.display = 'block';    
  } else {
    otherJobInput.style.display = 'none';
  }
});

// This event listener will wait for change in design drop down menu and only dislay color 
// options available based on design selected 
designInput.addEventListener ('change', (e) => {
  colorInput.disabled = false; //Enables color selection input
  const colorSelectionList = colorInput.children; //Gets HTML collection of color options
  for (let i = 0; i < colorSelectionList.length; i++){
    const designValue = e.target.value; //Gets the value of the design input selected
    const attribute = colorSelectionList[i].getAttribute('data-theme'); // Gets attribute value of each color
    //This loop tests if the design value picked matchs the attribute 'data-theme' 
    if (designValue == attribute) {
      colorSelectionList[4].selected = true;
      colorSelectionList[i].hidden = false; 
      colorSelectionList[i].removeAttribute('selected'); 
    } else {
      colorSelectionList[1].selected = true;
      colorSelectionList[i].hidden = true;
      colorSelectionList[i].removeAttribute('selected');   
    } 
  }
});

// Variables for activitiesDiv event listener
const activitiesDiv = document.getElementById('activities-box');
const totalHtml = document.getElementById('activities-cost'); 
let totalCost = 0;

// This adds or subtracts from the totalCost variable based of what checkboxes are checked
// It uses the e.target data-cost attribute to add or subract from the totalCost variable
// Then updates the totalHtml with the totalCost variable
activitiesDiv.addEventListener('change', (e) => {
  const dataCost = parseInt(e.target.getAttribute('data-cost'))
  if (e.target.checked) {
    totalCost += dataCost;
  } else {
    totalCost -= dataCost;
  }
  totalHtml.innerHTML = `Total: ${totalCost}`  
});

// Payment Info
const userPayment = document.getElementById('payment');
const creditcardDiv = document.getElementById('credit-card'); 
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');
const paymentOptionsList = userPayment.children //HTML Collection of payment options

paymentOptionsList[1].selected = true;  //Credit Card is selected by default 
paypalDiv.hidden = true; //Paypal information hidden by default
bitcoinDiv.hidden = true; //Bitcoin information hidden by default

// When the user changes payment method this will show relevent payment information 
// and hide payment information not relevent
userPayment.addEventListener ('change', (e) =>{
  if (bitcoinDiv.id == e.target.value){
    bitcoinDiv.hidden = false;
    paypalDiv.hidden = true;
    creditcardDiv.hidden = true;
    paymentInfoDiv.classList.add('valid');
    paymentInfoDiv.classList.remove('not-valid');
    } else if (paypalDiv.id == e.target.value){
    bitcoinDiv.hidden = true;
    paypalDiv.hidden = false;
    creditcardDiv.hidden = true;
    paymentInfoDiv.classList.remove('not-valid');
    paymentInfoDiv.classList.add('valid');
    } else if (creditcardDiv.id == e.target.value){
    paymentInfoDiv.classList.remove('valid')
    bitcoinDiv.hidden = true;
    paypalDiv.hidden = true;
    creditcardDiv.hidden = false;
    } 
});

//Functions 

//Tests name value against the regex, returns true or false
function isNameValid (name) {
  const regex = /\S+/;
  return regex.test(name.value)
}

//Tests email value against the regex, returns true or false
function isEmailValid (email) {
  const regex = /^\w+[@]\w+\.(com)$/;
  return regex.test(email.value);
}

//Loops through the HTML Collection of checkboxes
//Returns true if any checkboxes are checked
//Returns false if no checkboxes are checked
function isActivitiesValid () {
   for (let i = 0; i < checkboxes.length; i++) {
     if (checkboxes[i].checked) {
       return true;  
     }
   }
   return false;
}

//Tests cardNumber against the regex, returns true or false
function isCreditCardNumberValid (cardNumber) {
  const regex = /^[0-9]{13,16}$/;
  return regex.test(cardNumber.value);
}

//Tests zipCode value against the regex, returns true or false
function isZipCodeValid (zipCode) {
   const regex = /^[0-9]{5}$/;
   return regex.test(zipCode.value);
}

//Tests cvv value against the regex, returns true or false
function isCvvValid (cvv) {
  const regex = /^[0-9]{3}$/;
  return regex.test(cvv.value);
}

//Loops through the HTML Collection of expiration dates
//Returns true if a expiration date is selected
//Returns false if no expiration date is selected
function isExpirationDate (){
  const expiration = document.getElementById('exp-month')
  const expirationList = expiration.children;
  for (let i = 1; i < expirationList.length; i++){
    if (expirationList[i].selected){
      return true
    }
  }
  return false;
}

//Loops through the HTML Collection of expiration year
//Returns true if a expiration year is selected
//Returns false if no expiration year is selected
function isExpirationYear (){
  const year = document.getElementById('exp-year')
  const yearList = year.children;
  for (let i = 1; i < yearList.length; i++){
    if (yearList[i].selected){
      return true
    }
  }
  return false;
}

// Form submit event
// Will submit the form it all the input values are true
// If any input values are false it will add color/error messages to the user
form.addEventListener('submit', (e) => {
  
  if (isNameValid(userNameInput)) {
    userNameInput.parentElement.classList.remove('not-valid');
    userNameInput.parentElement.className = 'valid';
    userNameInput.parentElement.lastElementChild.style.display = 'none';  
  } else {
    userNameInput.parentElement.className = 'not-valid';
    userNameInput.parentElement.classList.remove('valid');
    userNameInput.parentElement.lastElementChild.style.display = 'block';
    e.preventDefault();
  }
  if (isEmailValid(userEmailInput)) {
    userEmailInput.parentElement.classList.remove('not-valid');
    userEmailInput.parentElement.className = 'valid';
    userEmailInput.parentElement.lastElementChild.style.display = 'none';
  } else {
    userEmailInput.parentElement.classList.remove('valid');
    userEmailInput.parentElement.className = 'not-valid';
    userEmailInput.parentElement.lastElementChild.style.display = 'block';
    e.preventDefault();
  } 
  if (isActivitiesValid()) {
    activitiesField.classList.remove('not-valid');
    activitiesField.classList.add('valid')
  } else {
    activitiesField.classList.remove('valid');
    activitiesField.classList.add('not-valid');
    e.preventDefault();
  }
  if (paymentOptionsList[1].selected == true) {
    if (isCreditCardNumberValid(creditCardNumberInput)
      && isZipCodeValid(zipCodeInput)
      && isCvvValid(cvvInput)
      && isExpirationDate()
      && isExpirationYear()){
      paymentInfoDiv.classList.add('valid');
      paymentInfoDiv.classList.remove('not-valid');
      } else {
      paymentInfoDiv.classList.remove('valid');
      paymentInfoDiv.classList.add('not-valid');
      e.preventDefault();
    }
  }
});

// When a checkbox element is focused it gives it the class focus to help the user understand what is selected
for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('focus', (e) => {
  e.target.parentElement.className = 'focus';
  });
  checkboxes[i].addEventListener('blur', (e) => {
  e.target.parentElement.classList.remove('focus');
  });
}























