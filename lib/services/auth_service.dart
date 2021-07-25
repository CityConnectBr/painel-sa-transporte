import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:web_sa_transportes/services/main_service.dart';
import 'package:web_sa_transportes/utils/validators.dart';

class AuthService extends MainService {

  Future<dynamic> login(String login, String senha) async {
    Response response = await simpleDio.post<String>('/auth/login', data: {
      "email": login,
      "password": senha,
    });

    Map<String, dynamic> jsonMap = jsonDecode(response.data);
    if (new RegExp(ValidatorsUtil.jwtPattern).hasMatch(jsonMap['token'])) {
      super.setToken(jsonMap['token']);
      return jsonMap['token'];
    }
  }

  Future<bool> logout() async {
    await dio.get('/auth/logout');
    super.clearToken();
    return true;
  }

}
