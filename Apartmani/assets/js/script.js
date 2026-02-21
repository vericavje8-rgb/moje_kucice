// Enhanced Luxury Apartment Website JavaScript with premium responsive interactions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializePremiumScrollEffects();
    initializeApartmentFilters();
    initializeBookingForm();
    initializeContactForm();
    initializeModal();
    initializeCalendar();
    initializeAnimations();
    initializeDateValidation();
    initializeFormValidation();
    initializePriceCalculator();
    initializeLuxuryInteractions();
    initializeResponsiveFeatures();
    initializeTouchEnhancements();
});

// Premium navigation with scroll effects
function initializePremiumScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let ticking = false;

    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling changes
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
}

// Navigation functionality with responsive enhancements
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open on mobile
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        // Close mobile menu on window resize if open
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Apartment filtering functionality
function initializeApartmentFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const apartmentCards = document.querySelectorAll('.apartment-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter apartments with animation
            apartmentCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Booking form functionality
function initializeBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    const apartmentSelect = document.getElementById('apartmentChoice');
    const checkInInput = document.getElementById('checkInDate');
    const checkOutInput = document.getElementById('checkOutDate');
    const guestsSelect = document.getElementById('guests');
    const bookingSummary = document.getElementById('bookingSummary');

    // Apartment pricing data
    const apartmentPrices = {
        '1bed1': { name: 'Modern 1 Bedroom', price: 120 },
        '2bed1': { name: 'Spacious Family Apartment', price: 180 },
        '3bed1': { name: 'Luxury Penthouse', price: 250 }
    };

    // Update booking summary when form changes
    function updateBookingSummary() {
        const apartment = apartmentSelect.value;
        const checkIn = checkInInput.value;
        const checkOut = checkOutInput.value;
        const guests = guestsSelect.value;

        if (apartment && checkIn && checkOut) {
            const apartmentData = apartmentPrices[apartment];
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
            const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

            if (nights > 0) {
                const subtotal = nights * apartmentData.price;
                const tax = subtotal * 0.12; // 12% tax
                const total = subtotal + tax;

                bookingSummary.style.display = 'block';
                bookingSummary.querySelector('.summary-details').innerHTML = `
                    <div class="summary-row">
                        <span><strong>Apartment:</strong></span>
                        <span>${apartmentData.name}</span>
                    </div>
                    <div class="summary-row">
                        <span><strong>Check-in:</strong></span>
                        <span>${formatDate(checkInDate)}</span>
                    </div>
                    <div class="summary-row">
                        <span><strong>Check-out:</strong></span>
                        <span>${formatDate(checkOutDate)}</span>
                    </div>
                    <div class="summary-row">
                        <span><strong>Nights:</strong></span>
                        <span>${nights}</span>
                    </div>
                    <div class="summary-row">
                        <span><strong>Guests:</strong></span>
                        <span>${guests}</span>
                    </div>
                    <hr style="margin: 1rem 0; border: 1px solid var(--secondary-color);">
                    <div class="summary-row">
                        <span>Subtotal (${nights} × $${apartmentData.price}):</span>
                        <span>$${subtotal.toFixed(2)}</span>
                    </div>
                    <div class="summary-row">
                        <span>Taxes & Fees:</span>
                        <span>$${tax.toFixed(2)}</span>
                    </div>
                    <div class="summary-row total">
                        <span><strong>Total:</strong></span>
                        <span><strong>$${total.toFixed(2)}</strong></span>
                    </div>
                `;
            }
        } else {
            bookingSummary.style.display = 'none';
        }
    }

    // Add event listeners for real-time updates
    [apartmentSelect, checkInInput, checkOutInput, guestsSelect].forEach(element => {
        if (element) {
            element.addEventListener('change', updateBookingSummary);
        }
    });

    // Handle booking form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');

            // Simulate booking process
            setTimeout(() => {
                showSuccessMessage('Reservation request submitted successfully! Our concierge team will contact you shortly to confirm your luxury accommodation.');
                bookingForm.reset();
                bookingSummary.style.display = 'none';
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }, 2000);
        });
    }

    // Handle quick booking from apartment cards
    document.querySelectorAll('.book-now').forEach(button => {
        button.addEventListener('click', function() {
            const apartmentId = this.getAttribute('data-apartment');
            
            // Scroll to booking section
            document.getElementById('booking').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            // Pre-select apartment
            setTimeout(() => {
                apartmentSelect.value = apartmentId;
                updateBookingSummary();
            }, 500);
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Add loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            // Simulate form submission
            setTimeout(() => {
                showSuccessMessage('Thank you for your inquiry! Our dedicated team will respond within 24 hours to assist with your luxury accommodation needs.');
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }, 1500);
        });
    }
}

