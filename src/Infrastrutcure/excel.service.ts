import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExcelDto } from "src/Application/Excel/excel.dto";
import { Excel } from "src/Domain/entities/Excel.entity";
import { Repository } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class ExcelService {
    constructor(
        @InjectRepository(Excel)
        private excelRepository: Repository<Excel>
    ) {}
    async createExcel(excelData: ExcelDto, file: Express.Multer.File) : Promise<Excel | null>{
        const name =  await this.excelRepository.findOneBy({ name: excelData.name });
        if (name !== null) {
            return null;
        }
        const directorioExcel = path.join(process.cwd(), 'src', 'excel');
        if (!fs.existsSync(directorioExcel)) {
            fs.mkdirSync(directorioExcel, { recursive: true });
        }
        let rutaArchivo: string | null = null;
        if (file) {
            const nombreArchivo = excelData.name || `excel_${Date.now()}.xlsx`;
            const nombreFinal = nombreArchivo.endsWith('.xlsx') ? nombreArchivo : `${nombreArchivo}.xlsx`;
            rutaArchivo = path.join(directorioExcel, nombreFinal);
            fs.writeFileSync(rutaArchivo, file.buffer);
        }
        const excel = this.excelRepository.create(excelData);
        if (rutaArchivo !== null) {
            excel.route = rutaArchivo;
        }
        await this.excelRepository.save(excel);
        return excel;
    }
    async getExcelbyId(id: number): Promise<Excel | null> {
        const student = await this.excelRepository.findOneBy({ id });
        if (!student) {
            return null;
        }
        return student;
    }
    async getAllExcel(): Promise<Excel[]> {
        return await this.excelRepository.find();
    }
}