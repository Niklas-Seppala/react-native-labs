export const trimTextFields = (data) => {
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const fieldVal = data[key];
      if (typeof fieldVal === 'string') data[key] = fieldVal.trim();
    }
  }
};

export const extractFilename = (path) => path.replace(/^.*[\\\/]/, '');

export const extractFileExt = (filename) => filename.split('.').pop();  
