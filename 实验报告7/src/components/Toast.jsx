import React from 'react';

/**
 * Toast 组件
 * 显示提示消息
 */
function Toast({ message, type = 'success', show }) {
  return (
    <div className={`toast ${type} ${show ? 'show' : ''}`}>
      {message}
    </div>
  );
}

export default Toast;
