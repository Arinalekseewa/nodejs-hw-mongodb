const parseType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isType = (contactType) => ['work', 'home', 'personal'].includes(contactType);

  if (isType(contactType)) return contactType;
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
