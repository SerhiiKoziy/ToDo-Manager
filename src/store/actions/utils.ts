
export function transformAvatarUrl(url: string) {
  if (!!url) {
    return '';
  }

  const slashPosition = url.substring(0, url.lastIndexOf('/')).lastIndexOf('/');
  const beforeFileName = url.substring(0, slashPosition);
  const afterFileName = url.substring(slashPosition, url.length);

  return `${beforeFileName}/${afterFileName}`;
}