// Modal functionality for apartment details
function initializeModal() {
    const modal = document.getElementById('apartmentModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.modal-close');
    const viewDetailsButtons = document.querySelectorAll('.view-details');

    // Apartment details data
    const apartmentDetails = {
        '1bed1': {
            name: 'Modern 1 Bedroom',
            price: 120,
            images: [
                'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1616137466211-f939a420be84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            description: 'Spacious one-bedroom apartment with separate living area and private balcony. Ideal for business travelers or couples seeking extra comfort and space during their stay.',
            amenities: ['High-Speed WiFi', 'Full Kitchen', 'Private Balcony', 'Washer/Dryer', 'Smart TV', 'Work Desk', 'Free Parking'],
            location: 'City Center - Close to business district and public transportation'
        },
        '2bed1': {
            name: 'Spacious Family Apartment',
            price: 180,
            images: [
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            description: 'Perfect for families or groups, featuring two comfortable bedrooms, spacious living area, and fully equipped kitchen. Located in a quiet residential area with easy access to parks and attractions.',
            amenities: ['High-Speed WiFi', 'Full Kitchen', 'Two Bathrooms', 'Washer/Dryer', 'Smart TV', 'Dining Area', 'Free Parking', 'Games & Books'],
            location: 'Riverside District - Family-friendly area with parks and recreational facilities nearby'
        },
        '3bed1': {
            name: 'Luxury Penthouse',
            price: 250,
            images: [
                'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            description: 'Ultimate luxury experience with panoramic city views, premium furnishings, and top-tier amenities. This penthouse apartment offers unparalleled comfort and sophistication for discerning guests.',
            amenities: ['High-Speed WiFi', 'Gourmet Kitchen', 'City Views', 'Premium Furnishings', 'Concierge Service', 'Rooftop Access', 'Valet Parking', 'Premium Linens'],
            location: 'Premium District - Exclusive area with fine dining, luxury shopping, and cultural attractions'
        }
    };

    // Open modal with apartment details
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const apartmentId = this.getAttribute('data-apartment');
            const apartment = apartmentDetails[apartmentId];
            
            if (apartment) {
                modalContent.innerHTML = createApartmentDetailHTML(apartment);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Initialize image gallery
                initializeImageGallery();
            }
        });
    });

    // Close modal functionality
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Create apartment detail HTML
function createApartmentDetailHTML(apartment) {
    return `
        <div class="modal-header">
            <h2>${apartment.name}</h2>
            <div class="apartment-price-large">$${apartment.price}/night</div>
        </div>
        
        <div class="modal-image-gallery">
            <div class="main-image">
                <img src="${apartment.images[0]}" alt="${apartment.name}" id="mainImage">
            </div>
            <div class="thumbnail-gallery">
                ${apartment.images.map((img, index) => 
                    `<img src="${img}" alt="View ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}" 
                     onclick="changeMainImage('${img}', this)">`
                ).join('')}
            </div>
        </div>
        
        <div class="modal-details">
            <div class="detail-section">
                <h3>Description</h3>
                <p>${apartment.description}</p>
            </div>
            
            <div class="detail-section">
                <h3>Location</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${apartment.location}</p>
            </div>
            
            <div class="detail-section">
                <h3>Amenities</h3>
                <div class="amenities-list">
                    ${apartment.amenities.map(amenity => 
                        `<span class="amenity-tag"><i class="fas fa-check"></i> ${amenity}</span>`
                    ).join('')}
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn btn-primary btn-large" onclick="bookApartment('${apartment.name}')">
                    Book This Apartment
                </button>
                <button class="btn btn-outline" onclick="getVirtualTour()">
                    <i class="fas fa-eye"></i> Virtual Tour
                </button>
            </div>
        </div>
        
        <style>
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                border-bottom: 2px solid var(--secondary-color);
                padding-bottom: 1rem;
            }
            
            .apartment-price-large {
                font-size: 1.5rem;
                font-weight: bold;
                color: var(--primary-color);
            }
            
            .modal-image-gallery {
                margin-bottom: 2rem;
            }
            
            .main-image {
                margin-bottom: 1rem;
            }
            
            .main-image img {
                width: 100%;
                height: 400px;
                object-fit: cover;
                border-radius: var(--border-radius);
            }
            
            .thumbnail-gallery {
                display: flex;
                gap: 1rem;
                overflow-x: auto;
                padding-bottom: 0.5rem;
            }
            
            .thumbnail {
                width: 120px;
                height: 80px;
                object-fit: cover;
                border-radius: 8px;
                cursor: pointer;
                opacity: 0.7;
                transition: var(--transition);
                flex-shrink: 0;
            }
            
            .thumbnail:hover,
            .thumbnail.active {
                opacity: 1;
                border: 3px solid var(--primary-color);
            }
            
            .detail-section {
                margin-bottom: 2rem;
            }
            
            .detail-section h3 {
                color: var(--primary-color);
                margin-bottom: 1rem;
            }
            
            .amenities-list {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .amenity-tag {
                background: var(--warm-cream);
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.9rem;
                color: var(--text-dark);
                font-weight: 500;
            }
            
            .amenity-tag i {
                color: var(--success-color);
                margin-right: 0.5rem;
            }
            
            .modal-actions {
                display: flex;
                gap: 1rem;
                margin-top: 2rem;
                flex-wrap: wrap;
            }
            
            .modal-actions .btn {
                flex: 1;
                min-width: 200px;
            }
        </style>
    `;
}

