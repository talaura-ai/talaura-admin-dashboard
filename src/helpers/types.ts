export interface IExtendCandidateAssessmentPayload {
  candidateId: string;
  startsAt: number;
  endsOn: number;
}

export interface ISliderNav {
  children: any;
  style?: object;
  className?: string;
  action?: any;
  disabled?: boolean;
  hidden?: boolean;
  id: string;
  isPrimary?: boolean;
  slideTo?: string;
  setActionCalledLoading: any;
}

export interface IAssessmentQuestionProps {
  question: any;
  assessmentsProfiles?: any;
}

export interface IModuleType {
  name: string;
  type: string;
  noOfQuestions: number;
  position: number;
  question: {
    title: string;
    type: string;
    options: string[];
    expectedAnswer: string;
    _id: string;
  }[];
  skills: string[];
  weightage: string;
  Weightage: string;
  time: string;
  _id: string;
}

export interface IMenuItems {
  id: number;
  text: string;
  onClickModal: '' | 'duplicate' | 'rename';
}

export type IAssessmentModalDt = '' | { text: 'duplicate' | 'rename'; assessmentId: string };

export interface IAssessmentQuestionOptions {
  name?: {
    type: string;
  };
  title?: {
    type: string;
  };
}

export enum questionTypes {
  DROPDOWN = 'dropdown',
  TEXT = 'text',
  MULTIPLE_CHOICE = 'multiple-choice',
}
export interface IAssessmentQuestion {
  _id: string;
  name: string;
  type: string;
  profile: string;
  title: string;
  answer: any;
  options: IAssessmentQuestionOptions;
}
export interface IAssessmentModule {
  _id: string;
  name: string;
  type: 'Code Sandbox' | 'Quizzes';
  noOfQuestion: number;
  skills: string[];
  weightage: string;
  time: string;
}

export interface AssessmentsState {
  _id: string;
  organizationId: string;
  name: string;
  title: string;
  profileType: string;
  skills: string[];
  question: any[];
  module: Module[];
  createdAt: string;
  updatedAt: string;
  totalInvites?: number;
  totalCompleted?: number;
  totalOngoing?: number;
  __v: number;
}

export interface Module {
  name: string;
  type: string;
  noOfQuestions: number;
  position: number;
  question: Question[];
  skills: string[];
  weightage: string;
  time: string;
  _id: string;
}

export interface Question {
  title: string;
  type: string;
  options: string[];
  expectedAnswer?: string;
  _id: string;
}
