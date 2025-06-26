import { createOptimizedPicture } from '../../scripts/aem.js';
import { fetchPlaceholdersForLocale } from '../../scripts/scripts.js';
import { getConfigValue } from '../../scripts/configs.js';

export default async function decorate(block) {
  const placeholders = await fetchPlaceholdersForLocale();
  const imagePath = block.querySelector('.section .image-with-text p').innerHTML;
// const imageContainer = createOptimizedPicture(imagePath, '', false, [{ media: '(min-width: 600px)', width: '2000' }, { width: '750' }]);

  // rendering image basedon authored link
  const imageContainer = document.createElement('img');
  imageContainer.classList.add('image-with-text');
  imageContainer.setAttribute('src', imagePath);
  imageContainer.setAttribute('alt', 'image-with-text');

  // rendering text via code
  const textContainer = document.createElement('p');
  textContainer.classList.add(`${placeholders.textContainerClass}`);
  textContainer.innerText = placeholders.subText || 'This is the testing content';
  textContainer.setAttribute('id', 'image-text');
  const textContainerConfig = await getConfigValue('set-class-for-text-container');
  if (textContainerConfig) {
    textContainer.classList.add('text-container-class');
  } else {
    textContainer.classList.add('text-container-test');
  }
  block.innerHTML = '';
  block.append(textContainer);
  block.append(imageContainer);
}
