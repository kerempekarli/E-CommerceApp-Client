const { URL } = require("url");
export const checkImageAspectRatio = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const aspectRatio = width / height;
      const isSquare = aspectRatio === 1;

      resolve(isSquare);
    };

    img.onerror = () => {
      reject(new Error("Fotoğraf yüklenirken bir hata oluştu."));
    };
  });
};

// const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       checkImageAspectRatio(file)
//         .then((isSquare) => {
//           if (isSquare) {
//             // Kare fotoğraf işlemleri
//             // ...
//           } else {
//             console.log('Yüklenen fotoğraf kare olmalıdır.');
//           }
//         })
//         .catch((error) => {
//           console.error('Fotoğraf yüklenirken bir hata oluştu:', error);
//         });
//     }
//   };
