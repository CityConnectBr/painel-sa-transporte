import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:web_sa_transportes/utils/colors_util.dart';

class CustomInputField extends StatelessWidget {
  final Widget? icon;
  final Widget? prefixIcon;
  final Widget? suffixIcon;
  final String? hint;
  final String? label;
  final bool? obscure;
  final bool? enabled;
  final TextInputType? type;
  final String? Function(dynamic)? validator;
  final Function()? onEditingComplete;
  final String? Function(dynamic)? onChanged;
  final TextEditingController? controller;
  final int? maxLength;
  final InputDecoration? decoration;

  CustomInputField(
      {this.controller,
      this.icon,
      this.prefixIcon,
      this.suffixIcon,
      this.hint,
      this.label,
      this.obscure,
      this.type,
      this.validator,
      this.onEditingComplete,
      this.onChanged,
      this.enabled = true,
      this.maxLength = null,
      this.decoration});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          margin: EdgeInsets.all(5.0),
          child: Text(label??"", style: TextStyle(color: ColorsUtil.charcoal, fontWeight: FontWeight.bold, fontSize: 12.0),),
        ),
        TextFormField(
          controller: controller,
          decoration: this.decoration??InputDecoration(
            icon: icon,
            hintText: hint,
            labelText: hint,
            prefixIcon: prefixIcon,
            suffixIcon: suffixIcon,
            filled: true,
            fillColor: (this.enabled ?? false) ? ColorsUtil.lightGrey2 : Colors.grey[200],
          ),
          obscureText: obscure ?? false,
          keyboardType: type,
          maxLength: maxLength,
          validator: validator,
          onChanged: onChanged,
          onEditingComplete: onEditingComplete,
        )
      ],
    );
  }
}

class CustomInputFieldGrey extends CustomInputField {
  final Widget? icon;
  final Widget? prefixIcon;
  final Widget? suffixIcon;
  final String? hint;
  final String? label;
  final String? error;
  final bool? obscure;
  final bool? enabled;
  final TextInputType? type;
  final String? Function(dynamic)? validator;
  final Function()? onEditingComplete;
  final String? Function(dynamic)? onChanged;
  final TextEditingController? controller;
  final int? maxLength;

  CustomInputFieldGrey(
      {this.controller,
      this.icon,
      this.prefixIcon,
      this.suffixIcon,
      this.hint,
      this.label,
      this.error,
      this.obscure,
      this.type,
      this.validator,
      this.onEditingComplete,
      this.onChanged,
      this.enabled = true,
      this.maxLength = null});

  @override
  Widget build(BuildContext context) {
    return CustomInputField(
      controller: controller,
      enabled: enabled,
      hint: hint,
      icon: icon,
      label: label,
      maxLength: maxLength,
      obscure: obscure,
      onChanged: onChanged,
      onEditingComplete: onEditingComplete,
      prefixIcon: prefixIcon,
      suffixIcon: suffixIcon,
      type: type,
      validator: validator,
      decoration: InputDecoration(
        icon: icon,
        prefixIcon: prefixIcon,
        suffixIcon: suffixIcon,
        errorText: error,
        filled: true,
        fillColor: (this.enabled ?? false) ? ColorsUtil.lightGrey2 : Colors.grey[200],
        hintText: hint,
        labelText: hint,
        floatingLabelBehavior: FloatingLabelBehavior.never,
        labelStyle: TextStyle(fontSize: 12.0),
        //errorText: null,
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10.0),
          borderSide: BorderSide(color: Colors.white, width: 0.0),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10.0),
          borderSide: BorderSide(color: Colors.white, width: 0.0),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10.0),
          borderSide: BorderSide(color: Colors.red, width: 1.0),
        ),
        disabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10.0),
          borderSide: BorderSide(color: Colors.white, width: 0.0),
        ),
      ),
    );
  }
}

class CustomInputFieldWhite extends CustomInputField {
  final Widget? icon;
  final Widget? prefixIcon;
  final Widget? suffixIcon;
  final String? hint;
  final String? label;
  final String? error;
  final bool? obscure;
  final bool? enabled;
  final TextInputType? type;
  final String? Function(dynamic)? validator;
  final Function()? onEditingComplete;
  final String? Function(dynamic)? onChanged;
  final TextEditingController? controller;
  final int? maxLength;

  CustomInputFieldWhite(
      {this.controller,
        this.icon,
        this.prefixIcon,
        this.suffixIcon,
        this.hint,
        this.label,
        this.error,
        this.obscure,
        this.type,
        this.validator,
        this.onEditingComplete,
        this.onChanged,
        this.enabled = true,
        this.maxLength = null});

  @override
  Widget build(BuildContext context) {
    return CustomInputField(
      controller: controller,
      enabled: enabled,
      hint: hint,
      icon: icon,
      label: label,
      maxLength: maxLength,
      obscure: obscure,
      onChanged: onChanged,
      onEditingComplete: onEditingComplete,
      prefixIcon: prefixIcon,
      suffixIcon: suffixIcon,
      type: type,
      validator: validator,
      decoration: InputDecoration(
        icon: icon,
        prefixIcon: prefixIcon,
        suffixIcon: suffixIcon,
        filled: true,
        fillColor: (this.enabled ?? false) ? ColorsUtil.lightGrey2 : Colors.grey[200],
        hintText: hint,
        labelText: label,
        labelStyle: TextStyle(fontWeight: FontWeight.bold),
        errorText: error,
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10.0),
          borderSide: BorderSide(color: ColorsUtil.grey, width: 1.0),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10.0),
          borderSide: BorderSide(color: ColorsUtil.grey, width: 1.0),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10.0),
          borderSide: BorderSide(color: Colors.red, width: 1.0),
        ),
        disabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10.0),
          borderSide: BorderSide(color: ColorsUtil.grey, width: 1.0),
        ),
      ),
    );
  }
}
