function debounce(callback, timeout = 300) {
  let cleanup;
  return (...args) => {
    clearTimeout(cleanup);
    cleanup = setTimeout(callback.bind(null, ...args), timeout);
  };
}

export default debounce;

// bind call apply 찾아보기 - function prototype