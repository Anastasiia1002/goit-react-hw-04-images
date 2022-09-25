// import axios from 'axios';

// export const searchImages = ({ search, page }) => {
//   return axios
//     .get('https://pixabay.com/api/', {
//       params: {
//         q: search,
//         page,
//         per_page: 12,
//         key: '29461295-5611ba5917eca01d45986ceff',
//         image_type: 'photo',
//         orientation: 'horizontal',
//       },
//     })
//     .then(({ data }) => data.hits);
// };

function searchImages(search, page = 1) {
  return fetch(
    `https://pixabay.com/api/?q=${search}&page=${page}&key=29461295-5611ba5917eca01d45986ceff&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then(x => new Promise(resolve => setTimeout(() => resolve(x), 1000))) // Задержка добавлена для тестирования Loader
    .then(res => res.json())
    .then(data => data.hits);
  //       .then(response => {
  //     if (response.ok) {
  //       return response.json();
  //     }

  //     return Promise.reject(new Error(`Відсутнє зображення з назвою ${search}`));
  //   });
}

const apiImages = {
  searchImages,
};

export default apiImages;
