export default class StringUtil{
    static capitalizeFirstLetter(input: String): String{
        return input.split(" ").map(sChar => {
            return sChar.charAt(0).toUpperCase() + sChar.slice(1)
        }).join(' ');
    }

    static formatDate(date: Date,pattern: string): String{
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2,'0');
        const day = String(date.getDate()).padStart(2,'0');
        return year+pattern+month+pattern+day;
    }

     // Hàm format tiền tệ VND
  static formatCurrency(value: string): string {
    const numberValue = parseFloat(value.replace(/[^\d]/g, ''));
    if (isNaN(numberValue)) {
      return '';
    }

    // Định dạng tiền tệ VND, thêm dấu phẩy ngăn cách hàng nghìn
    return `${numberValue.toLocaleString('vi-VN')}đ`;
  }
}