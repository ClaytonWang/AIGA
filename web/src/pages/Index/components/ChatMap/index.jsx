import React, { useCallback } from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import Map from "@/components/Map";
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

const ChatMap = () => {
  // 消息列表
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);

  // 用户发送信息
  const handleUserSend = useCallback((type, val) => {
    if (type === "text" && val.trim()) {
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
  }, []);
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
