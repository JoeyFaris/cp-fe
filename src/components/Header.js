import React from 'react';

const Header = () => {
  const horizontalGradientStyle = {
    background: 'linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)',
    opacity: 0.7
  };

  const verticalGradientStyle = {
    background: 'linear-gradient(0deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)',
    opacity: 0.7
  };

  return (
    <header style={{
      background: 'linear-gradient(135deg, #3e364f 0%, #2c2639 100%)',
      padding: '30px 20px',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '5px',
        ...horizontalGradientStyle
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '5px',
        ...horizontalGradientStyle
      }}></div>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '5px',
        ...verticalGradientStyle
      }}></div>
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '5px',
        ...verticalGradientStyle
      }}></div>
      <h1 style={{
        margin: 0,
        color: '#ffffff',
        fontSize: '36px',
        fontWeight: '700',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        fontFamily: "'Montserrat', sans-serif"
      }}>
        Color Palette Generator
      </h1>
      <p style={{
        margin: '15px 0 0',
        color: '#e0e0e0',
        fontSize: '18px',
        fontWeight: '300',
        letterSpacing: '1px',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
        lineHeight: '1.6',
        fontFamily: "'Open Sans', sans-serif"
      }}>
        Transform your images into stunning color palettes with just a click
      </p>
      <div style={{
        marginTop: '25px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* <button style={{
          background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
          border: 'none',
          borderRadius: '30px',
          padding: '12px 30px',
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          fontFamily: "'Montserrat', sans-serif"
        }}>
          Get Started
        </button> */}
      </div>
    </header>
  );
};

export default Header;
