document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
  });

  // Cart functionality
  let cart = [];
  const cartButton = document.getElementById('cart-button');
  const mobileCartButton = document.getElementById('mobile-cart-button');
  const cartModal = document.getElementById('cart-modal');
  const closeCart = document.getElementById('close-cart');
  const continueShopping = document.getElementById('continue-shopping');
  const cartItemsContainer = document.getElementById('cart-items');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  const cartCount = document.getElementById('cart-count');
  const mobileCartCount = document.getElementById('mobile-cart-count');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTax = document.getElementById('cart-tax');
  const cartTotal = document.getElementById('cart-total');

  // Add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const product = this.dataset.product;
      const price = parseFloat(this.dataset.price);
      
      // Check if product already in cart
      const existingItem = cart.find(item => item.product === product);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ 
          product, 
          price,
          quantity: 1
        });
      }
      
      updateCart();
      showCartModal();
    });
  });

  // Show cart modal
  function showCartModal() {
    cartModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  // Hide cart modal
  function hideCartModal() {
    cartModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // Update cart display
  function updateCart() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
      emptyCartMessage.classList.remove('hidden');
    } else {
      emptyCartMessage.classList.add('hidden');
      
      let subtotal = 0;
      
      cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'flex justify-between items-center border-b border-gray-200 pb-4';
        cartItem.innerHTML = `
          <div>
            <h4 class="font-medium">${item.product}</h4>
            <p class="text-gray-600 text-sm">$${item.price.toFixed(2)} each</p>
          </div>
          <div class="flex items-center">
            <button class="decrease-quantity text-gray-500 hover:text-pink-600 px-2" data-product="${item.product}">
              <i class="fas fa-minus"></i>
            </button>
            <span class="mx-2">${item.quantity}</span>
            <button class="increase-quantity text-gray-500 hover:text-pink-600 px-2" data-product="${item.product}">
              <i class="fas fa-plus"></i>
            </button>
            <span class="ml-4 font-medium">$${itemTotal.toFixed(2)}</span>
            <button class="remove-item text-red-500 hover:text-red-700 ml-4" data-product="${item.product}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `;
        cartItemsContainer.appendChild(cartItem);
      });
      
      const tax = subtotal * 0.1; // 10% tax
      const total = subtotal + tax;
      
      cartSubtotal.textContent = subtotal.toFixed(2);
      cartTax.textContent = tax.toFixed(2);
      cartTotal.textContent = total.toFixed(2);
    }
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    mobileCartCount.textContent = totalItems;
    
    if (totalItems > 0) {
      cartCount.classList.remove('hidden');
      mobileCartCount.classList.remove('hidden');
    } else {
      cartCount.classList.add('hidden');
      mobileCartCount.classList.add('hidden');
    }
  }

  // Event delegation for quantity buttons
  cartItemsContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('increase-quantity') || e.target.parentElement.classList.contains('increase-quantity')) {
      const button = e.target.classList.contains('increase-quantity') ? e.target : e.target.parentElement;
      const product = button.dataset.product;
      const item = cart.find(item => item.product === product);
      if (item) {
        item.quantity += 1;
        updateCart();
      }
    }
    
    if (e.target.classList.contains('decrease-quantity') || e.target.parentElement.classList.contains('decrease-quantity')) {
      const button = e.target.classList.contains('decrease-quantity') ? e.target : e.target.parentElement;
      const product = button.dataset.product;
      const item = cart.find(item => item.product === product);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateCart();
      }
    }
    
    if (e.target.classList.contains('remove-item') || e.target.parentElement.classList.contains('remove-item')) {
      const button = e.target.classList.contains('remove-item') ? e.target : e.target.parentElement;
      const product = button.dataset.product;
      cart = cart.filter(item => item.product !== product);
      updateCart();
    }
  });

  // Cart button events
  cartButton.addEventListener('click', showCartModal);
  mobileCartButton.addEventListener('click', showCartModal);
  closeCart.addEventListener('click', hideCartModal);
  continueShopping.addEventListener('click', hideCartModal);

  // Booking form
  const bookingForm = document.getElementById('booking-form');
  const bookingModal = document.getElementById('booking-modal');
  const closeBookingModal = document.getElementById('close-booking-modal');
  const bookingConfirmationText = document.getElementById('booking-confirmation-text');

  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    
    // In a real app, you would send this data to your server
    console.log('Booking submitted:', { name, service, date });
    
    // Show confirmation
    bookingConfirmationText.textContent = `Thank you, ${name}! Your ${service} appointment has been booked. We've sent a confirmation to your email.`;
    bookingModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Reset form
    bookingForm.reset();
  });

  closeBookingModal.addEventListener('click', function() {
    bookingModal.classList.add('hidden');
    document.body.style.overflow = '';
  });

  // Back to top button
  const backToTopButton = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.remove('hidden');
    } else {
      backToTopButton.classList.add('hidden');
    }
  });
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        mobileMenu.classList.add('hidden');
      }
    });
  });
});