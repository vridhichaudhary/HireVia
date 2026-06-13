const prisma = require('./config/prisma');

async function main() {
    console.log('Cleaning up The Muse jobs...');
    const deleted = await prisma.job.deleteMany({
        where: {
            platform: 'The Muse'
        }
    });
    console.log(`Successfully deleted ${deleted.count} The Muse jobs.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
