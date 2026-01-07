const prisma = require('../config/prisma');

exports.getJobs = async (req, res) => {
    try {
        const { industry, seniority, techStack, minSalary, maxSalary, search } = req.query;

        let where = {};

        if (industry) where.industry = industry;
        if (seniority) where.seniority = seniority;
        if (techStack) {
            where.techStack = {
                contains: techStack
            };
        }

        if (search) {
            where.OR = [
                { title: { contains: search } },
                { company: { contains: search } },
                { description: { contains: search } }
            ];
        }

        // Simple salary filtering (assuming salary is stored or can be parsed)
        // For now, keeping it simple as salary is currently a String in schema

        const jobs = await prisma.job.findMany({
            where,
            orderBy: { postedAt: 'desc' },
            include: {
                creator: {
                    select: {
                        name: true,
                        avatar: true
                    }
                }
            }
        });

        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createJob = async (req, res) => {
    try {
        const { title, company, location, type, remote, description, requirements, salary, platform, techStack, industry, seniority } = req.body;

        const job = await prisma.job.create({
            data: {
                title,
                company,
                location,
                type,
                remote: remote === 'true' || remote === true,
                description,
                requirements,
                salary,
                platform,
                techStack,
                industry,
                seniority,
                creatorId: req.user.id
            }
        });

        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await prisma.job.findUnique({
            where: { id: req.params.id },
            include: {
                creator: {
                    select: {
                        name: true,
                        avatar: true
                    }
                }
            }
        });

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const jobFetcher = require('../services/jobFetcher.service');

exports.syncJobs = async (req, res) => {
    try {
        const result = await jobFetcher.fetchAndSyncJobs();
        res.json({ message: 'Jobs synced successfully', count: result.count });
    } catch (error) {
        res.status(500).json({ message: 'Error syncing jobs', error: error.message });
    }
};
