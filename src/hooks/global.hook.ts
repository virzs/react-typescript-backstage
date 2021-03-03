export const useSetWebTitle = (title: string): boolean => {
  try {
    document.title = `${title} - index-react`;
    return true;
  } catch (err) {
    return false;
  }
};
