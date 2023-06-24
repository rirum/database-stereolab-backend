import { aplicacoes } from '@prisma/client';
import diacritics from 'diacritics';

import prisma from '../../configs/database.connection';
import { AlreadyExists } from '../../errors/already-exists';

async function createFitFor(nome: string) {
  const normalizedName = diacritics.remove(nome.toLowerCase());

  const existingFit = await prisma.aplicacoes.findUnique({
    where: {
      nome: normalizedName
    }
  });

  if (existingFit) {
    throw AlreadyExists();
  }

  const fitFor = await prisma.aplicacoes.create({
    data: {
      nome: normalizedName
    }
  });
  return fitFor;
}

async function getAllFitFor(): Promise<aplicacoes[]> {
  const allFitFor = await prisma.aplicacoes.findMany();
  return allFitFor;
}

const fitForRepository = {
  createFitFor,
  getAllFitFor
};

export default fitForRepository;