// Initialize image gallery in modal
function initializeImageGallery() {
    // Gallery functionality is handled inline in the HTML
}

// Change main image in gallery
function changeMainImage(imageSrc, thumbnail) {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainImage) {
        mainImage.src = imageSrc;
    }
    
    // Update active thumbnail
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    thumbnail.classList.add('active');
}

// Book apartment from modal
function bookApartment(apartmentName) {
    // Close modal
    const modal = document.getElementById('apartmentModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Scroll to booking section
    document.getElementById('booking').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
    
    // Find and select the apartment
    setTimeout(() => {
        const apartmentSelect = document.getElementById('apartmentChoice');
        const options = apartmentSelect.querySelectorAll('option');
        
        options.forEach(option => {
            if (option.textContent.includes(apartmentName.split(' ')[0])) {
                apartmentSelect.value = option.value;
                apartmentSelect.dispatchEvent(new Event('change'));
            }
        });
    }, 500);
}

// Virtual tour functionality
function getVirtualTour() {
    showSuccessMessage('Virtual tour feature coming soon! Contact us for a live video tour of the apartment.');
}

// Calendar functionality
function initializeCalendar() {
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const searchBtn = document.getElementById('searchAvailability');
    const calendarGrid = document.getElementById('calendarGrid');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    if (checkInInput) checkInInput.min = today;
    if (checkOutInput) checkOutInput.min = today;
    
    // Update check-out minimum when check-in changes
    if (checkInInput && checkOutInput) {
        checkInInput.addEventListener('change', function() {
            const checkInDate = new Date(this.value);
            checkInDate.setDate(checkInDate.getDate() + 1);
            checkOutInput.min = checkInDate.toISOString().split('T')[0];
            
            if (checkOutInput.value && new Date(checkOutInput.value) <= new Date(this.value)) {
                checkOutInput.value = '';
            }
        });
    }
    
    // Search availability
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const checkIn = checkInInput ? checkInInput.value : '';
            const checkOut = checkOutInput ? checkOutInput.value : '';
            
            if (!checkIn || !checkOut) {
                showErrorMessage('Please select both check-in and check-out dates.');
                return;
            }
            
            // Simulate availability search
            this.textContent = 'Searching...';
            this.disabled = true;
            
            setTimeout(() => {
                displayAvailabilityResults(checkIn, checkOut);
                this.textContent = 'Search';
                this.disabled = false;
            }, 1500);
        });
    }
}

