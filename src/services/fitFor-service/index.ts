import { notFoundError } from '../../errors/not-found-error';
import fitForRepository from '../../repositories/fitFor-repository';

async function createFitFor(nome: string) {
  const fitFor = await fitForRepository.createFitFor(nome);
  if (!fitFor) throw notFoundError();
  return fitFor;
}

const fitForService = {
  createFitFor
};

export default fitForService;
