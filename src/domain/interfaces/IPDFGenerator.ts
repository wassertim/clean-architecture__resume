// src/domain/interfaces/IPDFGenerator.ts
export interface IPDFGenerator {
    generateFromHTML(html: string): Promise<Uint8Array>;
}