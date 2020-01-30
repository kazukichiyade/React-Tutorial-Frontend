import React from 'react';

// エラーメッセージ共通コンポーネント
const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

export default Notification;
