
export function transformAvatarUrl(url) {
  if (url) {
    const slashPosition = url.substring(0, url.lastIndexOf('/')).lastIndexOf('/');
    const beforeFileName = url.substring(0, slashPosition);
    const afterFileName = url.substring(slashPosition, url.length);
    return `${beforeFileName}/${afterFileName}`;
  }

  return '';
}
