# 实验 7 - 基于 Hooks 的 React 课程管理页面升级实验

## 📚 项目简介

本项目是在实验 5 的基础上，使用 React Hooks 进行全面升级的课程管理页面。通过本实验，深入理解并掌握以下 Hooks 的使用：

- **useState** - 状态管理
- **useEffect** - 副作用处理
- **useRef** - DOM 引用
- **useMemo** - 计算缓存
- **useCallback** - 函数缓存
- **自定义 Hook** - 逻辑复用

## 🎯 功能特性

### 基础功能
- ✅ 显示课程列表（卡片式展示）
- ✅ 新增课程（名称、简介、分类）
- ✅ 删除课程
- ✅ 编辑课程（模态框）
- ✅ 学习按钮交互（Toast 提示）

### Hooks 增强功能
- ✅ **数据持久化** - 使用 localStorage，刷新不丢失
- ✅ **搜索功能** - 支持课程名称/简介搜索
- ✅ **防抖优化** - 搜索输入延迟 300ms 更新
- ✅ **分类筛选** - 按前端/后端/数据库/其他筛选
- ✅ **课程统计** - 显示总数和各分类数量
- ✅ **自动聚焦** - 新增课程后输入框自动聚焦
- ✅ **性能优化** - useMemo 缓存列表过滤，useCallback 缓存事件函数

## 🚀 快速开始

### 1. 安装依赖

```bash
cd "D:\table\实验 7"
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 访问应用

打开浏览器访问：http://localhost:3007

## 📁 项目结构

```
实验 7/
├── index.html              # HTML 入口文件
├── package.json            # 项目配置和依赖
├── vite.config.js          # Vite 构建配置
├── 实验报告.md             # 详细实验报告
└── src/
    ├── main.jsx            # React 应用入口
    ├── App.jsx             # 主组件（核心 Hooks 实现）
    ├── App.css             # 全局样式
    ├── hooks/
    │   ├── index.js        # Hook 统一导出
    │   ├── useLocalStorage.js  # 自定义 Hook：本地存储
    │   └── useDebounce.js      # 自定义 Hook：防抖
    └── components/
        ├── index.js        # 组件统一导出
        ├── Header.jsx      # 页头组件
        ├── Footer.jsx      # 页脚组件
        ├── Toast.jsx       # 消息提示组件
        ├── EditModal.jsx   # 编辑模态框组件
        ├── CourseList.jsx  # 课程列表组件
        └── CourseCard.jsx  # 课程卡片组件
```

## 🔧 核心技术实现

### useLocalStorage 自定义 Hook

```jsx
// 使用示例
const [courses, setCourses] = useLocalStorage('courses-hooks', DEFAULT_COURSES);
```

自动处理 localStorage 的读写，支持：
- 懒初始化
- 自动同步
- 多标签页数据同步

### useDebounce 自定义 Hook

```jsx
// 使用示例
const debouncedSearchTerm = useDebounce(searchTerm, 300);
```

防抖处理搜索输入，避免频繁触发筛选计算。

### useMemo 性能优化

```jsx
const filteredCourses = useMemo(() => {
  return courses.filter(course => {
    // 筛选逻辑
  });
}, [courses, debouncedSearchTerm, categoryFilter]);
```

仅在依赖变化时重新计算筛选结果。

### useCallback 函数缓存

```jsx
const handleDeleteCourse = useCallback((id) => {
  setCourses(prev => prev.filter(course => course.id !== id));
}, [setCourses]);
```

避免传递给子组件的函数每次渲染都变化。

## 📊 Hooks 使用总结

| Hook | 用途 | 使用位置 |
|------|------|----------|
| useState | 状态管理 | 课程列表、输入内容、搜索词等 |
| useEffect | 副作用处理 | 输入框聚焦、数据同步 |
| useRef | DOM 引用 | 输入框自动聚焦 |
| useMemo | 计算缓存 | 课程列表筛选、分类统计 |
| useCallback | 函数缓存 | 事件处理函数 |
| useLocalStorage | 自定义 Hook | 数据持久化 |
| useDebounce | 自定义 Hook | 搜索防抖 |

## 📝 实验报告

详细实验报告请查看 `实验报告.md` 文件，包含：
- 实验目标
- 实验任务完成情况
- 关键技术实现分析
- 功能列表
- 实验总结

## 🎨 界面预览

- 渐变紫色主题
- 卡片式课程展示
- 分类标签彩色区分
- Toast 消息提示
- 模态框编辑界面
- 响应式布局

## 📄 License

本实验项目仅用于学习目的。

---

**创建时间：** 2026 年 4 月 16 日  
**技术栈：** React 18 + Vite + Hooks
