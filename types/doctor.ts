export interface Doctor {
	_id: string;
	name: string;
	profilePicture?: string;
	specialization: string;
	qualification: string;
	yearsOfExperience: number;
	clinicName: string;
	location: string;
	consultationFee: number;
	cashback?: number;
	rating?: number;
	patientCount?: number;
	availableIn?: number;
	isTopDoctor?: boolean;
	languages: string[];
	consultModes: string[];
	experience: string;
	fees: string;
}
