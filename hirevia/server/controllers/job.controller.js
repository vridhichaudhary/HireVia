const prisma = require('../config/prisma');

exports.getJobs = async (req, res) => {
    try {
        const { industry, seniority, techStack, minSalary, maxSalary, search, page = 1, limit = 10 } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        let where = {};

        if (industry) where.industry = industry;
        if (seniority) {
            // Support multiple seniority filters (array or single string)
            if (Array.isArray(seniority)) {
                where.seniority = { in: seniority };
            } else {
                where.seniority = seniority;
            }
        }
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

        // Parallel count and findMany for performance
        const [totalCount, jobs] = await Promise.all([
            prisma.job.count({ where }),
            prisma.job.findMany({
                where,
                skip,
                take: limitNum,
                orderBy: { postedAt: 'desc' },
                include: {
                    creator: {
                        select: {
                            name: true,
                            avatar: true
                        }
                    }
                }
            })
        ]);

        const totalPages = Math.ceil(totalCount / limitNum);

        res.json({
            jobs,
            pagination: {
                totalCount,
                totalPages,
                currentPage: pageNum,
                limit: limitNum
            }
        });
    } catch (error) {
        console.error('getJobs error:', error);
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
