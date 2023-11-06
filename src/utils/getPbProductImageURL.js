// const PB = import.meta.env.VITE_PB_URL;
// export const getPbImageURL = (item, fileName = 'photo') =>
//   `${PB}/api/files/${item.collectionId}/${item.id}/${item[fileName]}`

const PB = import.meta.env.VITE_PB_URL;

// https://lumieleu.pockethost.io/api/files/4cqao3e5z0e1rfi/4qw42es34mvu7ma/9_title_xp9cJG1J9k.jpg
export const getPbProductImageURL = (item, fileNames = ['image']) => {
  if (!Array.isArray(fileNames)) {
    fileNames = [fileNames];
  }

  const urls = [];

  fileNames.forEach((fileName) => {
    if (Array.isArray(item[fileName])) {
      item[fileName].forEach((image) => {
        urls.push(
          `${PB}/api/files/${item.expand.product.collectionId}/${item.expand.product.id}/${image}`
        );
      });
    } else {
      urls.push(
        `${PB}/api/files/${item.expand.product.collectionId}/${item.expand.product.id}/${fileName}`
      );
    }
  });
  return urls;
};
