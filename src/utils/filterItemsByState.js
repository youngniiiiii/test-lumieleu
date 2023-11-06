const filterItemsByState = (items, status) => {
  if (!status) return items;

  return items?.filter((item) => item.state === status);
};

export default filterItemsByState