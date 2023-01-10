export const countChildren = (node) => {
  let count = 0;
  node.children?.forEach((child) => {
    count += countChildren(child);
  });
  return count + 1;
}

export const countLowerLevelChildren = (node) => {
  let count = 0;
  node.children?.forEach((child) => {
    count += countLowerLevelChildren(child);
  });
  return count + (node.children?.length || 0);
}
