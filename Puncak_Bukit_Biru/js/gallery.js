$(document).ready(function() {
    // Gallery filtering
    $('.filter-btn').click(function() {
        const value = $(this).attr('data-filter');
        
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        if (value === 'all') {
            $('.gallery-item').show('1000');
        } else {
            $('.gallery-item').not('.' + value).hide('1000');
            $('.gallery-item').filter('.' + value).show('1000');
        }
    });

    // Lightbox functionality
    $('.gallery-item').click(function() {
        const imgSrc = $(this).find('img').attr('src');
        const imgTitle = $(this).find('.gallery-title').text();
        const imgCategory = $(this).find('.gallery-category').text();
        
        const lightboxHtml = `
            <div class="lightbox">
                <div class="lightbox-content">
                    <span class="lightbox-close"><i class="fas fa-times"></i></span>
                    <img src="${imgSrc}" alt="${imgTitle}" class="lightbox-img">
                    <div class="lightbox-caption">
                        <h3>${imgTitle}</h3>
                        <p>${imgCategory}</p>
                    </div>
                </div>
            </div>
        `;
        
        $('body').append(lightboxHtml);
        
        setTimeout(function() {
            $('.lightbox').addClass('active');
        }, 50);
        
        $('.lightbox-close, .lightbox').on('click', function(e) {
            if (e.target !== this && !$(e.target).hasClass('lightbox-close') && !$(e.target).hasClass('fa-times')) return;
            
            $('.lightbox').removeClass('active');
            
            setTimeout(function() {
                $('.lightbox').remove();
            }, 300);
        });
    });

    // Load more gallery items
    let currentItems = 9;
    const galleryItems = $('.gallery-item');
    
    if (galleryItems.length > currentItems) {
        galleryItems.slice(currentItems).hide();
    }
    
    $('#load-more').on('click', function() {
        const totalItems = galleryItems.length;
        
        galleryItems.slice(currentItems, currentItems + 6).fadeIn(1000);
        currentItems += 6;
        
        if (currentItems >= totalItems) {
            $(this).hide();
        }
    });
});