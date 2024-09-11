import React from 'react';

const ColorPalette = ({ colors }) => {
  const copyColor = (color) => {
    navigator.clipboard.writeText(color)
      .then(() => alert('Color copied to clipboard!'))
      .catch(err => console.error('Failed to copy color: ', err));
  };

  const copyAllColors = () => {
    const allColors = [colors.dominant_color, ...colors.palette];
    navigator.clipboard.writeText(allColors.join(', '))
      .then(() => alert('All colors copied to clipboard!'))
      .catch(err => console.error('Failed to copy colors: ', err));
  };

  const ColorBox = ({ color, size }) => (
    <div style={{ textAlign: 'center', margin: '8px' }}>
      <div
        style={{
          backgroundColor: color,
          width: size,
          height: size,
          margin: '0 auto',
          border: '2px solid #9da1aa',
          borderRadius: '4px',
        }}
      ></div>
      <div style={{ 
        backgroundColor: '#e0e0e0', 
        padding: '4px',
        fontSize: size === '120px' ? '14px' : '12px',
        width: size,
        margin: '0 auto',
        borderRadius: '0 0 4px 4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {color}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          style={{ cursor: 'pointer', width: size === '120px' ? '16px' : '14px', height: size === '120px' ? '16px' : '14px', marginLeft: '5px' }}
          onClick={() => copyColor(color)}
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </div>
    </div>
  );

  const sortColorsByBrightness = (colors) => {
    return [...colors].sort((a, b) => {
      const getBrightness = (color) => {
        const rgb = parseInt(color.slice(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >>  8) & 0xff;
        const b = (rgb >>  0) & 0xff;
        return (r * 299 + g * 587 + b * 114) / 1000;
      };
      return getBrightness(b) - getBrightness(a);
    });
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px', marginTop: '30px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '15px', padding: '20px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ color: '#2e2a3d', textAlign: 'center', marginTop: '20px', fontSize: '20px' }}>Dominant Color</h3>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <ColorBox color={colors.dominant_color} size="120px" />
      </div>
      <h3 style={{ color: '#2e2a3d', textAlign: 'center', marginTop: '20px', fontSize: '20px' }}>Color Palette</h3>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {sortColorsByBrightness(colors.palette).map((color, index) => (
          <ColorBox key={index} color={color} size="80px" />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button 
          onClick={copyAllColors}
          style={{
            backgroundColor: '#3e364f',
            color: '#ffffff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2a2536';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#3e364f';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            style={{ width: '18px', height: '18px', marginRight: '8px' }}
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          Copy All Colors
        </button>
      </div>
    </div>
  );
};

export default ColorPalette;
