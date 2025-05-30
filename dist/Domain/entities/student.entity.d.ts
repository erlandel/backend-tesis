import { StudentData } from 'src/Application/students/dto/studentsFilter.dto';
export declare class Student {
    ciStudent: string;
    nationality: string;
    lastName: string;
    firstName: string;
    address: string;
    province: string;
    municipality: string;
    skinColor?: string;
    gender: string;
    preUniversity: string;
    admissionMethod: string;
    motherEducation: string;
    fatherEducation: string;
    motherOccupation: string;
    fatherOccupation: string;
    motherWorkSector: string;
    fatherWorkSector: string;
    academicIndex?: string;
    origin?: string;
    situation?: string;
    UpdateStudent(studentData: StudentData): Promise<void>;
}
