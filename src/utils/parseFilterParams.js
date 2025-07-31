const parseType = (contactType) => {
  if (typeof contactType !== 'string') return;

  const validTypes = ['work', 'home', 'personal'];
  if (validTypes.includes(contactType)) {
    return contactType;
  }
};

const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite === 'string') {
    return isFavourite === 'true';
  }
  if (typeof isFavourite === 'boolean') {
    return isFavourite;
  }
  return undefined;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  const filter = {};
  if (parsedType) filter.contactType = parsedType;
  if (typeof parsedIsFavourite !== 'undefined') {
    filter.isFavourite = parsedIsFavourite;
  }

  return filter;
};