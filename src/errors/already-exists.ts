import { ApplicationError } from '../protocols';

export function AlreadyExists(): ApplicationError {
  return {
    name: 'AlreadyExists'
  };
}
