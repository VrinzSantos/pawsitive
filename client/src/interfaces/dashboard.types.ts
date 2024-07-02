export interface Feedback {
  _id: string;
  category: string;
  feedback: string;
  ratings: number;
  __v: number;
}

export interface FeedbackResponse {
  success?: boolean;
  data: Feedback[];
}
