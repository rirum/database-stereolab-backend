import { ApplicationError } from '../protocols';

export function AlreadyExists(): ApplicationError {
  return {
    name: 'AlreadyExists',
    message: 'There was already a entry on the database!'
  };
}
