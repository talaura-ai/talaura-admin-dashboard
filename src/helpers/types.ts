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
  question: [
    {
      title: string;
      type: string;
      options: string[];
      expectedAnswer: string;
      _id: string;
    },
  ];
  skills: string[];
  weightage: string;
  Weightage: string;
  time: string;
  _id: string;
}
