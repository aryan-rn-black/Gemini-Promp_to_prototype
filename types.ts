
export interface ActionItem {
  task: string;
  assignee: string;
  deadline: string;
}

export interface DebatePoint {
  decision: string;
  argumentsFor: string[];
  argumentsAgainst: string[];
}

export interface ToneAnalysis {
  label: string;
  description: string;
}

export interface DecisionMemo {
  abstract: string;
  actions: ActionItem[];
  debates: DebatePoint[];
  tone: ToneAnalysis;
}

export enum AppStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}
