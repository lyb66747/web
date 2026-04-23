import React from 'react';
import CourseCard from './CourseCard';

/**
 * CourseList 组件
 * 显示课程列表
 */
function CourseList({ courses, onLearn, onDelete, onEdit }) {
  if (courses.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 暂无课程</p>
        <p>点击上方"添加课程"按钮开始创建你的课程列表吧！</p>
      </div>
    );
  }

  return (
    <div className="course-list">
      {courses.map(course => (
        <CourseCard
          key={course.id}
          course={course}
          onLearn={onLearn}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default CourseList;
