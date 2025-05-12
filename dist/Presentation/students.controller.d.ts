import { StudentsService } from '../Infrastrutcure/students.service';
import { StudentDto } from 'src/Application/students/dto/student.dto';
import { UpdateStudentDto } from 'src/Application/students/dto/update-student.dto';
import { Student } from '../Domain/entities/student.entity';
import { StudentFuc } from 'src/Domain/entities/FUC/student.entity';
import { Response } from 'express';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    createStudent(studentDto: StudentDto, res: Response): Promise<void>;
    findAllStudents(): Promise<Student[]>;
    findByCiStudent(ciStudent: string): Promise<Student>;
    updateStudent(ciStudent: string, updateStudentDto: UpdateStudentDto): Promise<Student>;
    removeStudent(ciStudent: string): Promise<void>;
    findByCiFUC(ciStudent: string): Promise<StudentFuc>;
}
