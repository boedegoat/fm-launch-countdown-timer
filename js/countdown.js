export function createCountdown({ target, timers }) {
  let prevCountdown

  function renderCountdown() {
    const targetDate = new Date(target)
    const currentDate = new Date()
    const totalSeconds = (targetDate - currentDate) / 1000

    const countdown = {
      days: formatTime(Math.floor(totalSeconds / 3600 / 24)),
      hours: formatTime(Math.floor(totalSeconds / 3600) % 24),
      minutes: formatTime(Math.floor(totalSeconds / 60) % 60),
      seconds: formatTime(Math.floor(totalSeconds) % 60),
    }

    timers.forEach((timer) => {
      const prevTime = prevCountdown?.[timer.time]
      const currentTime = countdown[timer.time]
      const nextTime = Number(currentTime) - 1

      timer.value = currentTime

      if (!prevCountdown) {
        timer.display.top.innerHTML = timer.value
        timer.display.bottom.innerHTML = timer.value
        timer.flipper.top.innerHTML = timer.value
        timer.flipper.bottom.innerHTML = formatTime(nextTime < 0 ? 59 : nextTime)
        return
      }

      if (prevTime !== currentTime) {
        timer.countdownEl.classList.add('flip')
        timer.display.top.innerHTML = timer.value
        timer.countdownEl.onanimationend = () => {
          timer.countdownEl.classList.remove('flip')
          timer.display.top.innerHTML = timer.value
          timer.display.bottom.innerHTML = timer.value
          timer.flipper.top.innerHTML = timer.value
          timer.flipper.bottom.innerHTML = formatTime(nextTime < 0 ? 59 : nextTime)
        }
      }
    })

    prevCountdown = { ...countdown }
  }

  function startCountdown() {
    renderCountdown()
    setInterval(renderCountdown, 1000)
  }

  return startCountdown
}

function formatTime(time) {
  return (time < 10 ? `0${time}` : time).toString()
}
