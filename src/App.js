import React from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// 7 个板块的 JSON 数据
import data1 from './1. 委员之家.json';
import data2 from './2. 街道委员小组.json';
import data3 from './3. 界别基本情况.json';
import data4 from './4. 市政协新时代协商民主实践 - 上城分中心.json';
import data5 from './5. 委员履职平台.json';
import data6 from './6. 星级委员工作室风采.json';
import data7 from './7. 2026 年履职计划.json';

const sections = [
  { id: 1, name: '委员之家', icon: '🏠', color: '#e3f2fd', data: data1 },
  { id: 2, name: '街道委员小组', icon: '👥', color: '#e8f5e9', data: data2 },
  { id: 3, name: '界别基本情况', icon: '📊', color: '#fff3e0', data: data3 },
  { id: 4, name: '协商民主实践', icon: '🤝', color: '#fce4ec', data: data4 },
  { id: 5, name: '委员履职平台', icon: '💼', color: '#f3e5f5', data: data5 },
  { id: 6, name: '星级委员工作室', icon: '⭐', color: '#e0f7fa', data: data6 },
  { id: 7, name: '2026 年履职计划', icon: '📅', color: '#fff8e1', data: data7 },
];

// 首页
function Home() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        color: 'white',
        marginBottom: '50px',
        boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)'
      }}>
        <h1 style={{ fontSize: '42px', marginBottom: '12px', fontWeight: '600' }}>政协委员通</h1>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>政协委员工作资料平台</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '28px'
      }}>
        {sections.map(section => {
          const images = section.data.filter(f => f.type === 'image');
          const docs = section.data.filter(f => f.textContent);
          
          return (
            <Link
              key={section.id}
              to={`/section/${section.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{
                padding: '32px',
                background: section.color,
                borderRadius: '16px',
                border: '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '2px solid #667eea';
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '2px solid transparent';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{ fontSize: '56px', marginBottom: '20px' }}>{section.icon}</div>
                <h3 style={{ fontSize: '22px', marginBottom: '12px', color: '#333', fontWeight: '600' }}>{section.name}</h3>
                <div style={{ display: 'flex', gap: '20px', color: '#666', fontSize: '15px' }}>
                  <span>🖼️ {images.length} 张图片</span>
                  <span>📄 {docs.length} 份文档</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// 板块详情页
function SectionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const section = sections.find(s => s.id === parseInt(id));

  if (!section) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>板块不存在</h1>
        <button onClick={() => navigate('/')} style={{
          padding: '12px 28px', background: '#667eea', color: 'white',
          border: 'none', borderRadius: '10px', cursor: 'pointer', marginTop: '20px', fontSize: '16px'
        }}>返回首页</button>
      </div>
    );
  }

  const images = section.data.filter(f => f.type === 'image');
  const documents = section.data.filter(f => f.textContent && f.textContent.trim().length > 0);

  // 图片画廊
  const ImageGallery = ({ images }) => (
    <div style={{ marginBottom: '50px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '28px'
      }}>
        {images.map((img, idx) => (
          <div key={idx} style={{
            background: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          >
            <div style={{
              width: '100%',
              minHeight: '240px',
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}>
              {img.contentBase64 ? (
                <img 
                  src={`data:image/jpeg;base64,${img.contentBase64}`} 
                  alt=""
                  style={{ maxWidth: '100%', maxHeight: '380px', objectFit: 'contain', borderRadius: '8px' }}
                />
              ) : (
                <span style={{ fontSize: '72px', color: '#dee2e6' }}>🖼️</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 文档内容展示 - 美化版，区分多个表格
  const DocumentContent = ({ doc, docIndex }) => {
    const isExcel = doc.type === 'excel';
    
    // 解析 Excel 表格数据，按 === 分隔不同表格
    const parseTableData = (text) => {
      if (!text) return [];
      const sections = text.split('===').filter(s => s.trim());
      return sections.map(section => {
        const lines = section.trim().split('\n').filter(l => l.trim());
        let sheetName = lines[0] ? lines[0].trim() : '表格';
        // 去掉 "Sheet1" 这样的前缀
        if (sheetName.toLowerCase().startsWith('sheet')) {
          sheetName = '数据表格';
        }
        const rows = lines.slice(1).map(line => {
          // 分割并清理单元格
          let cells = line.split('|').map(c => c.trim());
          // 去掉尾部空单元格
          while (cells.length > 0 && cells[cells.length - 1] === '') {
            cells.pop();
          }
          return cells;
        }).filter(row => row.length > 0 && row.some(c => c));
        return { sheetName, rows };
      });
    };

    const tables = isExcel ? parseTableData(doc.textContent) : [];

    return (
      <div style={{
        marginBottom: '40px',
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #e9ecef'
      }}>
        <div style={{
          padding: '32px',
          fontSize: '15px',
          color: '#333',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}>
          {isExcel && tables.length > 0 ? (
            // 多个表格，每个表格分开显示
            <div>
              {tables.map((table, tableIdx) => (
                <div key={tableIdx} style={{ marginBottom: tableIdx < tables.length - 1 ? '48px' : '0' }}>
                  {/* 表格标题 */}
                  {table.sheetName && table.sheetName !== '表格' && (
                    <div style={{
                      padding: '16px 20px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: '600',
                      marginBottom: '0',
                      borderRadius: '12px 12px 0 0'
                    }}>
                      {table.sheetName}
                    </div>
                  )}
                  
                  {/* 表格内容 */}
                  {table.rows.length > 0 && (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        fontSize: '14px',
                        borderRadius: table.sheetName && table.sheetName !== '表格' ? '0 0 12px 12px' : '12px',
                        overflow: 'hidden'
                      }}>
                        <thead>
                          <tr style={{
                            background: table.sheetName && table.sheetName !== '表格' 
                              ? '#f8f9fa' 
                              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: '#333'
                          }}>
                            {table.rows[0].map((cell, idx) => (
                              <th key={idx} style={{
                                padding: '16px 12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                border: '2px solid #dee2e6',
                                minWidth: '120px',
                                background: table.sheetName && table.sheetName !== '表格' ? '#f8f9fa' : '#667eea',
                                color: table.sheetName && table.sheetName !== '表格' ? '#333' : 'white'
                              }}>
                                {cell || ' '}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {table.rows.slice(1).map((row, rowIdx) => (
                            <tr key={rowIdx} style={{
                              background: rowIdx % 2 === 0 ? '#ffffff' : '#f8f9fa'
                            }}>
                              {row.map((cell, cellIdx) => (
                                <td key={cellIdx} style={{
                                  padding: '14px 12px',
                                  border: '2px solid #dee2e6',
                                  color: '#333',
                                  verticalAlign: 'top'
                                }}>
                                  {cell || ' '}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // 普通文档内容
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '2.2' }}>
              {doc.textContent || '暂无内容'}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto' }}>
      <button onClick={() => navigate('/')} style={{
        padding: '10px 20px',
        background: 'white',
        border: '1px solid #e9ecef',
        borderRadius: '10px',
        cursor: 'pointer',
        marginBottom: '28px',
        fontSize: '14px',
        color: '#667eea',
        fontWeight: '500',
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#667eea';
        e.currentTarget.style.color = 'white';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'white';
        e.currentTarget.style.color = '#667eea';
      }}
      >← 返回首页</button>

      <div style={{
        padding: '40px',
        background: section.color,
        borderRadius: '20px',
        marginBottom: '40px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.05)'
      }}>
        <div style={{ fontSize: '56px', marginBottom: '16px' }}>{section.icon}</div>
        <h1 style={{ fontSize: '32px', color: '#333', marginBottom: '12px', fontWeight: '600' }}>{section.name}</h1>
        <div style={{ color: '#666', fontSize: '16px' }}>
          {images.length} 张图片 · {documents.length} 份文档
        </div>
      </div>

      {images.length > 0 && <ImageGallery images={images} />}
      
      {documents.length > 0 && (
        <div>
          {documents.map((doc, idx) => (
            <DocumentContent key={idx} doc={doc} docIndex={idx} />
          ))}
        </div>
      )}

      {section.data.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#999' }}>
          <div style={{ fontSize: '72px', marginBottom: '20px' }}>📭</div>
          <div style={{ fontSize: '20px' }}>暂无内容</div>
        </div>
      )}

      {section.data.length > 0 && documents.length === 0 && images.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#999' }}>
          <div style={{ fontSize: '72px', marginBottom: '20px' }}>📭</div>
          <div style={{ fontSize: '20px' }}>该板块暂无可展示内容</div>
        </div>
      )}
    </div>
  );
}

// 主应用
function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/section/:id" element={<SectionDetail />} />
      </Routes>
    </div>
  );
}

export default App;
