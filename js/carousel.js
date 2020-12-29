const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children)

const nexBtn = document.querySelector('.carousel__button--right')
const prevBtn = document.querySelector('.carousel__button--left')

const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children)

const slideSize = slides[0].getBoundingClientRect();
const slideWith = slideSize.width;

console.log(slideWith)

//arrange the slides next to one another
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWith * index + 'px'
}

slides.forEach(setSlidePosition)

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide')
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide')
}

const hideShowArrows = (slides, prevBtn, nexBtn, targetIndex) => {
  if (targetIndex === 0) {
    prevBtn.classList.add('is-hidden')
    nexBtn.classList.remove('is-hidden')
  } else if (targetIndex === slides.length - 1) {
    prevBtn.classList.remove('is-hidden')
    nexBtn.classList.add('is-hidden')
  } else {
    prevBtn.classList.remove('is-hidden')
    nexBtn.classList.remove('is-hidden')
  }
}

// when i click left icon, move slides to left
prevBtn.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const prevtDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide)

  //move to next slide
  moveToSlide(track, currentSlide, prevSlide)
  updateDots(currentDot, prevtDot)
  hideShowArrows(slides, prevBtn, nexBtn, prevIndex)

})

// when i click on right icon, move slides to right
nexBtn.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide)
  //move to next slide
  moveToSlide(track, currentSlide, nextSlide)
  updateDots(currentDot, nextDot)
  hideShowArrows(slides, prevBtn, nexBtn, nextIndex)

})

// when i click on nav indicator, move slides
dotsNav.addEventListener('click', e => {
  //what indicator was clicked on ?
  const targetDot = e.target.closest('button')
  if (!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot)
  const targetSlide = slides[targetIndex]

  moveToSlide(track, currentSlide, targetSlide)
  updateDots(currentDot, targetDot)

  hideShowArrows(slides, prevBtn, nexBtn, targetIndex)

})