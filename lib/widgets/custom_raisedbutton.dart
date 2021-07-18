import 'package:flutter/material.dart';
import 'package:web_sa_transportes/utils/colors_util.dart';

class CustomRaisedButtonWhite extends StatelessWidget {
  final IconData? icon;
  final String? label;
  final VoidCallback? func;

  CustomRaisedButtonWhite(
      {@required this.icon, @required this.label = "", this.func});

  @override
  Widget build(BuildContext context) {
    return ButtonTheme(
      minWidth: 1000.0,
      height: 50.0,
      child: RaisedButton(
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(9.0),
            side: BorderSide(
                color: ColorsUtil.lightBlue,
                style: BorderStyle.solid,
                width: 2.0)),
        child: Text(
          this.label??"",
          style: TextStyle(
              fontSize: 18.0,
              fontWeight: FontWeight.bold,
              color: ColorsUtil.lightBlue),
        ),
        textColor: Colors.white,
        color: Colors.white,
        onPressed: this.func ?? () {},
      ),
    );
  }
}

class CustomRaisedButtonBlue extends StatelessWidget {
  IconData? icon;
  String? label;
  final VoidCallback? func;
  Widget? child;

  CustomRaisedButtonBlue(
      {@required this.icon, @required this.label, this.func});

  CustomRaisedButtonBlue.withChild({@required this.child, this.func});

  @override
  Widget build(BuildContext context) {
    return ButtonTheme(
      minWidth: 1000.0,
      height: 50.0,
      child: RaisedButton(
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(9.0),
            side: BorderSide(
                color: ColorsUtil.lightBlue,
                style: BorderStyle.solid,
                width: 2.0)),
        child: this.child != null ? this.child : Text(
          this.label??"",
          style: TextStyle(
              fontSize: 18.0, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        textColor: Colors.white,
        color: ColorsUtil.lightBlue,
        onPressed: this.func,
      ),
    );
  }
}