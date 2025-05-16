import { ExcelDto } from "src/Application/Excel/excel.dto";
import { Excel } from "src/Domain/entities/Excel.entity";
import { Repository } from "typeorm";
export declare class ExcelService {
    private excelRepository;
    constructor(excelRepository: Repository<Excel>);
    createExcel(excelData: ExcelDto, file: Express.Multer.File): Promise<Excel | null>;
    getExcelbyId(id: number): Promise<Excel | null>;
    getAllExcel(): Promise<Excel[]>;
}
