// Shared BGM for sub-pages
(function() {
  // Create audio
  const audio = document.createElement('audio')
  audio.src = 'images/bgm.mp3'
  audio.loop = true
  audio.volume = 0.2
  document.body.appendChild(audio)

  // Create toggle button
  const btn = document.createElement('button')
  btn.textContent = '♪'
  btn.title = '音樂開關'
  btn.style.cssText = 'position:fixed;bottom:50px;right:24px;width:44px;height:44px;border-radius:50%;border:1px solid #c8a87c;background:rgba(247,243,238,0.95);color:#6b5344;font-size:18px;cursor:pointer;z-index:101;display:flex;align-items:center;justify-content:center;transition:all 0.3s;box-shadow:0 2px 12px rgba(0,0,0,0.1);'
  document.body.appendChild(btn)

  let started = false

  function startMusic() {
    if (started) return
    started = true
    audio.play().catch(() => {})
  }

  // Auto-play on first interaction
  const events = ['click', 'scroll', 'touchstart', 'keydown']
  function tryPlay() {
    startMusic()
    events.forEach(e => document.removeEventListener(e, tryPlay))
  }
  events.forEach(e => document.addEventListener(e, tryPlay))

  // Toggle
  btn.addEventListener('click', (e) => {
    e.stopPropagation()
    if (!started) { tryPlay(); return }
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  })
})()
