export const parseBlocks = (str: string): number => {
  if (!str) return 0;
  const num = parseInt(str.replace("+", ""), 10);
  return isNaN(num) ? 0 : num;
};
