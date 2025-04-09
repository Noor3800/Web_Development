document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

  
    document.getElementById('fullName').addEventListener('blur', validateName);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('phone').addEventListener('blur', validatePhone);
    document.getElementById('address').addEventListener('blur', validateAddress);
    document.getElementById('cardNumber').addEventListener('blur', validateCard);
    document.getElementById('expiry').addEventListener('blur', validateExpiry);
    document.getElementById('cvv').addEventListener('blur', validateCVV);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isAddressValid = validateAddress();
        const isCardValid = validateCard();
        const isExpiryValid = validateExpiry();
        const isCVVValid = validateCVV();

        if (isNameValid && isEmailValid && isPhoneValid && isAddressValid && 
            isCardValid && isExpiryValid && isCVVValid) {
            
            alert('Order placed successfully! Thank you for your purchase.');
            form.reset();
        }
    });

    function validateName() {
        const nameInput = document.getElementById('fullName');
        const errorElement = document.getElementById('nameError');
        const nameValue = nameInput.value.trim();
        
        if (!nameInput.checkValidity()) {
            if (nameInput.validity.valueMissing) {
                errorElement.textContent = 'Full name is required';
            } else if (nameInput.validity.patternMismatch) {
                errorElement.textContent = 'Name can only contain letters and spaces';
            }
            errorElement.style.display = 'block';
            return false;
        } else {
            errorElement.style.display = 'none';
            return true;
        }
    }

    function validateEmail() {
        const emailInput = document.getElementById('email');
        const errorElement = document.getElementById('emailError');
        const emailValue = emailInput.value.trim();
        
        if (!emailInput.checkValidity()) {
            if (emailInput.validity.valueMissing) {
                errorElement.textContent = 'Email is required';
            } else if (emailInput.validity.typeMismatch) {
                errorElement.textContent = 'Please enter a valid email address';
            }
            errorElement.style.display = 'block';
            return false;
        } else {
            errorElement.style.display = 'none';
            return true;
        }
    }

    function validatePhone() {
        const phoneInput = document.getElementById('phone');
        const errorElement = document.getElementById('phoneError');
        const phoneValue = phoneInput.value.trim();
        
        if (!phoneInput.checkValidity()) {
            if (phoneInput.validity.valueMissing) {
                errorElement.textContent = 'Phone number is required';
            } else if (phoneInput.validity.patternMismatch) {
                errorElement.textContent = 'Phone number must contain 10-15 digits';
            }
            errorElement.style.display = 'block';
            return false;
        } else {
            errorElement.style.display = 'none';
            return true;
        }
    }

    function validateAddress() {
        const addressInput = document.getElementById('address');
        const errorElement = document.getElementById('addressError');
        const addressValue = addressInput.value.trim();
        
        if (!addressInput.checkValidity()) {
            errorElement.textContent = 'Address is required';
            errorElement.style.display = 'block';
            return false;
        } else {
            errorElement.style.display = 'none';
            return true;
        }
    }

    function validateCard() {
        const cardInput = document.getElementById('cardNumber');
        const errorElement = document.getElementById('cardError');
        const cardValue = cardInput.value.trim();
        
        if (!cardInput.checkValidity()) {
            if (cardInput.validity.valueMissing) {
                errorElement.textContent = 'Credit card number is required';
            } else if (cardInput.validity.patternMismatch) {
                errorElement.textContent = 'Card number must be 16 digits';
            }
            errorElement.style.display = 'block';
            return false;
        } else {
            errorElement.style.display = 'none';
            return true;
        }
    }

    function validateExpiry() {
        const expiryInput = document.getElementById('expiry');
        const errorElement = document.getElementById('expiryError');
        const expiryValue = expiryInput.value;
        
        if (!expiryInput.checkValidity()) {
            errorElement.textContent = 'Expiry date is required';
            errorElement.style.display = 'block';
            return false;
        } else {
            const [year, month] = expiryValue.split('-').map(Number);
            
         
            if (year < currentYear || (year === currentYear && month < currentMonth)) {
                errorElement.textContent = 'Expiry date must be in the future';
                errorElement.style.display = 'block';
                return false;
            }
            
            errorElement.style.display = 'none';
            return true;
        }
    }

    function validateCVV() {
        const cvvInput = document.getElementById('cvv');
        const errorElement = document.getElementById('cvvError');
        const cvvValue = cvvInput.value.trim();
        
        if (!cvvInput.checkValidity()) {
            if (cvvInput.validity.valueMissing) {
                errorElement.textContent = 'CVV is required';
            } else if (cvvInput.validity.patternMismatch) {
                errorElement.textContent = 'CVV must be exactly 3 digits';
            }
            errorElement.style.display = 'block';
            return false;
        } else {
            errorElement.style.display = 'none';
            return true;
        }
    }
});




