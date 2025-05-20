$(document).ready(function() {
    // Set active navigation
    const currentPage = location.pathname.split("/").pop();
    $('.nav-link').each(function() {
        if ($(this).attr('href') === currentPage) {
            $(this).addClass('active');
        }
    });

    // Navbar scroll behavior
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Smooth scroll for anchor links
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && 
            location.hostname === this.hostname) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 1000);
            }
        }
    });

    // Mobile menu toggle
    $('.navbar-toggler').click(function() {
        $('.navbar-collapse').toggleClass('show');
    });

    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });
    
    $('.back-to-top').click(function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800);
    });

    // Form validation
    $('.contact-form').submit(function(e) {
        e.preventDefault();
        
        const name = $('#name').val();
        const email = $('#email').val();
        const message = $('#message').val();
        
        if (name === '' || email === '' || message === '') {
            showAlert('Please fill in all required fields', 'danger');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email address', 'danger');
            return;
        }

        // In a real implementation, you would submit the form here
        // For demo purposes, we'll show a success message
        showAlert('Your message has been sent successfully!', 'success');
        this.reset();
    });

    function showAlert(message, type) {
        const alert = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        
        $('.contact-form').before(alert);
        
        setTimeout(function() {
            $('.alert').alert('close');
        }, 5000);
    }
});