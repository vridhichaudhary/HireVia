const prisma = require('./config/prisma');

async function main() {
    console.log('Cleaning up Arbeitnow jobs...');
    const deleted = await prisma.job.deleteMany({
        where: {
            platform: 'Arbeitnow'
        }
    });
    console.log(`Successfully deleted ${deleted.count} Arbeitnow jobs.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
