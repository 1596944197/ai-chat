import Taro from "@tarojs/taro"

export type WsType = {
  socket: Taro.SocketTask,
  send: (value: any) => void,
  onMessage: <T = any>(callback: Taro.SocketTask.OnMessageCallback<T>) => void
}
export const wsPromise = (async () => {
  const socket = await Taro.connectSocket({
    url: 'ws://127.0.0.1:3332',
    fail(res) {
      console.error(res)
    },
  })
  socket.onOpen((r) => {
    console.log('open', r)
  })
  socket.onError(console.error)

  function send(so: Taro.SocketTask) {
    return (value) => {
      const data = JSON.stringify(value)
      so.send({
        data
      })
    }
  }

  return {
    socket,
    send: send(socket),
    onMessage: socket.onMessage
  }
})()
