const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
    console.log('Start seeding ...');

    // 1. Create a dummy company user
    const companyEmail = 'demo@techcorp.com';
    let companyUser = await prisma.user.findUnique({
        where: { email: companyEmail },
    });

    if (!companyUser) {
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

    // 2. Sample Jobs Data
    const jobsData = [
        {
            title: 'Senior Frontend Engineer',
            company: 'TechFlow',
            location: 'San Francisco, CA',
            type: 'Full-time',
            remote: true,
            description: 'We are looking for an experienced Frontend Engineer to lead our core product team. You will be working with React, Next.js, and TypeScript to build scalable user interfaces.',
            requirements: '5+ years of experience with React\nStrong understanding of web performance\nExperience with modern CSS frameworks (Tailwind)',
            salary: '$140k - $180k',
            techStack: 'React, Next.js, TypeScript, Tailwind',
            industry: 'Software',
            seniority: 'Senior',
            platform: 'LinkedIn'
        },
        {
            title: 'Full Stack Developer',
            company: 'GrowthRocket',
            location: 'New York, NY',
            type: 'Full-time',
            remote: false,
            description: 'Join a fast-paced startup building the next generation of marketing tools. You will work on both the Rails backend and React frontend.',
            requirements: '3+ years of full stack experience\nProficiency in Ruby on Rails and React\nExperience with PostgreSQL',
            salary: '$120k - $150k',
            techStack: 'Ruby on Rails, React, PostgreSQL, Docker',
            industry: 'Marketing Tech',
            seniority: 'Mid-Level',
            platform: 'Indeed'
        },
        {
            title: 'Product Designer',
            company: 'Creative Studio',
            location: 'Remote',
            type: 'Contract',
            remote: true,
            description: 'We need a talented Product Designer to help us redesign our mobile app. You will work closely with our product and engineering teams.',
            requirements: 'Portfolio demonstrating strong UI/UX skills\nExperience with Figma and prototyping tools',
            salary: '$80 - $120 / hr',
            techStack: 'Figma, Sketch, Adobe XD',
            industry: 'Design',
            seniority: 'Mid-Level',
            platform: 'Glassdoor'
        },
        {
            title: 'Backend Engineer (Go)',
            company: 'CloudScale',
            location: 'Seattle, WA',
            type: 'Full-time',
            remote: true,
            description: 'Help us build high-performance distributed systems in Go. You will deal with high-concurrency challenges.',
            requirements: 'In-depth knowledge of Go (Golang)\nExperience with Kubernetes and microservices',
            salary: '$150k - $190k',
            techStack: 'Go, Kubernetes, AWS, Grpc',
            industry: 'Cloud Infrastructure',
            seniority: 'Senior',
            platform: 'BuiltIn'
        },
        {
            title: 'Junior React Developer',
            company: 'StartUp Inc',
            location: 'Austin, TX',
            type: 'Internship',
            remote: false,
            description: 'Great opportunity for a junior developer to learn from a seasoned team. You will assist with frontend bug fixes and feature development.',
            requirements: 'Basic knowledge of React and JavaScript\nWillingness to learn',
            salary: '$60k - $80k',
            techStack: 'React, JavaScript, HTML, CSS',
            industry: 'Software',
            seniority: 'Junior',
            platform: 'Handshake'
        },
        {
            title: 'DevOps Engineer',
            company: 'SecureNet',
            location: 'Chicago, IL',
            type: 'Full-time',
            remote: true,
            description: 'Manage our CI/CD pipelines and cloud infrastructure. Security first mindset is a must.',
            requirements: 'Experience with AWS/Azure\nKnowledge of Jenkins or GitHub Actions\nTerraform experience',
            salary: '$130k - $160k',
            techStack: 'AWS, Terraform, Jenkins, Python',
            industry: 'Cybersecurity',
            seniority: 'Mid-Level',
            platform: 'LinkedIn'
        },
        {
            title: 'Machine Learning Engineer',
            company: 'DataMinds',
            location: 'Boston, MA',
            type: 'Full-time',
            remote: false,
            description: 'Build and deploy ML models for predictive analytics. Work with large datasets and optimize model inference.',
            requirements: 'Strong Python skills\nExperience with PyTorch or TensorFlow',
            salary: '$160k - $200k',
            techStack: 'Python, PyTorch, SQL, Pandas',
            industry: 'AI/ML',
            seniority: 'Senior',
            platform: 'StackOverflow'
        },
        {
            title: 'Mobile Developer (iOS)',
            company: 'Appify',
            location: 'Los Angeles, CA',
            type: 'Full-time',
            remote: true,
            description: 'Lead the development of our flagship iOS application. Write clean, maintainable Swift code.',
            requirements: 'Strong Swift and iOS SDK knowledge\nExperience publishing apps to the App Store',
            salary: '$130k - $170k',
            techStack: 'Swift, SwiftUI, XCode',
            industry: 'Mobile Apps',
            seniority: 'Mid-Level',
            platform: 'AngelList'
        }
    ];

    // 3. Insert Jobs safely
    for (const job of jobsData) {
        const existingJob = await prisma.job.findFirst({
            where: {
                title: job.title,
                company: job.company
            }
        });

        if (!existingJob) {
            const createdJob = await prisma.job.create({
                data: {
                    ...job,
                    creatorId: companyUser.id,
                },
            });
            console.log(`Created job: ${createdJob.title} at ${createdJob.company}`);
        } else {
            console.log(`Job already exists: ${job.title} at ${job.company}`);
        }
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
