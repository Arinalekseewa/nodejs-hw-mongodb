const parseType = (contactType) => {
  if (typeof contactType !== 'string') return;
  const validTypes = ['work', 'home', 'personal'];
  return validTypes.includes(contactType) ? contactType : undefined;
};

const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite === 'undefined') return undefined;
  return isFavourite === 'true';
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  const filter = {};
  if (parsedType) filter.contactType = parsedType;
  if (typeof parsedIsFavourite !== 'undefined') filter.isFavourite = parsedIsFavourite;

  return filter;
};
