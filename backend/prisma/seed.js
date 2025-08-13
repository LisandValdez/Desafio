const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.note.createMany({
    data: [
      { title: 'First example', content: 'Content of the first note' },
      { title: 'Archived note', content: 'This note is archived', archived: true }
    ]
  });
  console.log('Seed completado');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());