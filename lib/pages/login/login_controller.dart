import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:get/get.dart';
import 'package:web_sa_transportes/controllers/common_controller.dart';
import 'package:web_sa_transportes/routes/app_pages.dart';
import 'package:web_sa_transportes/services/auth_service.dart';
import 'package:web_sa_transportes/services/usuario_service.dart';
import 'package:web_sa_transportes/utils/error_handler_util.dart';
import 'package:web_sa_transportes/utils/storage_util.dart';
import 'package:web_sa_transportes/widgets/snack_message.dart';

class LoginController extends GetxController {
  //services
  final authService = AuthService();
  final usuarioService = UsuarioService();
  final storageUtil = StorageUtil();

  final emailController = TextEditingController(text: "admin@admin.com");
  final senhaController = TextEditingController(text: "123456");
  final formKey = GlobalKey<FormState>();

  var hiddenPassword = true.obs;

  changeHiddenPassword() {
    this.hiddenPassword.value = !this.hiddenPassword.value;
  }

  void login() async {
    try {
      if (!formKey.currentState!.validate()) {
        return;
      }

      EasyLoading.show();
      final token = await authService.login(this.emailController.text, this.senhaController.text);
      print(token);
      if (token == null) {
        throw Exception("Token inválido");
      }

      await storageUtil.save(StorageUtil.JWT, token);

      final usuario = await usuarioService.getUser();
      print(usuario!.toMap());

      if (usuario == null) {
        throw Exception("Usuário inválido");
      }

      Get.find<CommonController>().usuarioLogged.value = usuario;

      Get.offAllNamed(Routes.HOME);
    } catch (e) {
      SnackMessages.showSnackBarError(ErrorHandlerUtil(e).getMessegeToUser());
    }
    EasyLoading.dismiss();
  }
}

