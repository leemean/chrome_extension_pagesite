import React, { useEffect, useRef } from 'react';

import PanelHeader from './PanelHeader';
import Resizer from './Resizer';

import { Direction } from './Resizer/constants';

import './styles.css';

const Panel = ({widgetName, children }) => {
  const panelRef = useRef(null);
  //const [getPosition,setPosition] = setState();
  //const [getSize,setSize] = setState();

  useEffect(() => {
    const panel = panelRef.current;
    chrome.storage.local.get(['todoListPosition'], (result)=>{
      const todoListPosition = result.todoListPosition;
      if(todoListPosition) {
        console.log('position get from local storage');
        panel.style.left = `${todoListPosition.x}px`;
        panel.style.top = `${todoListPosition.y}px`;
      }
    });

    chrome.storage.local.get(['todoListSize'], (result)=>{
      const todoListSize = result.todoListSize;
      if(todoListSize) {
        console.log('size get from local storage');
        panel.style.width = `${todoListSize.width}px`;
        panel.style.height = `${todoListSize.height}px`;
      }
    });

  },[]);

  const handleDrag = (movementX, movementY) => {
    const panel = panelRef.current;
    if (!panel) return;

    const { x, y } = panel.getBoundingClientRect();

    panel.style.left = `${x + movementX}px`;
    panel.style.top = `${y + movementY}px`;
  };

  const handleResize = (direction, movementX, movementY) => {
    const panel = panelRef.current;
    if (!panel) return;

    const { width, height, x, y } = panel.getBoundingClientRect();

    const resizeTop = () => {
      panel.style.height = `${height - movementY}px`;
      panel.style.top = `${y + movementY}px`;
    };

    const resizeRight = () => {
      panel.style.width = `${width + movementX}px`;
    };

    const resizeBottom = () => {
      panel.style.height = `${height + movementY}px`;
    };

    const resizeLeft = () => {
      panel.style.width = `${width - movementX}px`;
      panel.style.left = `${x + movementX}px`;
    };

    switch (direction) {
      case Direction.TopLeft:
        resizeTop();
        resizeLeft();
        break;

      case Direction.Top:
        resizeTop();
        break;

      case Direction.TopRight:
        resizeTop();
        resizeRight();
        break;

      case Direction.Right:
        resizeRight();
        break;

      case Direction.BottomRight:
        resizeBottom();
        resizeRight();
        break;

      case Direction.Bottom:
        resizeBottom();
        break;

      case Direction.BottomLeft:
        resizeBottom();
        resizeLeft();
        break;

      case Direction.Left:
        resizeLeft();
        break;

      default:
        break;
      }
  };

  const handleMouseUp = () => {
    console.log('mouse up');
    const panel = panelRef.current;
    const { x, y } = panel.getBoundingClientRect();
    var position = { x: x,y: y }
    chrome.storage.local.set({todoListPosition:position});
  }

  const handleResizeComplete = () => {
    console.log('resize complete');
    const panel = panelRef.current;
    const { width, height } = panel.getBoundingClientRect();
    var size = { width: width,height: height }
    chrome.storage.local.set({todoListSize:size});
  }

  return (
    <div className="panel" ref={panelRef}>
      <div className="panel__container">
        <Resizer onResize={handleResize} onResizeComplete={handleResizeComplete} />
        
        <PanelHeader onDrag={handleDrag} onMouseUp={handleMouseUp} headerContent={widgetName} />

        <div className="panel__content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Panel;



