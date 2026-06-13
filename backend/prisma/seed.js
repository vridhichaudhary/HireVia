const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jobFetcher = require('../services/jobFetcher.service');

async function main() {
    console.log('Start seeding with external job APIs...');

    // 1. Create a dummy company user
    const companyEmail = 'demo@techcorp.com';
    let companyUser = await prisma.user.findUnique({
        where: { email: companyEmail },
    });

    if (!companyUser) {
        // Note: bcrypt is no longer imported as it's not used in the new seeding logic.
        // If companyUser creation still needs bcrypt, it should be re-added.
        // For this change, assuming companyUser creation is simplified or handled elsewhere.
        // Re-adding bcrypt for safety if it's still needed for this specific block.
        const bcrypt = require('bcryptjs'); // Re-add bcrypt locally if needed for this block
        companyUser = await prisma.user.create({
            data: {
                email: companyEmail,
                name: 'Tech Corp Recruiter',
                password: await bcrypt.hash('password123', 10),
                role: 'COMPANY',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
            },
        });
        console.log(`Created user: ${companyUser.name}`);
    } else {
        console.log(`User already exists: ${companyUser.name}`);
    }

    // Fetch and sync jobs from external APIs (Remotive, Adzuna, Jooble)
    try {
        const result = await jobFetcher.fetchAndSyncJobs();
        console.log(`Successfully synced ${result.count} jobs from external APIs`);
    } catch (error) {
        console.error('Error fetching jobs from external APIs:', error.message);
        console.log('Seeding will continue despite API errors...');
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
