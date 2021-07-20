import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:web_sa_transportes/pages/login/login_controller.dart';
import 'package:web_sa_transportes/utils/colors_util.dart';
import 'package:web_sa_transportes/widgets/custom_card.dart';
import 'package:web_sa_transportes/widgets/custom_input_field.dart';
import 'package:web_sa_transportes/widgets/custom_raisedbutton.dart';

class LoginPage extends GetView<LoginController> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
          decoration: BoxDecoration(
            image: DecorationImage(image: AssetImage("assets/images/bg.png"), fit: BoxFit.cover),
          ),
          child: Align(
            child: Container(
              width: 350.0,
              height: 450.0,
              child: CustomCard(
                child: Container(
                  margin: EdgeInsets.all(20.0),
                  child: Column(
                    children: [
                      Container(
                        width: 100.0,
                        margin: EdgeInsets.all(20.0),
                        child: Image(image: AssetImage("assets/images/sa_logo.png")),
                      ),
                      Form(
                        child: Column(
                          children: [
                            CustomInputFieldGrey(
                              //controller: _emailController,
                              label: "E-mail",
                              obscure: false,
                              type: TextInputType.emailAddress,
                              //validator: ValidatorsUtil.validateEmail,
                              hint: "Digite seu e-mail",
                            ),
                            SizedBox(
                              height: 16.0,
                            ),
                            CustomInputFieldGrey(
                              //controller: _senhaController,
                              label: "Senha",
                              hint: "Digite sua senha",
                              //obscure: this._hidePassword,
                              type: TextInputType.text,
                              //validator: ValidatorsUtil.validatePassword,
                              /*suffixIcon: IconButton(
                                  icon: Icon(
                                    Icons.remove_red_eye,
                                    color: !this._hidePassword
                                        ? Theme.of(context).primaryColor
                                        : Colors.grey,
                                  ),
                                  onPressed: () {
                                    setState(
                                            () => this._hidePassword = !this._hidePassword);
                                  },
                                ),*/
                            ),
                            SizedBox(
                              height: 10.0,
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(
                                  children: [
                                    GestureDetector(
                                      child: Container(
                                        alignment: Alignment.topLeft,
                                        child: Text(
                                          "Esqueci minha senha",
                                          textAlign: TextAlign.left,
                                          style: TextStyle(color: ColorsUtil.grey, fontSize: 12, fontWeight: FontWeight.bold),
                                        ),
                                      ),
                                      onTap: () {
                                        /*Navigator.of(context).push(
                                    MaterialPageRoute(builder: (context) => RecuperacaoDeSenhaScreen()));*/
                                      },
                                    ),
                                    Container(
                                      margin: EdgeInsets.only(left: 5.0),
                                      child: Icon(Icons.lock, color: ColorsUtil.grey, size: 12.0,),
                                    )
                                  ],
                                ),
                                CustomRaisedButtonBlue(
                                    label: "ENTRAR",
                                    /*func: () {
                                      if (_formKey.currentState.validate()) {
                                        mainStore.login(
                                            email: _emailController.text,
                                            senha: _senhaController.text,
                                            context: context,
                                            scaffoldKey: _scaffoldKey);
                                      }
                                    }*/)
                              ],
                            )
                          ],
                        ),
                      )
                    ],
                  ),
                ),
              ),
            ),
          )),
    );
  }
}
