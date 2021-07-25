import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:web_sa_transportes/utils/colors_util.dart';

class SnackMessages {
  static void showSnackBar(String text) {
    Get.snackbar("Mensagem:", text,
        duration: Duration(seconds: 5),
        backgroundColor: ColorsUtil.lightBlue,
        colorText: Colors.white);
  }

  static void showSnackBarSuccess(String text) {
    Get.snackbar("Mensagem:", text,
        duration: Duration(seconds: 5),
        backgroundColor: ColorsUtil.lightBlue,
        colorText: Colors.white);
  }

  static void showSnackBarError(String text) {
    Get.snackbar(
      "Erro:",
      text,
      duration: Duration(seconds: 5),
      backgroundColor: Colors.red,
      colorText: Colors.white,
    );
  }

  static void showSnackBarWarning(String text) {
    Get.snackbar(
      "Alerta:",
      text,
      duration: Duration(seconds: 5),
      backgroundColor: Colors.yellow,
      colorText: Colors.black38,
    );
  }
}
