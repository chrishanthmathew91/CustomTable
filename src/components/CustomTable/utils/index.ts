export const debounce = (func: Function, timeout: number = 300) => {
  let timer: number;
  return <T>(arg: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.call(this, arg);
    }, timeout);
  };
};