// Display availability results
function displayAvailabilityResults(checkIn, checkOut) {
    const calendarGrid = document.getElementById('calendarGrid');
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
    
    const availabilityHTML = `
        <div class="availability-results">
            <h3>Available Apartments (${formatDate(checkInDate)} - ${formatDate(checkOutDate)})</h3>
            <p class="nights-info">${nights} nights</p>
            
            <div class="availability-grid">
                <div class="available-apartment">
                    <img src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=200&q=80" alt="1 Bedroom">
                    <div class="apartment-info">
                        <h4>Modern 1 Bedroom</h4>
                        <p class="price">$${120 * nights} total ($120/night)</p>
                        <button class="btn btn-primary btn-sm" onclick="bookFromCalendar('1bed1', '${checkIn}', '${checkOut}')">Book Now</button>
                    </div>
                </div>
                
                <div class="available-apartment">
                    <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&q=80" alt="2 Bedroom">
                    <div class="apartment-info">
                        <h4>Spacious Family Apartment</h4>
                        <p class="price">$${180 * nights} total ($180/night)</p>
                        <button class="btn btn-primary btn-sm" onclick="bookFromCalendar('2bed1', '${checkIn}', '${checkOut}')">Book Now</button>
                    </div>
                </div>
                
                <div class="available-apartment featured">
                    <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=200&q=80" alt="Penthouse">
                    <div class="apartment-info">
                        <h4>Luxury Penthouse</h4>
                        <p class="price">$${250 * nights} total ($250/night)</p>
                        <button class="btn btn-primary btn-sm" onclick="bookFromCalendar('3bed1', '${checkIn}', '${checkOut}')">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
            .availability-results h3 {
                color: var(--primary-color);
                margin-bottom: 0.5rem;
            }
            
            .nights-info {
                color: var(--text-light);
                margin-bottom: 2rem;
            }
            
            .availability-grid {
                display: grid;
                gap: 1rem;
            }
            
            .available-apartment {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: white;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-light);
                border: 2px solid transparent;
                transition: var(--transition);
            }
            
            .available-apartment:hover {
                border-color: var(--primary-color);
                transform: translateX(5px);
            }
            
            .available-apartment.featured {
                border-color: var(--warning-color);
                position: relative;
            }
            
            .available-apartment.featured::before {
                content: '★ Featured';
                position: absolute;
                top: -10px;
                right: 10px;
                background: var(--warning-color);
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: 10px;
                font-size: 0.8rem;
                font-weight: bold;
            }
            
            .available-apartment img {
                width: 80px;
                height: 60px;
                object-fit: cover;
                border-radius: 8px;
            }
            
            .apartment-info {
                flex: 1;
            }
            
            .apartment-info h4 {
                margin-bottom: 0.5rem;
                color: var(--text-dark);
            }
            
            .apartment-info .price {
                color: var(--primary-color);
                font-weight: 600;
                margin-bottom: 1rem;
            }
            
            .btn-sm {
                padding: 8px 16px;
                font-size: 0.9rem;
            }
        </style>
    `;
    
    calendarGrid.innerHTML = availabilityHTML;
}

// Book apartment from calendar
function bookFromCalendar(apartmentId, checkIn, checkOut) {
    // Scroll to booking form
    document.getElementById('booking').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
    
    // Pre-fill form
    setTimeout(() => {
        const apartmentSelect = document.getElementById('apartmentChoice');
        const checkInInput = document.getElementById('checkInDate');
        const checkOutInput = document.getElementById('checkOutDate');
        
        if (apartmentSelect) apartmentSelect.value = apartmentId;
        if (checkInInput) checkInInput.value = checkIn;
        if (checkOutInput) checkOutInput.value = checkOut;
        
        // Trigger change events
        [apartmentSelect, checkInInput, checkOutInput].forEach(element => {
            if (element) element.dispatchEvent(new Event('change'));
        });
    }, 500);
}

// Scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToObserve = document.querySelectorAll('.section-header, .apartment-card, .amenity-item, .stat-item');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// Date validation
function initializeDateValidation() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        input.min = today;
        
        input.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const todayDate = new Date(today);
            
            if (selectedDate < todayDate) {
                showErrorMessage('Please select a date from today onwards.');
                this.value = '';
            }
        });
    });
}

// Form validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    });
}

// Validate individual field
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Remove existing error states
    field.classList.remove('error');
    removeFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[\(\)\d\s\-]{10,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    // Date validation (check-out after check-in)
    if (field.name === 'checkOut') {
        const checkInField = document.querySelector('input[name="checkIn"]');
        if (checkInField && checkInField.value && value <= checkInField.value) {
            showFieldError(field, 'Check-out date must be after check-in date');
            return false;
        }
    }
    
    field.classList.add('success');
    return true;
}

// Price calculator
function initializePriceCalculator() {
    // This is already integrated into the booking form functionality
    // Additional enhancements can be added here if needed
}

// Utility functions
function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: var(--error-color);
            font-size: 0.85rem;
            margin-top: 0.5rem;
            display: block;
        `;
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function removeFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('error');
    removeFieldError(field);
    
    if (field.value.trim()) {
        setTimeout(() => validateField(event), 500); // Re-validate after typing stops
    }
}

function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message-popup');
    existingMessages.forEach(msg => msg.remove());
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message-popup ${type}-message`;
    messageElement.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        font-weight: 500;
        box-shadow: var(--shadow-medium);
        transform: translateX(400px);
        transition: var(--transition);
        max-width: 400px;
    `;
    
    if (type === 'success') {
        messageElement.style.backgroundColor = 'rgba(34, 139, 34, 0.1)';
        messageElement.style.color = 'var(--success-color)';
        messageElement.style.border = '1px solid var(--success-color)';
    } else {
        messageElement.style.backgroundColor = 'rgba(178, 34, 34, 0.1)';
        messageElement.style.color = 'var(--error-color)';
        messageElement.style.border = '1px solid var(--error-color)';
    }
    
    messageElement.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span style="margin-left: 0.5rem;">${message}</span>
    `;
    
    document.body.appendChild(messageElement);
    
    // Animate in
    setTimeout(() => {
        messageElement.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageElement.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 300);
    }, 5000);
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Luxury interactions and micro-animations
function initializeLuxuryInteractions() {
    // Add subtle parallax to hero image
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            heroImage.style.transform = `translateY(${parallax}px) scale(1.05)`;
        }, { passive: true });
    }

    // Enhanced apartment card interactions
    const apartmentCards = document.querySelectorAll('.apartment-card');
    apartmentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.setProperty('--card-scale', '1.02');
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.setProperty('--card-scale', '1');
        });
    });

    // Premium button ripple effects
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            if (!document.querySelector('#ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(2);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Smooth number counter animation for stats
    const stats = document.querySelectorAll('.stat-item h3');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text);
                
                if (!isNaN(number)) {
                    let current = 0;
                    const increment = number / 30;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            target.textContent = text;
                            clearInterval(timer);
                        } else {
                            target.textContent = Math.floor(current) + (text.includes('+') ? '+' : '');
                        }
                    }, 50);
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        if (stat.textContent.includes('3') || stat.textContent.includes('4.9') || stat.textContent.includes('500') || stat.textContent.includes('24')) {
            statsObserver.observe(stat);
        }
    });
}

// ==========================================================================
// APARTMENT DETAIL PAGES FUNCTIONALITY
// ==========================================================================

// Initialize apartment detail page features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery if on apartment detail page
    if (document.querySelector('.apartment-gallery')) {
        initializeGallery();
    }
    
    // Initialize booking form enhancements
    if (document.querySelector('.booking-form')) {
        initializeBookingEnhancements();
    }
    
    // Initialize navigation dropdown for mobile
    initializeDropdownNavigation();
});

