import { wsPromise, WsType } from "@/utils/ws-client";
import { Text, Textarea, View } from "@tarojs/components";
import { OsList } from "ossaui";
import { useEffect, useState } from "react";
import "./index.less";

let ws: WsType;

const response: string[] = []
export default function Index() {
  const [v2, setV2] = useState("186");
  const [isRequest, setIsRequest] = useState(false);

  useEffect(() => {
    (async () => {
      ws = await wsPromise;
      console.log('更新了一次')
      ws.onMessage(({ data }) => {
        setIsRequest(false)
        response.push(data)
      });
    })();
  }, []);

  const List = () => (
    <>
      {response.map(text => (
        <OsList title={text} desc="描述文字"></OsList>
      ))}
    </>
  );

  return (
    <View className="index">
      <Text>Hello world!</Text>
      <List />
      <Textarea
        style={{ padding: "20px" }}
        showCount="true"
        controlled="true"
        placeholder="测试"
        onInput={({ detail: { value } }) => setV2(value)}
        onBlur={() => {
          if (isRequest) return
          ws.send(v2)
          setIsRequest(true)
        }}
      ></Textarea>
    </View>
  );
}
