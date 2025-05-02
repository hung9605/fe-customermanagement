import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
export default class ExcelUtil{
    static export(data: Object[],fileName: string,columns: any[],colCenter: string[],colLeft: string[],colRight: string[]){
            const workbook = new ExcelJS.Workbook(); // Create a new workbook
                const worksheet = workbook.addWorksheet('Sheet 1'); // Add a worksheet to the workbook
                worksheet.columns = columns;
                //style header
                worksheet.getRow(1).font = { bold: true };
                worksheet.getRow(1).alignment = { horizontal: 'center', vertical: 'middle' };
                //insert data
                data.forEach((item,index) => {
                  const rowData = {
                    ...item,
                    index: index + 1, // Gán số thứ tự
                  };
                  const row = worksheet.addRow(rowData);
                  colCenter.forEach((key) => {
                    row.getCell(key).alignment = { horizontal: 'center', vertical: 'middle' };
                  });
                  colLeft.forEach((key) => {
                    row.getCell(key).alignment = { horizontal: 'left', vertical: 'middle' };
                  });
                  colRight.forEach((key) => {
                    row.getCell(key).alignment = { horizontal: 'right', vertical: 'middle' };
                  });
                  
                });
                // Generate the Excel file buffer
                workbook.xlsx.writeBuffer().then((buffer) => {
                  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                  saveAs(blob, fileName+'.xlsx'); // Trigger the download with file name "example.xlsx"
                });
          } 
}