// Gallery functionality for apartment detail pages
function initializeGallery() {
    const mainImage = document.getElementById('main-gallery-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (!mainImage || thumbnails.length === 0) return;
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image with smooth transition
            const newImageSrc = this.dataset.image;
            
            // Fade out
            mainImage.style.opacity = '0';
            mainImage.style.transform = 'scale(0.95)';
            
            // Wait for fade out, then change image
            setTimeout(() => {
                mainImage.src = newImageSrc;
                
                // Fade in with new image
                mainImage.style.opacity = '1';
                mainImage.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Add keyboard support
        thumbnail.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add arrow key navigation
    document.addEventListener('keydown', function(e) {
        if (e.target.closest('.gallery-grid')) {
            const currentActive = document.querySelector('.thumbnail.active');
            const currentIndex = Array.from(thumbnails).indexOf(currentActive);
            let newIndex;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    newIndex = currentIndex > 0 ? currentIndex - 1 : thumbnails.length - 1;
                    thumbnails[newIndex].click();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    newIndex = currentIndex < thumbnails.length - 1 ? currentIndex + 1 : 0;
                    thumbnails[newIndex].click();
                    break;
            }
        }
    });
}

// Enhanced booking form functionality
function initializeBookingEnhancements() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const guestsSelect = document.getElementById('guests');
    const bookingForm = document.querySelector('.booking-form');
    
    if (!checkinInput || !checkoutInput) return;
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    checkinInput.min = today;
    
    // Update checkout minimum when checkin changes
    checkinInput.addEventListener('change', function() {
        const checkinDate = new Date(this.value);
        checkinDate.setDate(checkinDate.getDate() + 1);
        checkoutInput.min = checkinDate.toISOString().split('T')[0];
        
        // Clear checkout if it's before new minimum
        if (checkoutInput.value && checkoutInput.value <= this.value) {
            checkoutInput.value = '';
        }
        
        updatePriceCalculation();
    });
    
    // Update price when checkout changes
    checkoutInput.addEventListener('change', updatePriceCalculation);
    guestsSelect?.addEventListener('change', updatePriceCalculation);
    
    // Form submission with loading state
    bookingForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        submitBtn.classList.add('btn--loading');
        
        // Simulate booking process
        setTimeout(() => {
            // Show success message
            showBookingSuccess();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn--loading');
        }, 2000);
    });
}

// Price calculation for booking
function updatePriceCalculation() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const priceDisplay = document.querySelector('.price-display');
    
    if (!checkinInput?.value || !checkoutInput?.value || !priceDisplay) return;
    
    const checkin = new Date(checkinInput.value);
    const checkout = new Date(checkoutInput.value);
    const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
    
    if (nights > 0) {
        const basePrice = parseInt(priceDisplay.textContent.match(/\$(\d+)/)[1]);
        const totalPrice = basePrice * nights;
        
        // Show calculation breakdown
        const existingBreakdown = document.querySelector('.price-breakdown');
        if (existingBreakdown) existingBreakdown.remove();
        
        const breakdown = document.createElement('div');
        breakdown.className = 'price-breakdown';
        breakdown.innerHTML = `
            <div style="font-size: 0.85rem; color: var(--color-text-secondary); margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--color-accent);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>$${basePrice} × ${nights} nights</span>
                    <span>$${totalPrice}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1rem; color: var(--color-primary);">
                    <span>Total</span>
                    <span>$${totalPrice}</span>
                </div>
            </div>
        `;
        
        priceDisplay.parentNode.appendChild(breakdown);
    }
}

// Dropdown navigation for mobile and desktop
function initializeDropdownNavigation() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        // Desktop hover behavior is handled by CSS
        // Add click behavior for better mobile support
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.nextElementSibling;
                
                // Toggle dropdown visibility
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                
                // Close other dropdowns
                dropdownToggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) {
                        const otherDropdown = otherToggle.nextElementSibling;
                        otherDropdown.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-dropdown')) {
            dropdownToggles.forEach(toggle => {
                const dropdown = toggle.nextElementSibling;
                dropdown.style.display = 'none';
            });
        }
    });
}

