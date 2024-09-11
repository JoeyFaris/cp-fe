import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import ColorPalette from './ColorPalette';
import { API_URL } from '../config';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [colors, setColors] = useState(null);
  const [buttonText, setButtonText] = useState('Choose an Image or Drag & Drop');
  const [previewUrl, setPreviewUrl] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
    setError(null);
    setButtonText('Image Selected');
    setPreviewUrl(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setButtonText('Uploading...');
      console.log(API_URL);
      const response = await axios.post(`${API_URL}/api/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setButtonText('Success');
      setColors(response.data.colors);
      console.log(response.data);
    } catch (error) {
      setError('Error uploading image. Please try again.');
      setButtonText('Choose an Image or Drag & Drop');
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '30px', 
      minHeight: 'calc(100vh - 60px)', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.1)'
    }}>
      <div className="upload-container" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 className="upload-title" style={{
          color: '#3e364f',
          marginBottom: '20px'
        }}>Generate Your Color Palette</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div {...getRootProps()} className="dropzone" style={{
              border: isDragActive ? '4px dashed #3e364f' : '2px dashed #3e364f',
              borderRadius: '10px',
              padding: isDragActive ? '18px' : '20px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: isDragActive ? '#f0f0f0' : '#ffffff',
              flex: '1'
            }}
            onMouseEnter={(e) => {
              if (!isDragActive) {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
                e.currentTarget.style.border = '4px dashed #3e364f';
                e.currentTarget.style.padding = '18px';
              }
            }}
            onMouseLeave={(e) => {
              if (!isDragActive) {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.border = '2px dashed #3e364f';
                e.currentTarget.style.padding = '20px';
              }
            }}>
              <input {...getInputProps()} />
              <div className="dropzone-content">
                <i className="fas fa-cloud-upload-alt" style={{
                  fontSize: '48px',
                  color: '#3e364f',
                  marginBottom: '10px',
                  marginTop: '10px'
                }}></i>
                <p style={{
                  fontSize: '18px',
                  color: '#3e364f',
                  margin: '0'
                }}>
                  {isDragActive ? 'Drop your image here' : buttonText}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  marginTop: '10px'
                }}>
                  {selectedFile ? selectedFile.name : 'Supported formats: PNG, JPG, JPEG, GIF'}
                </p>
              </div>
            </div>
            {previewUrl && (
              <div style={{ flex: '1', textAlign: 'center' }}>
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '200px', 
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                  }} 
                />
              </div>
            )}
          </div>
          <button 
            type="submit" 
            className="upload-button" 
            style={{
              backgroundColor: selectedFile ? '#3e364f' : '#9da1aa',
              color: '#ffffff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: selectedFile ? 'pointer' : 'not-allowed',
              fontSize: '16px',
              marginTop: '20px',
              transition: 'all 0.3s ease',
              opacity: selectedFile ? 1 : 0.7,
            }}
            onMouseEnter={(e) => {
              if (selectedFile) {
                e.currentTarget.style.backgroundColor = '#2a2536';
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedFile) {
                e.currentTarget.style.backgroundColor = '#3e364f';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
            disabled={!selectedFile}
          >
            <i className="fas fa-magic"></i> Create Palette
          </button>
        </form>
      </div>
      {error && <p style={{ color: 'red', textAlign: 'center', width: '100%', fontSize: '14px', marginTop: '20px' }}>{error}</p>}
      
      {colors && (
        <ColorPalette colors={colors} />
      )}
    </div>
  );
};

export default ImageUpload;
