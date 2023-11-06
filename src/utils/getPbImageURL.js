// const PB = import.meta.env.VITE_PB_URL;
// export const getPbImageURL = (item, fileName = 'photo') =>
//   `${PB}/api/files/${item.collectionId}/${item.id}/${item[fileName]}`

const PB = import.meta.env.VITE_PB_URL;

export const getPbImageURL = (item, fileNames = ['photo']) => {
  if (!Array.isArray(fileNames)) {
    fileNames = [fileNames];
  }

  const urls = [];

  fileNames.forEach((fileName) => {
    if (Array.isArray(item[fileName])) {
      item[fileName].forEach((photo) => {
        urls.push(`${PB}/api/files/${item.collectionId}/${item.id}/${photo}`);
      });
    } else {
      urls.push(
        `${PB}/api/files/${item.collectionId}/${item.id}/${item[fileName]}`
      );
    }
  });
  return urls;
};
