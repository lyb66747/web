import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useLocalStorage, useDebounce } from './hooks';
import { Header, Footer, Toast, EditModal, CourseList } from './components';
import './App.css';

// 课程分类选项
const CATEGORIES = ['前端', '后端', '数据库', '其他'];

// 默认课程数据
const DEFAULT_COURSES = [
  { id: 1, title: 'React 入门教程', desc: '学习 React 基础概念，包括组件、JSX、状态管理等核心知识', category: '前端' },
  { id: 2, title: 'JavaScript 进阶', desc: '深入理解 JavaScript 闭包、原型链、异步编程等高级特性', category: '前端' },
  { id: 3, title: 'Node.js 后端开发', desc: '使用 Node.js 构建高性能后端服务', category: '后端' },
  { id: 4, title: 'MySQL 数据库', desc: '掌握 MySQL 数据库设计与优化', category: '数据库' }
];

function App() {
  // ========== useState: 管理页面状态 ==========
  const [newCourse, setNewCourse] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('前端');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('全部');
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [editingCourse, setEditingCourse] = useState(null);

  // ========== useLocalStorage: 自定义 Hook 持久化课程数据 ==========
  const [courses, setCourses] = useLocalStorage('courses-hooks', DEFAULT_COURSES);

  // ========== useRef: 获取输入框 DOM 引用，实现自动聚焦 ==========
  const inputRef = useRef(null);

  // ========== useDebounce: 自定义 Hook 防抖搜索关键词 ==========
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // ========== useEffect: 页面首次加载时自动聚焦输入框 ==========
  useEffect(() => {
    // 页面初始化时聚焦输入框
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // ========== useEffect: 每次新增课程后自动聚焦 ==========
  useEffect(() => {
    if (courses.length > 0 && !editingCourse) {
      // 检查是否是刚添加完课程（输入框被清空）
      if (newCourse === '' && inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [courses, newCourse, editingCourse]);

  // ========== useMemo: 缓存筛选后的课程列表，避免重复计算 ==========
  const filteredCourses = useMemo(() => {
    console.log('🔍 执行课程筛选计算...');
    return courses.filter(course => {
      const matchSearch = course.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                         course.desc.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchCategory = categoryFilter === '全部' || course.category === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [courses, debouncedSearchTerm, categoryFilter]);

  // ========== useMemo: 缓存分类统计结果 ==========
  const categoryStats = useMemo(() => {
    console.log('📊 执行分类统计计算...');
    return CATEGORIES.reduce((acc, cat) => {
      acc[cat] = courses.filter(c => c.category === cat).length;
      return acc;
    }, {});
  }, [courses]);

  // ========== useCallback: 缓存事件处理函数，避免子组件重复渲染 ==========
  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 2000);
  }, []);

  // 学习按钮处理
  const handleLearn = useCallback((title) => {
    showToast(`开始学习：${title}`, 'success');
  }, [showToast]);

  // 添加课程
  const handleAddCourse = useCallback(() => {
    if (!newCourse.trim()) {
      setError('课程名称不能为空！');
      showToast('课程名称不能为空！', 'error');
      return;
    }

    const course = {
      id: Date.now(),
      title: newCourse.trim(),
      desc: newDesc.trim() || '暂无课程简介',
      category: newCategory
    };

    setCourses(prev => [...prev, course]);
    setNewCourse('');
    setNewDesc('');
    setError('');
    showToast('课程添加成功！', 'success');
    
    // 添加后自动聚焦输入框
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }, [newCourse, newDesc, newCategory, setCourses, showToast]);

  // 删除课程
  const handleDeleteCourse = useCallback((id) => {
    setCourses(prev => prev.filter(course => course.id !== id));
    showToast('课程已删除', 'success');
  }, [setCourses, showToast]);

  // 打开编辑
  const handleEditClick = useCallback((id) => {
    const course = courses.find(c => c.id === id);
    setEditingCourse(course);
  }, [courses]);

  // 保存编辑
  const handleSaveEdit = useCallback((updatedCourse) => {
    setCourses(prev => prev.map(course =>
      course.id === updatedCourse.id ? updatedCourse : course
    ));
    setEditingCourse(null);
    showToast('课程更新成功！', 'success');
  }, [setCourses, showToast]);

  // 关闭编辑
  const handleCloseEdit = useCallback(() => {
    setEditingCourse(null);
  }, []);

  // 处理输入变化
  const handleNewCourseChange = useCallback((e) => {
    const value = e.target.value;
    setNewCourse(value);
    if (value.trim()) {
      setError('');
    }
  }, []);

  return (
    <div className="app">
      <Header 
        title="📚 React 课程管理页面" 
        subtitle="实验 7 - 基于 Hooks 的升级实验（useEffect/useRef/useMemo/useCallback/自定义 Hook）" 
      />

      <div className="content">
        {/* 添加课程区域 */}
        <div className="add-box">
          <h3>➕ 添加新课程</h3>
          <div className="input-group">
            <input
              ref={inputRef}
              type="text"
              placeholder="请输入课程名称 *"
              value={newCourse}
              onChange={handleNewCourseChange}
              className={error ? 'error' : ''}
            />
            <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button className="btn btn-primary" onClick={handleAddCourse}>
              添加课程
            </button>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="请输入课程简介（可选）"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              style={{ flex: 1 }}
            />
          </div>
          {error && <div className="error-message show">{error}</div>}
        </div>

        {/* 统计和筛选区域 */}
        <div className="stats-bar">
          <div className="count">
            共 <strong>{courses.length}</strong> 门课程
            {searchTerm || categoryFilter !== '全部' ? 
              <span>（筛选显示 {filteredCourses.length} 条）</span> : null}
            <span style={{ marginLeft: '15px', fontSize: '12px', color: '#999' }}>
              前端：{categoryStats.前端} | 后端：{categoryStats.后端} | 
              数据库：{categoryStats.数据库} | 其他：{categoryStats.其他}
            </span>
          </div>
          <div className="filters">
            <input
              type="text"
              placeholder="🔍 搜索课程...（防抖 300ms）"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '200px' }}
            />
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="全部">全部分类</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 课程列表区域 */}
        <CourseList
          courses={filteredCourses}
          onLearn={handleLearn}
          onDelete={handleDeleteCourse}
          onEdit={handleEditClick}
        />
      </div>

      <Footer count={courses.length} />

      <Toast message={toast.message} type={toast.type} show={toast.show} />

      {/* 编辑课程模态框 */}
      {editingCourse && (
        <EditModal
          course={editingCourse}
          onSave={handleSaveEdit}
          onClose={handleCloseEdit}
        />
      )}
    </div>
  );
}

export default App;
