interface tagsJobInterface {
  id: number;
  tagsId: number;
  jobId: number;
  tags: {
    name: string;
  };
}

export interface jobInterface {
  id: number;
  title: string;
  description: string;
  hourlyRate: string;
  duration: string;
  englishLevel: string;
  tagsToJobs: tagsJobInterface[];
}
