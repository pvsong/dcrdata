import globalEventBus from './event_bus_service'
import Notify from 'notifyjs'

function onShowNotification () {
  console.log('block ntfn shown')
}
function onCloseNotification () {
  console.log('block ntfn closed')
}
function onClickNotification () {
  console.log('block ntfn clicked')
}
function onErrorNotification () {
  console.error('Error showing notification. You may need to request permission.')
}

globalEventBus.on('BLOCK_RECEIVED', (newBlock) => {
  if (!Notify.needsPermission) {
    notifyNewBlock(newBlock.block)
  }
})

function notifyNewBlock (block) {
  var newBlockNtfn = new Notify('New Decred Block Mined', {
    body: 'Block mined at height ' + block.height,
    tag: 'blockheight',
    image: '/images/dcrdata144x128.png',
    icon: '/images/dcrdata144x128.png',
    notifyShow: onShowNotification,
    notifyClose: onCloseNotification,
    notifyClick: onClickNotification,
    notifyError: onErrorNotification,
    timeout: 10
  })
  newBlockNtfn.show()
}
