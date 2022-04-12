import React, { useState, useEffect } from 'react';

import '../styles.css';

const PanelHeader = ({ onDrag,onMouseUp,headerContent }) => {
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => { onMouseUp();setMouseDown(false); }

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.addEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const ratio = window.devicePixelRatio

    const handleMouseMove = (e) => onDrag(e.movementX / ratio, e.movementY / ratio);

    if (mouseDown) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseDown, onDrag]);

  const handleMouseDown = () => setMouseDown(true);

  return (
    <div className="panel__header" onMouseDown={handleMouseDown}>
      { headerContent }
    </div>
  );
}

export default PanelHeader;


