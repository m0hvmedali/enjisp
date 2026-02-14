'use server';

import { supabase } from '@/lib/supabase';
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-pro" }) : null;

// =============================================
// 1. WISDOM ENGINE
// =============================================
export async function getDailyWisdom() {
    // If no API key, return offline wisdom fallback
    if (!model) {
        return {
            content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            source: "Winston Churchill",
            category: "Stoic"
        };
    }

    try {
        // 1. Check if we already have wisdom for today in DB to save API calls
        const supabase = createClient();
        const today = new Date().toISOString().split('T')[0];

        // This part requires `created_at` or `shown_date` check. 
        // For simplicity in V2 MVP, we'll fetch fresh or random.

        const prompt = `
      Generate a profound, short piece of wisdom for a high-achieving student.
      It should be Stoic, Islamic, or Scientific.
      Format JSON: { "content": "...", "source": "...", "category": "..." }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().replace(/```json|```/g, '').trim();

        return JSON.parse(text);
    } catch (error) {
        console.error("Wisdom Engine Failed:", error);
        return {
            content: "The best way to predict the future is to create it.",
            source: "Peter Drucker",
            category: "Growth"
        };
    }
}

// =============================================
// 2. ANALYSIS ENGINE (VENTING)
// =============================================
export async function analyzeVent(ventText: string) {
    if (!model) {
        return {
            feedback: "I hear you. Please add a Gemini API Key to unlock my full analysis capabilities.",
            mood: "Neutral",
            sentiment_score: 0
        };
    }

    try {
        const prompt = `
      You are Rafeeq, a wise, Socratic AI mentor for a student.
      The student wrote: "${ventText}"
      
      1. Analyze their mood (one word: Anxious, Burned Out, Determined, etc.).
      2. Provide a "Socratic" response (ask a question that leads them to insight, or give a stoic perspective). Keep it under 50 words.
      3. Give a sentiment score (-1.0 to 1.0).
      
      Format JSON: { "feedback": "...", "mood": "...", "sentiment_score": 0.0 }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().replace(/```json|```/g, '').trim();
        const data = JSON.parse(text);

        return data;
    } catch (error) {
        console.error("Rafeeq Analysis Failed:", error);
        return {
            feedback: "I am having trouble connecting to my neural core. But know that your feelings are valid. Keep going.",
            mood: "Unknown",
            sentiment_score: 0
        };
    }
}
