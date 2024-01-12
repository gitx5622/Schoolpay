export const getCurrentPathName = (pathname) => {
  pathname.slice(6, -1);
  if (pathname === "school") {
    pagepathname === "school";
  } else if (pathname === "user") {
    pagepathname === "user";
  }
  return pagepathname;
};
