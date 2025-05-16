import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import path from "path";
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
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Mi archivo' },
        modelType: { type: 'string', example: 'tipo1' },
        description: { type: 'string', example: 'Descripción del archivo' },
        file: { type: 'string', format: 'binary' },
      },
      required: ['name', 'modelType', 'description', 'file'],
    },
    })
    async createExcel(@Body() excelData: ExcelDto , @UploadedFile('file') file: Express.Multer.File , @Res() res: Response) {
        const excel = await this.excelService.createExcel(excelData, file);
        if (excel === null) {
            return res.status(400).json({
                message: 'No se pudo crear el Excel'
            })
        }
        return res.status(200).json({
            data: excel,
            message: 'Excel creado con exito'
        })
        
    }
    @Get('downloadExcel/:id')
    @ApiResponse({
        status: 200,
        description: 'Archivo Excel',
        schema: {
          type: 'string',
          format: 'binary',
        },
      })
    @ApiOperation({ summary: 'Descargar un Excel por su id' })
    async DownloadExcelbyId(@Param('id') id: number, @Res() res: Response) { 
        const excel = await this.excelService.getExcelbyId(id);
        if (!excel) {
            return res.status(404).json({
                message: 'No se encontró el Excel con ese id'
            })
        }
        if (excel.route) {
            // Envía el archivo directamente
            return res.sendFile(excel.route);
        }
        return res.status(200).json({
            data: excel,
            file: null
        })
    }
    @Get('GetExcelById/:id')
    @ApiOperation({ summary: 'Obtener un Excel por su id' })
    async GetExcelById(@Param('id') id: number , @Res() res: Response) {
        const excel = await this.excelService.getExcelbyId(id);
        if (!excel) {
            return res.status(404).json({
                message: 'No se encontro el Excel con ese id'
            })
        }
        return res.status(200).json({
            data: excel,
            message: 'Excel encontrado'
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