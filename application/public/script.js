let currentSlide = 0

function showSlide (index) {
  const slides = document.querySelector('.slides')
  const slideWidth = document.querySelector('.slide').offsetWidth
  slides.style.transform = `translateX(${-index * slideWidth}px)`
  currentSlide = index
}

function nextSlide () {
  currentSlide = (currentSlide + 1) % document.querySelectorAll('.slide').length
  showSlide(currentSlide)
}

function prevSlide () {
  currentSlide =
    (currentSlide - 1 + document.querySelectorAll('.slide').length) %
    document.querySelectorAll('.slide').length
  showSlide(currentSlide)
}

// Automatically advance to the next slide every 3 seconds
setInterval(nextSlide, 3000)