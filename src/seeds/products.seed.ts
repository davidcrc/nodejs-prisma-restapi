// TODO: change this for esm usage
const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createProducts() {
  const category = await prisma.category.create({
    data: {
      name: faker.commerce.department(),
    },
  });

  for (let i = 0; i < 5; i++) {
    const productName = faker.commerce.productName();
    const productPrice = Number(faker.commerce.price());

    const newProduct = await prisma.product.create({
      data: {
        name: productName,
        price: productPrice,
        category: {
          connect: {
            id: category.id,
          },
        },
      },
    });

    console.log(`Created product with ID: ${newProduct.id}`);
  }

  await prisma.$disconnect();
}

createProducts().catch((error) => {
  console.error(error);
  process.exit(1);
});
