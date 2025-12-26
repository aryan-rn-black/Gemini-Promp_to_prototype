
import { GoogleGenAI, Type } from "@google/genai";
import { DecisionMemo } from "../types";

// Always initialize GoogleGenAI with process.env.API_KEY directly inside the service function
export const generateDecisionMemo = async (transcript: string): Promise<DecisionMemo> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are an expert Chief of Staff. Extract high-value insights from this transcript and format them as a structured Decision Memo. 
    
    Transcript:
    ${transcript}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          abstract: {
            type: Type.STRING,
            description: "A exactly 3-sentence summary of the meeting's purpose and outcome."
          },
          actions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                task: { type: Type.STRING },
                assignee: { type: Type.STRING },
                deadline: { type: Type.STRING }
              },
              required: ["task", "assignee", "deadline"]
            }
          },
          debates: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                decision: { type: Type.STRING, description: "The major decision being debated." },
                argumentsFor: { type: Type.ARRAY, items: { type: Type.STRING } },
                argumentsAgainst: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["decision", "argumentsFor", "argumentsAgainst"]
            }
          },
          tone: {
            type: Type.OBJECT,
            properties: {
              label: { type: Type.STRING, description: "One-word descriptor like Tense, Collaborative, etc." },
              description: { type: Type.STRING, description: "Detailed analysis of the meeting energy." }
            },
            required: ["label", "description"]
          }
        },
        required: ["abstract", "actions", "debates", "tone"]
      }
    }
  });

  try {
    // response.text is a getter, use it directly as a property
    const data = JSON.parse(response.text || "{}");
    return data as DecisionMemo;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Invalid response format from AI");
  }
};
