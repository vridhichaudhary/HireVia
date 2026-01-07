const prisma = require('../config/prisma');

exports.applyToJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.user.id;

        const existingApplication = await prisma.application.findUnique({
            where: {
                jobId_userId: {
                    jobId,
                    userId
                }
            }
        });

        if (existingApplication) {
            return res.status(400).json({ message: 'Already applied to this job' });
        }

        const application = await prisma.application.create({
            data: {
                jobId,
                userId,
                status: 'Applied'
            }
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getUserApplications = async (req, res) => {
    try {
        const applications = await prisma.application.findMany({
            where: { userId: req.user.id },
            include: {
                job: true
            },
            orderBy: { appliedAt: 'desc' }
        });

        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const application = await prisma.application.update({
            where: { id },
            data: { status }
        });

        res.json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.application.delete({
            where: { id }
        });

        res.json({ message: 'Application removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
