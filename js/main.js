document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('emailForm');
    const emailInput = document.getElementById('email');

    // Form validation
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Get the email value
        const email = emailInput.value.trim();
        const button = form.querySelector('button');
        
        // Disable button and show loading state
        button.disabled = true;
        button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';

        // Send email to backend
        fetch('backend/send_email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Show success message
                button.innerHTML = '<i class="fas fa-check"></i> Success!';
                
                // Redirect to ClickBank after a short delay
                setTimeout(() => {
                    // Replace this URL with your actual ClickBank product URL
                    const clickbankUrl = 'YOUR_CLICKBANK_PRODUCT_URL';
                    window.location.href = clickbankUrl;
                }, 1500);
            } else {
                // Show error message
                button.disabled = false;
                button.innerHTML = 'Try Again <i class="fas fa-arrow-right ms-2"></i>';
                alert('Failed to process your request. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            button.disabled = false;
            button.innerHTML = 'Try Again <i class="fas fa-arrow-right ms-2"></i>';
            alert('An error occurred. Please try again.');
        });
    });

    // Real-time email validation
    emailInput.addEventListener('input', function() {
        if (this.validity.valid) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
        } else {
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
        }
    });
}); 