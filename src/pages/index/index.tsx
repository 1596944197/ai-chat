import { wsPromise } from "@/utils/ws-client";
import { Text, View } from '@tarojs/components';
import { useEffect } from 'react';
import './index.less';

export default function Index() {
  useEffect(() => {
    (async () => {
      const ws = await wsPromise
      ws.send({
        a: 1,
        b: 2
      })
      ws.onMessage(({ data }) => {
        console.log(data)
      })
    })()
  }, [])
  return (
    <View className='index'>
      <Text>Hello world! test222</Text>
    </View>
  )
}
