// selector function
export const sortAlpha = c => {
  const cc = [...c];
  cc.sort((a, b) => {
    return a.title
      ? a.title.localeCompare(b.title)
      : a.firstName.localeCompare(b.firstName);
  });
  return cc;
};

export const getBySlug = (objects, slug) => {
  return objects.find(o => o.slug === slug) || null;
};
