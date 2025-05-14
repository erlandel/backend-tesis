import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Excel } from "./entities/Excel.entity";
import { ExcelController } from "src/Presentation/excel.controller";
import { ExcelService } from "src/Infrastrutcure/excel.service";

@Module({
    imports: [TypeOrmModule.forFeature([Excel])],
    controllers: [ExcelController],
    providers: [ExcelService],
})
export class ExcelModule {}