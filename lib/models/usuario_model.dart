
class Usuario {
  int? id;
  String? nome;
  String? email;
  int? tipoId;
  int? perfilWebId;

  Usuario();
  /*Usuario(
      {int id,
      String nome,
      String email,
      String cpf,
      String cnh,
      String password}) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.cpfCnpj = cpf;
    this.cnh = cnh;
    this.password = password;
  }*/

  Usuario.fromJson(Map<String, dynamic> parsedJson) {
    this.id = parsedJson["id"];
    this.nome = parsedJson["nome"];
    this.email = parsedJson["email"];
    this.tipoId = parsedJson["tipo_id"];
    this.perfilWebId = parsedJson["perfil_web_id"];
  }

  Map<String, dynamic> toMap() {
    return {
      "id": id,
      "nome": nome,
      "email": email,
      "tipo_id": tipoId,
      "perfil_web_id": perfilWebId,
    };
  }
}
