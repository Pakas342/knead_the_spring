// Wait for the DOM to be fully loaded
const delay = ms => new Promise(res => setTimeout(res, ms));
document.addEventListener('DOMContentLoaded', function() {
    // Get the form and create references to inputs
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    // Create a div for displaying messages
    const messageDiv = document.createElement('div');
    messageDiv.style.padding = '1rem';
    messageDiv.style.marginBottom = '1rem';
    messageDiv.style.borderRadius = '0.125rem';
    messageDiv.style.display = 'none';
    form.insertBefore(messageDiv, form.firstChild);

    // Function to show message
    function showMessage(message, isError = false) {
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        messageDiv.style.backgroundColor = isError ? '#FEE2E2' : '#DCFCE7';
        messageDiv.style.color = isError ? '#991B1B' : '#166534';
        messageDiv.style.border = `1px solid ${isError ? '#FCA5A5' : '#86EFAC'}`;
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }

    // Input validation functions
    function validateName(name) {
        return name.trim().length >= 2;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) {
        // Remove any non-digit characters
        const cleanPhone = phone.replace(/\D/g, '');
        // Check if the cleaned phone number is between 10 and 15 digits
        return cleanPhone.length >= 10 && cleanPhone.length <= 12;
    }

    function validateMessage(message) {
        return message.trim().length >= 10;
    }

    // Phone number formatting
    phoneInput.addEventListener('input', (e) => {
        // Remove any non-digit characters
        let cleaned = e.target.value.replace(/\D/g, '');
        // Limit to 11 digits
        cleaned = cleaned.substring(0, 11);
        // Format the number as user types
        let formatted = '';
        if (cleaned.length > 0) {
            formatted = cleaned.substring(0, 4);
            if (cleaned.length > 4) {
                formatted += ` ${cleaned.substring(4, 7)}`;
            }
            if (cleaned.length > 7) {
                formatted += ` ${cleaned.substring(7)}`;
            }
        }
        e.target.value = formatted;
    });

    // Real-time validation
    nameInput.addEventListener('blur', () => {
        if (!validateName(nameInput.value)) {
            nameInput.style.borderColor = '#EF4444';
            showMessage('Name must be at least 2 characters long', true);
        } else {
            nameInput.style.borderColor = '#D1D5DB';
        }
    });

    emailInput.addEventListener('blur', () => {
        if (!validateEmail(emailInput.value)) {
            emailInput.style.borderColor = '#EF4444';
            showMessage('Please enter a valid email address', true);
        } else {
            emailInput.style.borderColor = '#D1D5DB';
        }
    });

    phoneInput.addEventListener('blur', () => {
        if (!validatePhone(phoneInput.value)) {
            phoneInput.style.borderColor = '#EF4444';
            showMessage('Please enter a valid phone number', true);
        } else {
            phoneInput.style.borderColor = '#D1D5DB';
        }
    });

    messageInput.addEventListener('blur', () => {
        if (!validateMessage(messageInput.value)) {
            messageInput.style.borderColor = '#EF4444';
            showMessage('Message must be at least 10 characters long', true);
        } else {
            messageInput.style.borderColor = '#D1D5DB';
        }
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate all fields
        if (!validateName(nameInput.value) ||
            !validateEmail(emailInput.value) ||
            !validatePhone(phoneInput.value) ||
            !validateMessage(messageInput.value)) {
            showMessage('Please fill in all fields correctly', true);
            return;
        }

        // Disable submit button and show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            // Prepare form data
            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value.replace(/\D/g, ''), // Send clean phone number
                message: messageInput.value
            };

            // Send to webhook
            const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:RzUxkAYO/enquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Show success message
            showMessage('Thank you! Your message has been sent successfully.');
            
            // Reset form
            form.reset();

        } catch (error) {
            showMessage('Sorry, there was an error sending your message. Please try again.', true);
        } finally {
            // Re-enable submit button
            await delay(2000)
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            window.location.href = '/'
        }
    });
});