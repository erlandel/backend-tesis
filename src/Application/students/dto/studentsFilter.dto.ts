export interface StudentData {
    identidad_numero: string;
    primer_nombre: string;
    segundo_nombre: string | null;
    primer_apellido: string;
    segundo_apellido: string;
    sexo: string;
    direccion: string;
    provincia_residencia: string;
    municipio_residencia: string;
    ciudadania: string;
    color_piel?: string; 
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
}