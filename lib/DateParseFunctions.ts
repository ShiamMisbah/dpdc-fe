// "2026-09-12" → "Sep 12, 2026":

export const formatDate = (dateString: string): string => {
  if (!dateString) return ""
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
