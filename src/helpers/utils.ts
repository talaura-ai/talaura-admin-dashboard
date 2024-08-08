import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const AWS_REGION = import.meta.env.VITE_AWS_REGION;
const AWS_BUCKET_NAME = import.meta.env.VITE_AWS_BUCKET_NAME;
const AWS_ACCESS_KEY_ID = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

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

export const mobileNumberRegex = /^[0-9]{10}$/; // check for first digit between 6-9 and total 10 digits

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const nameRegex = /^[a-zA-Z][a-zA-Z\s]{2,}$/; // check lowercase/ uppercase including space ` ` and min length 3

export const capitalizeEachWordFirstCharacter = (str: string) =>
  str
    .split(' ')
    .filter((ch) => Boolean(ch))
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

export const generateSignedUrlS3 = async (s3url?: string) => {
  if (!s3url) {
    return '';
  }
  const REGION = AWS_REGION;
  const s3Client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });

  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: s3url,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 2 * 60 * 60 }); //2hr
  return signedUrl;
};

export const deepClone = <T>(obj: T): T => {
  // Check for null or non-object types
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Handle Date objects
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  // Handle Array objects
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as unknown as T;
  }

  // Handle generic objects
  if (obj instanceof Object) {
    const cloneObj: { [key: string]: any } = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloneObj[key] = deepClone(obj[key]);
      }
    }
    return cloneObj as T;
  }
  return obj;
};

export const formatAndUniqueSkills = (skills: string[]) =>
  Array.from(
    new Set(
      skills.map((skl) =>
        skl
          .trim()
          .split(' ')
          .map((splitted) =>
            splitted.length ? splitted[0].toUpperCase() + splitted.slice(1).toLowerCase() : '',
          )
          .join(' '),
      ),
    ),
  );

export const stringToArrayBuffer = (s: string) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
};
