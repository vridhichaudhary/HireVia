const axios = require('axios');
const prisma = require('../config/prisma');

// Adzuna API (Optional — requires credentials in .env)
const ADZUNA_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_KEY = process.env.ADZUNA_APP_KEY;
const ADZUNA_API_URL = (country) => `https://api.adzuna.com/v1/api/jobs/${country}/search/1`;

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

        // ─── SOURCE 1: Jobicy ─────────────────────────────────────────────
        // Free, no API key, English-only, real-time remote jobs
        console.log('Syncing from Jobicy...');
        const JOBICY_INDUSTRIES = ['engineering', 'design', 'marketing', 'management', 'writing', 'business', 'customer-support', 'data'];
        for (const industry of JOBICY_INDUSTRIES) {
            try {
                const url = `https://jobicy.com/api/v2/remote-jobs?count=50&industry=${industry}`;
                const response = await axios.get(url);
                const jobs = response.data.jobs || [];

                for (const job of jobs) {
                    const externalId = `jobicy-${job.id}`;
                    const salary = job.salaryMin
                        ? `${job.salaryCurrency || '$'}${job.salaryMin?.toLocaleString()} - ${job.salaryCurrency || '$'}${job.salaryMax?.toLocaleString()} / ${job.salaryPeriod || 'year'}`
                        : null;

                    const jobData = {
                        title: job.jobTitle,
                        company: job.companyName,
                        location: job.jobGeo || 'Remote',
                        type: Array.isArray(job.jobType) ? job.jobType[0] : (job.jobType || 'Full-time'),
                        remote: true,
                        description: job.jobDescription || job.jobExcerpt || '',
                        requirements: 'See original post for full requirements.',
                        salary,
                        platform: 'Jobicy',
                        techStack: '',
                        industry: Array.isArray(job.jobIndustry) ? job.jobIndustry[0] : (job.jobIndustry || industry),
                        seniority: job.jobLevel || 'Mid-Senior',
                        externalId,
                        applyUrl: job.url, // direct jobicy link
                        postedAt: new Date(job.pubDate),
                        creatorId: systemUser.id
                    };

                    await prisma.job.upsert({
                        where: { externalId },
                        update: jobData,
                        create: jobData
                    });
                    totalSynced++;
                }
                console.log(`Synced ${jobs.length} jobs from Jobicy [${industry}]`);
            } catch (err) {
                console.error(`Error syncing Jobicy [${industry}]:`, err.message);
            }
        }

        // ─── SOURCE 2: Remote OK ──────────────────────────────────────────
        // Free, no API key, English-only, real-time remote tech jobs
        console.log('Syncing from Remote OK...');
        try {
            const response = await axios.get('https://remoteok.com/api', {
                headers: { 'User-Agent': 'HireVia Job Aggregator (contact: admin@hirevia.com)' }
            });
            // First element is a legal notice object — skip it
            const jobs = (response.data || []).filter(j => j.id && j.position);

            for (const job of jobs) {
                const externalId = `remoteok-${job.id}`;
                const salary = job.salary_min
                    ? `$${Number(job.salary_min).toLocaleString()} - $${Number(job.salary_max).toLocaleString()}`
                    : null;

                const jobData = {
                    title: job.position,
                    company: job.company,
                    location: 'Remote',
                    type: 'Full-time',
                    remote: true,
                    description: job.description || '',
                    requirements: 'See original post for full requirements.',
                    salary,
                    platform: 'Remote OK',
                    techStack: job.tags ? job.tags.slice(0, 8).join(', ').substring(0, 191) : '',
                    industry: 'Tech',
                    seniority: 'Mid-Senior',
                    externalId,
                    applyUrl: job.apply_url || job.url,
                    postedAt: new Date(job.epoch * 1000),
                    creatorId: systemUser.id
                };

                await prisma.job.upsert({
                    where: { externalId },
                    update: jobData,
                    create: jobData
                });
                totalSynced++;
            }
            console.log(`Synced ${jobs.length} jobs from Remote OK`);
        } catch (err) {
            console.error('Error syncing Remote OK:', err.message);
        }

        // ─── SOURCE 3: Adzuna (optional) ─────────────────────────────────
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
                        title: job.title.replace(/<\/?[^>]+(>|$)/g, ''),
                        company: job.company?.display_name || 'Unknown',
                        location: job.location?.display_name || 'India',
                        type: job.contract_type || 'Full-time',
                        remote: job.title.toLowerCase().includes('remote'),
                        description: job.description,
                        requirements: 'See original post for requirements.',
                        salary: job.salary_min ? `₹${job.salary_min} - ₹${job.salary_max}` : null,
                        platform: 'Adzuna',
                        techStack: '',
                        industry: job.category?.label || 'Tech',
                        seniority: 'Mid-Senior',
                        externalId,
                        applyUrl: job.redirect_url,
                        postedAt: new Date(job.created),
                        creatorId: systemUser.id
                    };

                    await prisma.job.upsert({
                        where: { externalId },
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

        console.log(`Multi-source sync complete. Total jobs processed/updated: ${totalSynced}`);
        return { count: totalSynced, message: 'Multi-source sync successful' };

    } catch (error) {
        console.error('Critical error in job sync:', error);
        throw error;
    }
};
