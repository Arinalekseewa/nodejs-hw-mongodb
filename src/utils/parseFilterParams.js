const parseType = (contactType) => {
    const isString = typeof contactType === 'string';
  if (!isString) return;
  const isType = (contactType) => ['work', 'home', 'personal'].includes(contactType);

  if (isType(contactType)) return contactType;
};

const parseIsFavourite = (isFavourite) => {
    const filter = {};
    if(typeof isFavourite !== 'undefined') {
        filter.isFavourite = isFavourite === 'true';
  }

  return filter;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

    const parsedType = parseType(contactType);
    const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
      contactType: parsedType,
      isFavourite: parsedIsFavourite,
  };
};