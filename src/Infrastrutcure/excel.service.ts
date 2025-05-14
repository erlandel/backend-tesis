import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExcelDto } from "src/Application/Excel/excel.dto";
import { Excel } from "src/Domain/entities/Excel.entity";
import { Repository } from "typeorm";

@Injectable()
export class ExcelService {
    constructor(
        @InjectRepository(Excel)
        private excelRepository: Repository<Excel>
    ) {}
    async createExcel(excelData: ExcelDto) {
        const excel = this.excelRepository.create(excelData);
        await this.excelRepository.save(excel);
    }
    async getExcelbyId(id: number): Promise<Excel | null>{
        const student = await this.excelRepository.findOneBy({ id });
        if (!student) {
            return null;
        }
        return student;
    }
    async getAllExcel(): Promise<Excel[]>{
        return await this.excelRepository.find();
    }
}