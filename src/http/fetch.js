
export async function fetchImage(img) {
  const url = `https://unsplash.it/300/300?image=${img}`;
  const response = await fetch(url);
  const blob = await response.blob();

  if (!response.ok) {
    // throw Error(response.statusText);
    return false;
  }
  return blob;
}
