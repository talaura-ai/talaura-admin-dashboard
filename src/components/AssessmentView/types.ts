export interface IAssessmentDetails {
  status: boolean;
  message: string;
  assessments: {
    _id: string;
    organizationId: string;
    name: string;
    title: string;
    profileType: string;
    question: {
      name: string;
      type: string;
      profile: string;
      position: number;
      isUser: boolean;
      title: string;
      answer:
        | {
            name: string;
            title: string;
          }[]
        | string;
      options: {
        name: string;
        title: string;
        _id: string;
      }[];
      _id: string;
    }[];
    module: {
      name: string;
      type: string;
      time: string;
      noOfQuestions: number;
    }[];

    createdAt: Date;
    updatedAt: Date;
    __v: number;
    totalCandidates: number;
    registeredCandidates: number;
    pendingCandidates: number;
    completeCandidates: number;
  }[];
}

export interface ICandidateData {
  status: boolean;
  message: string;
  currentPage: number;
  Candidate: ICandidate[];
  totalPage: number;
  totalCandidates: number;
}
export interface ICandidate {
  _id: string;
  assessmentId: string;
  name: string;
  email: string;
  mobile?: string;
  status: string;
  question: {
    name: string;
    title: string;
    _id: string;
  }[];
  isSelected?: boolean;
  startsAt: string;
  endsOn: string;
  createdAt: string;
  updatedAt: string;
  completedOn?: string;
  expiredOn?: string;
  paiScore?: number;
  cognitiveScore?: number;
  percentile?: number;
  __v: 0;
  suspiciousActivity: boolean;
  selectStatus?: string;
  module?: { _id: string; name: string; type: string; time: number; status: string; __v: number }[];
}

export interface IInviteCandidateItem {
  name: string;
  email: string;
  mobile: string;
  isValid: boolean;
}

export interface IAddCandidateApiPayload {
  assessmentId: string;
  candidates: {
    name: string;
    email: string;
  }[];

  startsAt: number;
  endsOn: number;
}

export interface ICandidateReportDataReportItem {
  _id: string;
  moduleId: string;
  report: {
    name: string;
    score: number;
    text?: number;
    _id: string;
  }[];
  moduleName: string;
  moduleType: string;
  average: number;
  description?: string;
  question?: { title: string; answer: string }[];
  accuracy?: string;
  areaToImprove?: string;
  videoUrl?: string;
  audioUrl?: string;
}
export interface ICandidateReportData {
  status: boolean;
  message: string;
  report: ICandidateReportDataReportItem[];
  paiScore: number;
  cognitiveScore: number;
  percentile?: number;
  startsAt: string;
  endsOn: string;
  name: string;
  email: string;
  createdAt: string;
  completedOn: string;
  picture?: string;
}
