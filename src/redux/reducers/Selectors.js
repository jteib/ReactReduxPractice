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
    return a.name.localeCompare(b.name);
  });
  return cc;
};
