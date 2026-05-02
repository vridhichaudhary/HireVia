const axios = require('axios');
const prisma = require('../config/prisma');

// Adzuna API (Optional — requires credentials in .env)
const ADZUNA_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_KEY = process.env.ADZUNA_APP_KEY;
const ADZUNA_API_URL = (country) => `https://api.adzuna.com/v1/api/jobs/${country}/search/1`;

// Jooble API (Optional — requires key in .env)
const JOOBLE_KEY = process.env.JOOBLE_API_KEY;
const JOOBLE_API_URL = `https://jooble.org/api/${JOOBLE_KEY}`;

exports.fetchAndSyncJobs = async () => {
    try {
        console.log('Starting multi-source job sync...');

        // 1. Ensure System Bot User exists
        let systemUser = await prisma.user.findUnique({ where: { email: 'bot@hirevia.com' } });
        if (!systemUser) {
            systemUser = await prisma.user.create({
                data: {
                    email: 'bot@hirevia.com',
                    name: 'HireVia Bot',
                    password: 'system_secure_password',
                    role: 'ADMIN',
                    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=HireVia'
                }
            });
        }

        let totalSynced = 0;

        // 2. Fetch from Arbeitnow (free, no API key needed, real apply URLs)
        console.log('Syncing from Arbeitnow...');
        try {
            // Fetch multiple pages for more coverage
            for (let page = 1; page <= 4; page++) {
                const url = `https://www.arbeitnow.com/api/job-board-api?page=${page}`;
                const response = await axios.get(url);
                const jobs = response.data.data || [];

                if (jobs.length === 0) break;

                for (const job of jobs) {
                    const externalId = `arbeitnow-${job.slug}`;
                    const jobData = {
                        title: job.title.replace(/<\/?[^>]+(>|$)/g, ""),
                        company: job.company_name,
                        location: job.location || 'Remote',
                        type: job.job_types && job.job_types.length > 0 ? job.job_types[0] : 'Full-time',
                        remote: job.remote || false,
                        description: job.description,
                        requirements: 'See original post for requirements.',
                        salary: null,
                        platform: 'Arbeitnow',
                        techStack: job.tags ? job.tags.slice(0, 8).join(', ').substring(0, 191) : '',
                        industry: 'Tech',
                        seniority: 'Mid-Senior',
                        externalId: externalId,
                        applyUrl: job.url,
                        postedAt: new Date(job.created_at * 1000),
                        creatorId: systemUser.id
                    };

                    await prisma.job.upsert({
                        where: { externalId: externalId },
                        update: jobData,
                        create: jobData
                    });
                    totalSynced++;
                }
                console.log(`Synced ${jobs.length} jobs from Arbeitnow page ${page}`);
            }
        } catch (err) {
            console.error(`Error syncing Arbeitnow:`, err.message);
        }

        // 3. Fetch from Adzuna (optional — only if credentials are provided)
        if (ADZUNA_ID && ADZUNA_KEY) {
            console.log('Syncing from Adzuna (India)...');
            try {
                const response = await axios.get(ADZUNA_API_URL('in'), {
                    params: {
                        app_id: ADZUNA_ID,
                        app_key: ADZUNA_KEY,
                        results_per_page: 50,
                        what: 'developer',
                        content_type: 'application/json'
                    }
                });
                const jobs = response.data.results || [];

                for (const job of jobs) {
                    const externalId = `adzuna-${job.id}`;
                    const jobData = {
                        title: job.title.replace(/<\/?[^>]+(>|$)/g, ""),
                        company: job.company?.display_name || 'Unknown',
                        location: job.location?.display_name || 'India',
                        type: job.contract_type || 'Full-time',
                        remote: job.title.toLowerCase().includes('remote') || false,
                        description: job.description,
                        requirements: 'See original post for requirements.',
                        salary: job.salary_min ? `₹${job.salary_min} - ₹${job.salary_max}` : null,
                        platform: job.redirect_url.includes('indeed') ? 'Indeed' :
                            job.redirect_url.includes('naukri') ? 'Naukri' : 'Adzuna',
                        techStack: '',
                        industry: job.category?.label || 'Tech',
                        seniority: 'Mid-Senior',
                        externalId: externalId,
                        applyUrl: job.redirect_url,
                        postedAt: new Date(job.created),
                        creatorId: systemUser.id
                    };

                    await prisma.job.upsert({
                        where: { externalId: externalId },
                        update: jobData,
                        create: jobData
                    });
                    totalSynced++;
                }
                console.log(`Synced ${jobs.length} jobs from Adzuna.`);
            } catch (err) {
                console.error('Error syncing from Adzuna:', err.message);
            }
        }

        // 4. Fetch from Jooble (optional — only if key is provided)
        if (JOOBLE_KEY) {
            console.log('Syncing from Jooble...');
            try {
                const response = await axios.post(JOOBLE_API_URL, {
                    keywords: 'software engineer',
                    location: 'India',
                    page: 1
                });
                const jobs = response.data.jobs || [];

                for (const job of jobs) {
                    const externalId = `jooble-${job.id}`;
                    const jobData = {
                        title: job.title,
                        company: job.company || 'Unknown',
                        location: job.location || 'Remote',
                        type: job.type || 'Full-time',
                        remote: job.location?.toLowerCase().includes('remote') || false,
                        description: job.snippet,
                        requirements: 'See original post for requirements.',
                        salary: job.salary || null,
                        platform: job.source || 'Jooble',
                        techStack: '',
                        industry: 'General',
                        seniority: 'Mid-Senior',
                        externalId: externalId,
                        applyUrl: job.link,
                        postedAt: new Date(job.updated),
                        creatorId: systemUser.id
                    };

                    await prisma.job.upsert({
                        where: { externalId: externalId },
                        update: jobData,
                        create: jobData
                    });
                    totalSynced++;
                }
                console.log(`Synced ${jobs.length} jobs from Jooble.`);
            } catch (err) {
                console.error('Error syncing from Jooble:', err.message);
            }
        }

        console.log(`Multi-source sync complete. Total jobs processed/updated: ${totalSynced}`);
        return { count: totalSynced, message: 'Multi-source sync successful' };

    } catch (error) {
        console.error('Critical error in job sync:', error);
        throw error;
    }
};
