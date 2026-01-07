const axios = require('axios');
const prisma = require('../config/prisma');

const REMOTIVE_API_URL = 'https://remotive.com/api/remote-jobs?limit=50'; // Fetch 50 jobs for now

exports.fetchAndSyncJobs = async () => {
    try {
        console.log('Starting job sync from Remotive...');
        const response = await axios.get(REMOTIVE_API_URL);
        const externalJobs = response.data.jobs;

        if (!externalJobs || externalJobs.length === 0) {
            console.log('No jobs found from Remotive.');
            return { count: 0, message: 'No jobs found' };
        }

        // 1. Get or Create a "System Bot" user to own these jobs
        let systemUser = await prisma.user.findUnique({ where: { email: 'bot@hirevia.com' } });
        if (!systemUser) {
            systemUser = await prisma.user.create({
                data: {
                    email: 'bot@hirevia.com',
                    name: 'HireVia Bot',
                    password: 'system_secure_password', // In production, use strong random hash
                    role: 'ADMIN',
                    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=HireVia'
                }
            });
        }

        let addedCount = 0;
        let updatedCount = 0;

        for (const job of externalJobs) {
            const externalId = String(job.id);

            // Map Remotive data to our schema
            const jobData = {
                title: job.title,
                company: job.company_name,
                location: job.candidate_required_location || 'Remote',
                type: job.job_type || 'Full-time',
                remote: true, // Remotive lists remote jobs
                description: job.description, // HTML content
                requirements: 'See description for details.',
                salary: job.salary || null,
                platform: 'Remotive',
                techStack: job.tags ? job.tags.join(', ').substring(0, 191) : '',
                industry: job.category,
                seniority: 'Mid-Senior', // Defaulting as API might not provide granular level
                externalId: externalId,
                applyUrl: job.url,
                postedAt: new Date(job.publication_date),
                creatorId: systemUser.id
            };

            // Upsert: Create if new, Update if exists
            // Since externalId is unique, we can use upsert
            const savedJob = await prisma.job.upsert({
                where: { externalId: externalId },
                update: jobData,
                create: jobData
            });

            // Note: Upsert doesn't tell us if it was created or updated easily without checking created/updatedAt
            // But for summary we can just say synced.
        }

        console.log(`Synced ${externalJobs.length} jobs from Remotive.`);
        return { count: externalJobs.length, message: 'Sync successful' };

    } catch (error) {
        console.error('Error syncing jobs:', error);
        throw error;
    }
};
