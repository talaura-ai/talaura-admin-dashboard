export const omit = (obj: { [key: string]: any }, keys: string[]) => {
  return Object.fromEntries(Object.entries(obj).filter((pair) => !keys.includes(pair[0])));
};

export const AI_API_URL = import.meta.env.VITE_AI_API_URL;
export const ModuleTypesURLS = {
  'Voice To Voice': 'generate_voice_to_voice_questions',
  Sandbox: 'generate_sandbox_questions',
  'AI Video Interview': 'generate_ai_video_interview_questions',
  Interview: 'generate_voice_to_text_questions',
  'Voice to Text': 'generate_voice_to_text_questions',
  Quiz: 'generate_quiz_questions',
};
