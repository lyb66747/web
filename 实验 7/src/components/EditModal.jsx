import React, { useState, useEffect } from 'react';

/**
 * EditModal 组件
 * 编辑课程模态框
 */
function EditModal({ course, onSave, onClose }) {
  const [title, setTitle] = useState(course.title);
  const [desc, setDesc] = useState(course.desc);
  const [category, setCategory] = useState(course.category);

  const CATEGORIES = ['前端', '后端', '数据库', '其他'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('课程名称不能为空！');
      return;
    }
    onSave({
      ...course,
      title: title.trim(),
      desc: desc.trim(),
      category
    });
  };

  return (
    <div className="modal-overlay show" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>✏️ 编辑课程</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>课程名称 *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="请输入课程名称"
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>课程分类</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>课程简介</label>
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="请输入课程简介（可选）"
              rows="4"
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              取消
            </button>
            <button type="submit" className="btn btn-primary">
              保存修改
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
