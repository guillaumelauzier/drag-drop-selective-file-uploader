# drag-drop-selective-file-uploader

To connect the drag and drop code from the react-dnd library to the selective file uploader code in JavaScript, you can do the following:

Modify the Box component to render a file input element instead of a div element. This will allow the user to select files using the drag and drop component:
```
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
```

Modify the DropBox component to render the file input element and add the event listeners that implement the selective file uploader behavior:

```
import React from 'react';
import { useDrop } from 'react-dnd';

const DropBox = () => {
  const input = useRef();
  const [{ isOver }, drop] = useDrop({
    accept: 'box',
    drop: () => ({ name: 'DropBox' }),
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });
  useEffect(() => {
    input.current.addEventListener('change', () => {
      const files = input.current.files;
      // Only upload image files
      const imageFiles = [...files].filter(file => file.type.match(/image\/*/));
      input.current.files = imageFiles;
    });
    // You can also add a submit event listener to the form element here
  }, []);
  return (
    <div ref={drop}>
      <input ref={input} type="file" multiple />
      {isOver ? 'Release to drop' : 'Drag files here'}
    </div>
  );
};

export default DropBox;

```

This will allow the user to select files using the drag and drop component, and only image files will be uploaded when the form is submitted. You can customize the code to fit your specific needs, such as changing the URL of the server-side file upload handler and customizing the code that is executed when the form is submitted to send the selected files to the server using an HTTP request.
