'use strict';

let debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

let filter = (text, dataSource) => {
  if (!text || text.length <= 1) return dataSource;

  let items = dataSource.filter((f) => {
    if (f.definitionFr) {
      return f.definitionFr.toLowerCase().indexOf(text.toLowerCase()) !== -1;
    } else {
      return false;
    }
  });

  return items;
};

let paginate = (array, page_size, page_number) => {
  return array.slice(
    page_number * page_size,
    page_number * page_size + page_size
  );
};

export { debounce, filter, paginate };
