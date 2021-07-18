import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:web_sa_transportes/pages/login/login_controller.dart';
import 'package:web_sa_transportes/widgets/custom_input_field.dart';

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
              width: 300.0,
              height: 500.0,
              child: Card(
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
                              hint: "Seu endereço de e-mail aqui",
                            ),
                            SizedBox(
                              height: 16.0,
                            ),
                            CustomInputFieldGrey(
                                //controller: _senhaController,
                                label: "Senha",
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
                              height: 26.0,
                            ),
                            /*CustomRaisedButtonBlue(
                                label: "Login",
                                func: () {
                                  if (_formKey.currentState.validate()) {
                                    mainStore.login(
                                        email: _emailController.text,
                                        senha: _senhaController.text,
                                        context: context,
                                        scaffoldKey: _scaffoldKey);
                                  }
                                }),*/
                            SizedBox(
                              height: 16.0,
                            ),
                            GestureDetector(
                              child: Container(
                                alignment: Alignment.topLeft,
                                child: Text(
                                  "Esqueceu a sua senha?",
                                  textAlign: TextAlign.left,
                                  style: TextStyle(
                                      color: Theme.of(context).primaryColor,
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold),
                                ),
                              ),
                              onTap: () {
                                /*Navigator.of(context).push(
                                    MaterialPageRoute(builder: (context) => RecuperacaoDeSenhaScreen()));*/
                              },
                            ),
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
