import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { ExcelDto } from "src/Application/Excel/excel.dto";
import { ExcelService } from "src/Infrastrutcure/excel.service";

@ApiTags('excel')
@Controller('Excel')
export class ExcelController {
    constructor(
        private readonly excelService: ExcelService
    ) { }
    @Post('createExcel')
    @ApiOperation({ summary: 'Crear un nuevo Excel' })
    async createExcel(@Body() excelData: ExcelDto) {
        this.excelService.createExcel(excelData);
    }
    @Get('getExcelbyId')
    @ApiOperation({ summary: 'Obtener un Excel por su id' })
    async getExcelbyId(@Param('id') id: number, @Res() res: Response) { 
        const excel = await this.excelService.getExcelbyId(id);
        if (!excel) {
            return res.status(404).json({
                message: 'No se encontró el Excel con ese id'
            })
        }
        return res.status(200).json({
            data: excel
        })
    }
    @Get('getAllExcel')
    @ApiOperation({ summary: 'Obtener todos los Excel' })
    async getAllExcel(@Res() res: Response) {
        res.status(200).json({
            data: await this.excelService.getAllExcel()
        })
    }
}