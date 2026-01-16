const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const aiService = require('../services/ai.service');

const extractText = async (file) => {
    if (file.mimetype === 'application/pdf') {
        const data = await pdf(file.buffer);
        return data.text;
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const data = await mammoth.extractRawText({ buffer: file.buffer });
        return data.value;
    } else if (file.mimetype === 'text/plain') {
        return file.buffer.toString('utf-8');
    }
    throw new Error('Unsupported file type. Please upload PDF or DOCX.');
};

exports.analyzeResume = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
        const text = await extractText(req.file);
        const analysis = await aiService.analyzeResume(text);
        res.json(analysis);
    } catch (error) {
        console.error('AI Analysis Error:', error);
        res.status(500).json({ message: 'AI Analysis failed', error: error.message });
    }
};

exports.matchJD = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No resume uploaded' });
        const { jd } = req.body;
        if (!jd) return res.status(400).json({ message: 'No job description provided' });

        const resumeText = await extractText(req.file);
        const match = await aiService.matchJD(resumeText, jd);
        res.json(match);
    } catch (error) {
        console.error('AI Match Error:', error);
        res.status(500).json({ message: 'AI Matching failed', error: error.message });
    }
};

exports.generateCoverLetter = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No resume uploaded' });
        const { jd } = req.body;
        if (!jd) return res.status(400).json({ message: 'No job description provided' });

        const resumeText = await extractText(req.file);
        const coverLetter = await aiService.generateCoverLetter(resumeText, jd);
        res.json(coverLetter);
    } catch (error) {
        console.error('AI Cover Letter Error:', error);
        res.status(500).json({ message: 'AI Generation failed', error: error.message });
    }
};
