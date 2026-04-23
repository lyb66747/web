import React from 'react';

/**
 * CourseCard 组件
 * 显示单个课程卡片
 */
function CourseCard({ course, onLearn, onDelete, onEdit }) {
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-header">
          <h3>{course.title}</h3>
          <span className={`category-tag ${course.category}`}>{course.category}</span>
        </div>
        <p>{course.desc}</p>
      </div>
      <div className="card-actions">
        <button className="btn btn-learn" onClick={() => onLearn(course.title)}>
          📖 学习
        </button>
        <button className="btn btn-edit" onClick={() => onEdit(course.id)}>
          ✏️ 编辑
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(course.id)}>
          🗑️ 删除
        </button>
      </div>
    </div>
  );
}

export default CourseCard;
