import { wsPromise, WsType } from "@/utils/ws-client";
import { Text, Textarea, View } from "@tarojs/components";
import { useEffect, useState } from "react";
import { OsList } from "ossaui";
import "./index.less";

let ws: WsType;
export default function Index() {
  const [response, setResponse] = useState<string[]>([]);
  const [v2, setV2] = useState("186");

  useEffect(() => {
    (async () => {
      ws = await wsPromise;
      ws.send("hello,i'am super man");
      ws.onMessage(({ data }) => {
        // ! 有问题
        setResponse([...response, data]);
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
        onBlur={() => ws.send(v2)}
      ></Textarea>
    </View>
  );
}
