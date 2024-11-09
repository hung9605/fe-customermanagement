export default class StringUtil{
    static capitalizeFirstLetter(input: String): String{
        return input.split(" ").map(sChar => {
            return sChar.charAt(0).toUpperCase() + sChar.slice(1)
        }).join(' ');
    }
}