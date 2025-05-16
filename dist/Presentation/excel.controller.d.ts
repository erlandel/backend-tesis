import { Response } from "express";
import { ExcelDto } from "src/Application/Excel/excel.dto";
import { ExcelService } from "src/Infrastrutcure/excel.service";
export declare class ExcelController {
    private readonly excelService;
    constructor(excelService: ExcelService);
    createExcel(excelData: ExcelDto, file: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    DownloadExcelbyId(id: number, res: Response): Promise<void | Response<any, Record<string, any>>>;
    GetExcelById(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllExcel(res: Response): Promise<void>;
}
