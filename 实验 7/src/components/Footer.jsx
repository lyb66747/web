import React from 'react';

/**
 * Footer 组件
 * 显示页脚信息
 */
function Footer({ count }) {
  return (
    <footer className="footer">
      <p>© 2026 React Hooks 实验 | 共 {count} 门课程 | 使用 useEffect、useRef、useMemo、useCallback 优化</p>
    </footer>
  );
}

export default Footer;
