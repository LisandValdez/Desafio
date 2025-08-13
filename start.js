// start.js
const { spawn } = require('child_process');

function run(command, args, opts = {}) {
  return new Promise((res, rej) => {
    const p = spawn(command, args, { stdio: 'inherit', shell: true, ...opts });
    p.on('close', (code) => (code === 0 ? res() : rej(new Error(`${command} ${args.join(' ')} exited ${code}`))));
  });
}


async function waitForPostgres() {
  console.log('⏳ Esperando a Postgres...');
  const maxAttempts = 120;
  let attempts = 0;
  while (attempts < maxAttempts) {
    try {
      await run('docker', ['exec', 'notes-db', 'pg_isready', '-U', 'postgres']);
      console.log('✅ Postgres listo');
      return;
    } catch (e) {
      attempts++;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  throw new Error('Postgres no respondió a tiempo');
}

(async () => {
  try {
    console.log('🚀 Levantando servicios con docker-compose...');
    await run('docker-compose', ['up', '-d', '--build']);

    await waitForPostgres();

    console.log('📦 Ejecutando migraciones (Prisma)...');
    await run('docker', ['exec', 'notes-backend', 'npx', 'prisma', 'migrate', 'deploy']);

    console.log('🌱 Ejecutando seed (si existe)...');
    try {
      await run('docker', ['exec', 'notes-backend', 'node', 'prisma/seed.js']);
    } catch (e) {
      console.log('⚠️ Seed no ejecutada (archivo no encontrado o error), continuando...');
    }

    console.log('\n✅ Servicios listos:');
    console.log('- Frontend: http://localhost:5173');
    console.log('- Backend API: http://localhost:3000/api');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
})();