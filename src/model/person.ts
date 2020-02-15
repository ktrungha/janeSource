export enum Country {
  US = 'US', Canada = 'Canada', Mexico = 'Mexico',
};

export enum Animal {
  Pig = 'pig',
  Rabbit = 'rabbit',
  Cat = 'cat',
  Crocodile = 'crocodile',
  Bear = 'bear',
  Koala = 'koala',
};

export type Gender = 'male' | 'female';

export interface Person extends PendingPerson {
  name: string;
  gender: Gender;
  nationalities: Set<Country>;
  favoriteAnimal: Animal;
}

export interface PendingPerson {
  name: string;
  gender?: Gender;
  nationalities: Set<Country>;
  favoriteAnimal?: Animal;
}

export interface PendingPersonValidation {
  name?: string;
  gender?: string;
  nationalities?: string;
  favoriteAnimal?: string;
}

export function validatePendingPerson(pendingPerson: PendingPerson) {
  const retval: PendingPersonValidation = {};

  if (!pendingPerson.name) {
    retval.name = 'personValidation.noName';
  } else if (pendingPerson.name.length < 2) {
    retval.name = 'personValidation.nameTooShort';
  }

  if (pendingPerson.nationalities.size === 0) {
    retval.nationalities = 'personValidation.noNationailty';
  }

  if (!pendingPerson.gender) {
    retval.gender = 'personValidation.noGender';
  }

  if (!pendingPerson.favoriteAnimal) {
    retval.favoriteAnimal = 'personValidation.noFavoriteAnimal';
  }

  return retval;
}

export const defaultPerson = { name: '', nationalities: new Set<Country>() };
