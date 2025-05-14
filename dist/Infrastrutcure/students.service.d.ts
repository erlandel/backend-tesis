import { Repository } from 'typeorm';
import { Student } from '../Domain/entities/student.entity';
import { StudentDto } from 'src/Application/students/dto/student.dto';
import { UpdateStudentDto } from 'src/Application/students/dto/update-student.dto';
import { StudentFuc } from 'src/Domain/entities/FUC/student.entity';
import { StudentData } from 'src/Application/students/dto/studentsFilter.dto';
import { StudentWithErrors } from 'src/Application/students/dto/studentWithErrors.dto';
export declare class StudentsService {
    private studentsRepository;
    private studentDto;
    constructor(studentsRepository: Repository<Student>, studentDto: Repository<StudentFuc>);
    createStudent(studentDto: StudentDto): Promise<Student | null>;
    findAllStudents(): Promise<Student[]>;
    findByCiStudent(ciStudent: string): Promise<Student>;
    findByCiFuc(ciStudent: string): Promise<StudentFuc>;
    updateStudent(ciStudent: string, updateStudentDto: UpdateStudentDto): Promise<Student>;
    removeStudent(ciStudent: string): Promise<void>;
    FilterStudentsInFuc(studentFilterDto: StudentData[]): Promise<StudentWithErrors[] | null>;
    AddStudentsByExcel(studentDto: StudentData[]): Promise<void>;
}
