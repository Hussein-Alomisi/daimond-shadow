export interface ServiceSummary {
  id: string;
  title: string;
  icon: string;
}

export interface ServiceDetails extends ServiceSummary {
  description: string;
  createdAt?: string;
}

export interface ServiceWriteInput {
  title: string;
  description: string;
  icon: string;
}
