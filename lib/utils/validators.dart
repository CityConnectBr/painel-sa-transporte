
class ValidatorsUtil {
  static final String numericPattern = "^[0-9]*\$";
  static final String min6CharacterPattern = "(?=.{6,})";
  static final String min1CharacterPattern = "(?=.{1,})";
  static final String phonePattern = "^[0-9]{2}([0-9]{9}|[0-9]{8})\$";
  static final String placaVeiculoPattern = "^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}\$";
  static final String cepPattern = "^\\d{5}-\\d{3}\$";
  static final String caracteres11Pattern = "^(\\d{11})\$";
  static final String ufPattern = "^(AC|AL|AP|AM|BA|CE|DF|GO|ES|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SP|SC|SE|TO)\$";
  static final String dateTimePattern = "^(\\d{4})-(\\d\\d)-(\\d\\d)T(\\d\\d):(\\d\\d):(\\d\\d).(\\d\\d\\d)Z\$";
  static final String jwtPattern = "^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*\$";

  static String? isNullOrIsEmpty(text) {
    if (text == null || text.isEmpty) return "Campo obrigatório";

    return null;
  }

  static String? validatePassword(String value) {
    //RegExp regex1 = new RegExp(numericPattern);
    //RegExp regex2 = new RegExp(stringLowerCasePattern);
    //RegExp regex3 = new RegExp(stringUpperCasePattern);
    RegExp regex4 = new RegExp(min6CharacterPattern);

    if (!regex4.hasMatch(value))
      return 'Senha inválida. Mínimo de 6 caracteres.';
    else
      return null;
  }

  static String? validateEmail(value) {
    String pattern =
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
    RegExp regex = new RegExp(pattern);
    if (!regex.hasMatch(value))
      return 'E-mail inválido';
    else
      return null;
  }

  static String? validateNumber(value) {
    RegExp regex = new RegExp(numericPattern);
    if (!regex.hasMatch(value))
      return 'Número inválido';
    else
      return null;
  }


  static String? placaVeiculo(value) {
    RegExp regex = new RegExp(placaVeiculoPattern);
    if (!regex.hasMatch(value))
      return 'Placa inválida';
    else
      return null;
  }

  static String? validateNumberAndNotIsEmpty( value) {
    if (value == null || value.isEmpty || !RegExp(numericPattern).hasMatch(value))
      return 'Número inválido';
    else
      return null;
  }

  static String? validatePhone(value) {
    RegExp regex = new RegExp(phonePattern);
    if (!regex.hasMatch(value))
      return 'Número inválido';
    else
      return null;
  }

  static String? caracteres11(value) {
    RegExp regex = new RegExp(caracteres11Pattern);
    if (!regex.hasMatch(value))
      return 'Valor inválido';
    else
      return null;
  }

  /*static String? validateCPF(String value) {
    if (!CPFValidator.isValid(value))
      return 'CPF inválido';
    else
      return null;
  }*/

  static String? validateDate(value) {
    String pattern = r'^\d{1,2}\/\d{1,2}\/\d{4}$';
    RegExp regex = new RegExp(pattern);
    if (!regex.hasMatch(value))
      return 'Data inválida';
    else
      return null;
  }

  static String? validateIsEmpty(value) {
    if (value == null || value.isEmpty)
      return 'Campo vazio';
    else
      return null;
  }

  static String? validateOneCaracter(value) {
    RegExp regex = new RegExp(min1CharacterPattern);
    if (!regex.hasMatch(value))
      return 'Campo inválido';
    else
      return null;
  }

  static String? validateCEP(value) {
    RegExp regex = new RegExp(cepPattern);
    if (!regex.hasMatch(value))
      return 'Campo inválido';
    else
      return null;
  }

  static String? validateUF(value) {
    RegExp regex = new RegExp(ufPattern);
    if (!regex.hasMatch(value.toUpperCase()))
      return 'UF não encontrado';
    else
      return null;
  }

  /*static String validateCPFCNPJ(String value) {
    if (value == null || value.isEmpty)
      return 'Campo vazio';
    else if (value.length <= 14) {
      //14 somando . e -
      CPFValidator.isValid("999.999.999-99");
    } else {
      CNPJValidator.isValid("99.999.999/9999-99");
    }
  }*/
}
