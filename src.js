import React from 'react';
import { useDrag } from 'react-dnd';

const Box = ({ name }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: 'box' },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <input ref={drag} type="file" style={{ opacity: isDragging ? 0.5 : 1 }} />
  );
};

export default Box;
