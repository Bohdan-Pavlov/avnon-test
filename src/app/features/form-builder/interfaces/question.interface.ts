export interface Question {
	questionType: string,
	question: string,
	answerOptions?: string[],
	allowOwnAnswer?: boolean,
	required: boolean
}

export interface Answer {
	answer: string | boolean[];
}
