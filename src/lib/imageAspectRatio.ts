export function getDefaultInteractiveAspectRatio(characterId?: string) {
  return characterId === 'diablo' ? '656 / 1609' : '4 / 5';
}

export function readImageAspectRatio(src?: string, fallback = '4 / 5'): Promise<string> {
  if (!src || typeof window === 'undefined') {
    return Promise.resolve(fallback);
  }

  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      if (!image.naturalWidth || !image.naturalHeight) {
        resolve(fallback);
        return;
      }

      resolve(`${image.naturalWidth} / ${image.naturalHeight}`);
    };
    image.onerror = () => resolve(fallback);
    image.src = src;
  });
}