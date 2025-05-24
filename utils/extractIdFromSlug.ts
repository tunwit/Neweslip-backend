export const extractIdFromSlug = (slug: string): number | null => {
  const id = slug.split("-").pop();
  return id && !isNaN(Number(id)) ? Number(id) : null;
};
