import { createOptimizedPicture } from '../../scripts/aem.js';
import { getConfigValue } from '../../scripts/configs.js';

export default async function decorate(block) {
  const imagePath = block.querySelector('.section .highlightbox p').innerHTML;
  const imageContainer = createOptimizedPicture(imagePath, '', false, [{ media: '(max-width: 600px)', width: '100' }, { media: '(min-width: 1200px)', width: '6000' }, { width: '750' }]);
  // rendering image basedon authored link
  // const imageContainer = document.createElement('img');
  // imageContainer.classList.add('image-with-text');
  // imageContainer.setAttribute('src', imagePath);
  // imageContainer.setAttribute('alt', 'image-with-text');
  // rendering text via code
  const textContainer = document.createElement('p');
  // textContainer.classList.add(`${placeholders.textContainerClass}`);
  // textContainer.innerText = placeholders.subText || 'This is the testing content';
  textContainer.setAttribute('id', 'image-text');

  const userApi = await getConfigValue('get-user-api');

  fetch(`${userApi}users`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((user) => {
        const p = document.createElement('p');
        p.textContent = user.name;
        block.append(p);
      });
    });

  // block.innerHTML = '';
  block.append(textContainer);
  block.append(imageContainer);
}
