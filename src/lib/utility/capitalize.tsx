const capitalize = (str: string) => {
  if (!str || typeof str !== 'string') {
    return str;
  }

  const arr = str.split(' ');

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  return arr.join(' ');
};

export default capitalize;