// Show booking success message
function showBookingSuccess() {
    // Create success modal/message
    const successModal = document.createElement('div');
    successModal.className = 'booking-success-modal';
    successModal.innerHTML = `
        <div class="success-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Booking Request Submitted!</h3>
            <p>Thank you for your interest in our luxury apartment. We'll contact you within 24 hours to confirm your reservation.</p>
            <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">Continue</button>
        </div>
    `;
    
    // Add styles
    successModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const successContent = successModal.querySelector('.success-content');
    successContent.style.cssText = `
        background: white;
        padding: 3rem;
        border-radius: 1rem;
        text-align: center;
        max-width: 400px;
        margin: 1rem;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease;
    `;
    
    const successIcon = successModal.querySelector('.success-icon i');
    successIcon.style.cssText = `
        font-size: 3rem;
        color: #27AE60;
        margin-bottom: 1rem;
    `;
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-30px) scale(0.9); }
            to { transform: translateY(0) scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(successModal);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (successModal.parentNode) {
            successModal.remove();
        }
    }, 5000);
}

// Responsive features enhancement
function initializeResponsiveFeatures() {
    // Improve mobile gallery experience
    const galleryThumbnails = document.querySelector('.gallery-thumbnails');
    if (galleryThumbnails && window.innerWidth <= 768) {
        // Add swipe functionality for mobile gallery
        let startX = 0;
        let scrollLeft = 0;
        
        galleryThumbnails.addEventListener('touchstart', function(e) {
            startX = e.touches[0].pageX - galleryThumbnails.offsetLeft;
            scrollLeft = galleryThumbnails.scrollLeft;
        });
        
        galleryThumbnails.addEventListener('touchmove', function(e) {
            e.preventDefault();
            const x = e.touches[0].pageX - galleryThumbnails.offsetLeft;
            const walk = (x - startX) * 2;
            galleryThumbnails.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Responsive form improvements
    const formInputs = document.querySelectorAll('input[type="date"]');
    formInputs.forEach(input => {
        // Prevent zoom on iOS when focusing date inputs
        input.addEventListener('focus', function() {
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                this.style.fontSize = '16px';
            }
        });
        
        input.addEventListener('blur', function() {
            this.style.fontSize = '';
        });
    });
    
    // Optimize images for different screen sizes
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading="lazy" for better performance
        img.setAttribute('loading', 'lazy');
        
        // Add error handling
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate viewport height for mobile browsers
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }, 100);
    });
    
    // Set initial viewport height
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Touch enhancements for better mobile interaction
function initializeTouchEnhancements() {
    // Add touch feedback to interactive elements
    const touchElements = document.querySelectorAll('.btn, .apartment-card, .thumbnail, .nav-link, .filter-btn');
    
    touchElements.forEach(element => {
        // Add active state on touch
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = '';
            }, 100);
        }, { passive: true });
        
        element.addEventListener('touchcancel', function() {
            this.style.transform = '';
            this.style.transition = '';
        }, { passive: true });
    });
    
    // Improve apartment card touch experience
    const apartmentCards = document.querySelectorAll('.apartment-card');
    apartmentCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.opacity = '0.9';
        }, { passive: true });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.opacity = '';
            }, 150);
        }, { passive: true });
    });
    
    // Prevent double-tap zoom on buttons and interactive elements
    const preventZoomElements = document.querySelectorAll('.btn, .filter-btn, .thumbnail');
    preventZoomElements.forEach(element => {
        element.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.click();
        });
    });
    
    // Improve scroll performance on mobile
    let ticking = false;
    
    function updateScrollElements() {
        const scrolled = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        
        if (navbar && window.innerWidth <= 768) {
            if (scrolled > 100) {
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            } else {
                navbar.style.backdropFilter = '';
                navbar.style.backgroundColor = '';
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    }, { passive: true });
    
    // Add swipe gestures for apartment navigation
    const apartmentNavigation = document.querySelector('.apartment-nav');
    if (apartmentNavigation && window.innerWidth <= 768) {
        let startX = 0;
        let startY = 0;
        
        apartmentNavigation.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        apartmentNavigation.addEventListener('touchend', function(e) {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Check if swipe is more horizontal than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                const navButtons = this.querySelectorAll('.nav-btn');
                if (diffX > 0 && navButtons[1]) {
                    // Swipe left - go to next
                    navButtons[1].click();
                } else if (diffX < 0 && navButtons[0]) {
                    // Swipe right - go to previous
                    navButtons[0].click();
                }
            }
            
            startX = 0;
            startY = 0;
        }, { passive: true });
    }
}