import React, { useCallback, useEffect } from "react";
import { Popover } from "antd";
import Chat, { Bubble, useMessages } from "@chatui/core";
import Map from "@/components/Map";
import { AwesomeButtonProgress } from "react-awesome-button";
import "@chatui/core/dist/index.css";
import "./index.less";

const getResponse = async (input) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        type: "text",
        content: { text: input },
      });
    }, 1000);
  });
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

const ChatMap = ({ handleRandom, mapData, loadMap, startGame }) => {
  // 消息列表
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);

  useEffect(() => {
    if (mapData) {
      appendMsg({
        type: "map",
        content: { map: mapData },
        user: {
          avatar: "/image/logo.png",
        },
      });
    }
  }, [mapData]);

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
        // TODO: 发送请求
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
            <div>
              <Map data={content.map} />
            </div>
          </Popover>
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
