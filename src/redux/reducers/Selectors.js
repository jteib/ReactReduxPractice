// selector function
export const sortCourses = c => {
  const cc = [...c];
  cc.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });
  return cc;
};

export const sortAuthors = c => {
  const cc = [...c];
  cc.sort((a, b) => {
    return a.firstName.localeCompare(b.firstName);
  });
  return cc;
};

export const getBySlug = (objects, slug) => {
  return objects.find(o => o.slug === slug) || null;
};
