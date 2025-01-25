import { ChatClient } from '@twurple/chat'
const url = new URL(window.location.href)
const channel = url.searchParams.get('channel') || 'dissabiIity'
const chat = new ChatClient({
  channels: [channel],
})
console.log('Connecting to chat...')
chat.onConnect(() => {
  console.log('Connected to chat!')
})
chat.connect()

const beaniePaths = {
  flognaw: './videos/DissYellowPatch.mp4',
  green: './videos/DissYellowPatch.mp4',
  snorlax: './videos/DissSnorlax.mp4',
  onepiece: './videos/DissOnePiece.mp4',
  mask: './videos/DissMask.mp4',
  web: './videos/DissWeb.mp4',
  spider: './videos/DissWeb.mp4',
  doom: './videos/DissDoom.mp4',
}
const videoEl = document.getElementById('video')
videoEl.src = beaniePaths.flognaw

chat.onMessage((channel, user, message, msg) => {
  console.log('Message received:', message)
  if (!msg.userInfo.isMod && !msg.userInfo.isBroadcaster && user !== 'devjimmyboy') return

  if (message.startsWith('!beanie')) {
    const beanie = message.split(' ')[1]
    if (!beanie) {
      return
    }
    const beaniePath = beaniePaths[beanie]
    if (!beaniePath) {
      return
    }
    videoEl.src = beaniePath
    videoEl.play()
  }
  if (user === 'devjimmyboy') {
    if (message.startsWith('!refresh')) {
      window.location.reload()
    }
  }
})

videoEl.oncanplaythrough = () => {
  videoEl.play()
}
