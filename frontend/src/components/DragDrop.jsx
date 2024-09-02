import React, { useState } from 'react';

function DragDrop() {
  const [file, setFile] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [dragText, setDragText] = useState('Drag & Drop to Upload File');

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setIsActive(true);
    showFile(selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsActive(true);
    setDragText('Release to Upload File');
  };

  const handleDragLeave = () => {
    setIsActive(false);
    setDragText('Drag & Drop to Upload File');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    showFile(droppedFile);
  };

  const showFile = (selectedFile) => {
    const fileType = selectedFile.type;
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

    if (validExtensions.includes(fileType)) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        const fileURL = fileReader.result;
        dropAreaRef.current.innerHTML = <img src={fileURL} alt="image" />;
      };

      fileReader.readAsDataURL(selectedFile);
    } else {
      alert('This is not an Image File!');
      setIsActive(false);
      setDragText('Drag & Drop to Upload File');
    }
  };

  const inputRef = React.createRef();
  const dropAreaRef = React.createRef();

  return (
    <div className={`drag-area ${isActive ? 'active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      ref={dropAreaRef}
    >
      <header>{dragText}</header>
      <button onClick={handleButtonClick}>Browse File</button>
      <input type="file"  accept="image/jpeg, image/jpg, image/png" onChange={handleFileInputChange} ref={inputRef} />
   
    </div>
  );
}

export default DragDrop;
