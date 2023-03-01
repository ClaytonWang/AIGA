import React, { useCallback, useEffect } from "react";
import { Popover } from "antd";
import _ from "lodash";
import Chat, { Bubble, useMessages, Text } from "@chatui/core";
import Map from "@/components/Map";
import { sendMessage } from "@/services/chatgpt";
import { AwesomeButtonProgress } from "react-awesome-button";
import "@chatui/core/dist/index.css";
import "./index.less";

const formatResponse = (data) => {
  try {
    const REG = /\s*```([\d\s]+)```\s*/;
    const matches = data.match(REG);
    if (matches[1]) {
      return {
        type: "map",
        content: {
          text: data.replace(REG, "\n"),
          map: matches[1].replace(/\s+/g, ""),
        },
      };
    }
    return {
      type: "text",
      content: { text: data },
    };
  } catch (error) {
    return {
      type: "text",
      content: { text: data },
    };
  }
};

const getResponse = async (input) => {
  try {
    const prompt = (() => {
      if (_.toUpper(input) === "AI关卡") {
        return "生成26 * 26的坦克大战地图";
      }
      return input;
    })();
    const res = await sendMessage(prompt);
    return formatResponse(res.data.content);
  } catch (error) {
    return Promise.resolve({
      type: "text",
      content: { text: "服务器忙，请稍后再试" },
    });
  }
};

const initialMessages = [
  {
    type: "text",
    content: { text: "你好，我是AI创游，你的游戏创作助手~" },
    user: {
      avatar: "/image/logo.png",
    },
  },
];

// 默认快捷短语，可选
const defaultQuickReplies = [
  {
    name: "AI关卡",
    text: "",
    isNew: true,
  },
  {
    name: "随机关卡",
  },
];

const ChatMap = ({ loadMap, startGame, getRandomMap }) => {
  // 消息列表
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);

  // 初始化
  const handleRandom = useCallback(() => {
    getRandomMap().then((mapData) => {
      loadMap(mapData);
      appendMsg({
        type: "map",
        content: { map: mapData, text: "随机关卡：" },
        user: {
          avatar: "/image/logo.png",
        },
      });
    });
  }, []);
  useEffect(() => {
    handleRandom();
  }, []);

  // 渲染地图
  const handleClickMap = useCallback((v, next) => {
    loadMap(v);
    next?.();
  }, []);
  // 开启游戏
  const handleStart = useCallback((v, next) => {
    startGame(v);
    next?.();
  }, []);
  // 用户发送信息
  const handleUserSend = useCallback(
    (type, val) => {
      if (type === "text" && val.trim()) {
        if (val === "随机关卡") {
          handleRandom();
          return;
        }
        // 请求chatgpt
        appendMsg({
          type: "text",
          content: { text: val },
          position: "right",
        });
        setTyping(true);
        getResponse(val).then((res) => {
          if (res) {
            appendMsg({
              ...res,
              user: {
                avatar: "/image/logo.png",
              },
            });
          }
        });
      }
    },
    [handleRandom]
  );
  // 快捷操作
  const handleQuickReplyClick = useCallback((item) => {
    handleUserSend("text", item.text || item.name);
  }, []);

  // 渲染消息体
  const renderMessageContent = useCallback((msg) => {
    const { type, content } = msg;
    // 根据消息类型来渲染
    switch (type) {
      case "text":
        return <Bubble content={content.text} />;
      case "image":
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      case "map":
        return (
          <Bubble>
            {content.text ? (
              <Text
                style={{
                  marginBottom: 8,
                }}
              >
                {content.text}
              </Text>
            ) : null}
            <Popover
              content={
                <AwesomeButtonProgress
                  type="secondary"
                  onPress={(ele, next) => handleStart(content.map, next)}
                >
                  启动游戏
                </AwesomeButtonProgress>
              }
              trigger="click"
              placement="right"
              onClick={(ele, next) => handleClickMap(content.map, next)}
            >
              <div
                style={{
                  display: "inline-block",
                }}
              >
                <Map data={content.map} />
              </div>
            </Popover>
          </Bubble>
        );
      default:
        return null;
    }
  }, []);

  return (
    <div className="chat-map-zone">
      <Chat
        navbar={{ title: "AI创游" }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        quickReplies={defaultQuickReplies}
        onQuickReplyClick={handleQuickReplyClick}
        onSend={handleUserSend}
      />
    </div>
  );
};

export default ChatMap;
