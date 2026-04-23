import { useState, useEffect } from 'react';

/**
 * 自定义 Hook：useLocalStorage
 * 用于在 localStorage 中持久化状态数据
 * @param {string} key - localStorage 的键名
 * @param {any} initialValue - 初始值
 * @returns {[any, function]} - 当前值和更新函数
 */
export function useLocalStorage(key, initialValue) {
  // 读取 localStorage 中的值
  const readValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`读取 localStorage "${key}" 时出错:`, error);
      return initialValue;
    }
  };

  // 使用懒初始化
  const [storedValue, setStoredValue] = useState(readValue);

  // 当 storedValue 或 key 变化时，同步到 localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`保存 localStorage "${key}" 时出错:`, error);
    }
  }, [key, storedValue]);

  // 监听其他标签页的变化
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key && event.newValue !== null) {
        setStoredValue(JSON.parse(event.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setStoredValue];
}
