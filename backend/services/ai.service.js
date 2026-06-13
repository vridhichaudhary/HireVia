const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

/**
 * Analyzes a resume and provides structured feedback.
 */
exports.analyzeResume = async (resumeText) => {
  const prompt = `
    You are a FAANG-level technical recruiter and resume expert. 
    Analyze the following resume text and provide a comprehensive audit.
    Provide the response in EXPLICIT JSON format with the following keys:
    - score: (0-100)
    - summary_title: (A catchy title for the analysis)
    - overall_feedback: (A professional 2-3 sentence overview)
    - strengths: (Array of 3-5 key professional strengths found)
    - improvements: (Array of 3-5 specific actionable improvements or flags)

    Resume Text:
    ${resumeText}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Clean JSON response (Gemini sometimes adds markdown blocks)
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Failed to parse AI response" };
};

/**
 * Matches a resume against a job description.
 */
exports.matchJD = async (resumeText, jdText) => {
  const prompt = `
    Analyze the compatibility between the following Resume and Job Description (JD).
    Provide the response in EXPLICIT JSON format with the following keys:
    - match_score: (0-100)
    - summary: (Brief overview of the alignment)
    - found_keywords: (Array of keywords from JD present in Resume)
    - missing_keywords: (Array of critical JD keywords missing from Resume)
    - strategy: (1-2 sentences on how to improve the match)

    Resume:
    ${resumeText}

    Job Description:
    ${jdText}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Failed to parse AI response" };
};

/**
 * Generates a personalized cover letter.
 */
exports.generateCoverLetter = async (resumeText, jdText) => {
  const prompt = `
    Generate a professional, high-impact cover letter based on the provided Resume and Job Description.
    The tone should be confident, professional, and tailored to a top-tier tech company.
    Synthesize specific achievements from the resume to meet the requirements of the JD.
    Provide the response in EXPLICIT JSON format with the following key:
    - cover_letter: (The full text of the cover letter)

    Resume:
    ${resumeText}

    Job Description:
    ${jdText}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Failed to parse AI response" };
};
