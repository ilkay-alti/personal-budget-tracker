import { PrismaClient } from "@prisma/client/extension";

// Prisma Client Singleton
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  const prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;
// Eğer uygulama üretim ortamında değilse globalde sakla
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
