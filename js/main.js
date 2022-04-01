import { createCountdown } from './countdown.js'

const timers = [...document.querySelectorAll('.timer')].map((timerEl) => ({
  time: timerEl.id,
  countdownEl: timerEl.querySelector('.timer-countdown'),
  value: '',
  display: {
    top: timerEl.querySelector('.timer-countdown-display .top'),
    bottom: timerEl.querySelector('.timer-countdown-display .bottom'),
  },
  flipper: {
    top: timerEl.querySelector('.timer-countdown-flipper .top'),
    bottom: timerEl.querySelector('.timer-countdown-flipper .bottom'),
  },
}))

const runCountdown = createCountdown({
  target: '10 April 2022',
  timers,
})

runCountdown()
