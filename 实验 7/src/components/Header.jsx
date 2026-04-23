import React from 'react';

/**
 * Header 组件
 * 显示页面标题和副标题
 */
function Header({ title, subtitle }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}

export default Header;
