export type AgentStatus = 'DISCONNECTED' | 'VALIDATING' | 'BUILDING' | 'CONNECTED';

export interface Issue {
  name: string;
  description: string;
  instructions: string;
  resolutionCTA: string;
}

export interface Receivable {
  name: string;
  portalName: string;  // name of the supplier as in the portal
  legalEntity: string; // as represented in the ERP
}

export interface Payable {
  name: string;
  portalName: string;  // buyer name as in the portal
  legalEntity: string; // as represented in the ERP
}

export interface Agent {
  id: string;
  status: AgentStatus;
  receivable: Receivable;
  payable: Payable;
  issues: Issue[];
  createdAt: Date;
  updatedAt: Date;
}

export const statusColors = {
  DISCONNECTED: '#ff4444',
  VALIDATING: '#ffeb3b',
  BUILDING: '#ffc107',
  CONNECTED: '#4caf50'
} as const;

export const statusDescriptions = {
  DISCONNECTED: 'Every issue has a description and instructions on how to resolve it. It is the customer\'s responsibility to resolve it.',
  VALIDATING: 'Monto is responsible for validating the credentials by trying to log in to the portal and validate permissions.',
  BUILDING: 'Monto is now learning the instructions for every service. This can take a few days and map the receivable name to the name of the supplier as in the portal and the payable name to the buyer name as in the portal.',
  CONNECTED: 'Monto has learned and is connected to the portal.'
} as const; 