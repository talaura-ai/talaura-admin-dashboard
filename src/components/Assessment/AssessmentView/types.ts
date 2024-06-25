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
  status: string;
  question: {
    name: string;
    title: string;
    _id: string;
  }[];
  startsAt: string;
  endsOn: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface IInviteCandidateItem {
  name: string;
  email: string;
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
  report: [
    {
      name: string;
      score: number;
      _id: string;
    },
  ];
  moduleName: string;
  moduleType: string;
  average: number;
  description?: string;
  accuracy?: string;
  areaToImprove?: string;
}
export interface ICandidateReportData {
  status: boolean;
  message: string;
  report: ICandidateReportDataReportItem[];
  paiScore: number;
  cognitiveScore: number;
  startsAt: string;
  endsOn: string;
  name: string;
  email: string;
  createdAt: string;
  completedOn: string;
}
