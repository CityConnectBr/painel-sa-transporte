import 'package:flutter/material.dart';
import 'package:web_sa_transportes/utils/colors_util.dart';

class CustomButtonBlue extends StatelessWidget {
  IconData? icon;
  String? label;
  final VoidCallback? func;

  CustomButtonBlue(
      {@required this.icon, @required this.label, this.func});

  final ButtonStyle flatButtonStyle = TextButton.styleFrom(
    primary: Colors.white,
    minimumSize: Size(98, 46),
    backgroundColor: ColorsUtil.lightBlue,
    padding: EdgeInsets.symmetric(horizontal: 16.0),
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.all(Radius.circular(15.0)),
    ),
  );

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: flatButtonStyle,
      onPressed: this.func,
      child: Text(label??"", style: const TextStyle(fontSize: 13.0),),
    );
    /*return ButtonTheme(
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
    );*/

  }
}