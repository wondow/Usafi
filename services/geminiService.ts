import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateEventDescription = async (title: string, category: string, location: string): Promise<string> => {
  try {
    const prompt = `Write a compelling, short (max 50 words) description for a waste management or environmental event.
    Event Title: ${title}
    Category: ${category}
    Location: ${location}
    Tone: Inspiring and Action-oriented.
    Output: Just the description text.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Join us to make a difference!";
  } catch (error) {
    console.error("Error generating description:", error);
    return "Join us for this amazing event to help keep our environment clean!";
  }
};