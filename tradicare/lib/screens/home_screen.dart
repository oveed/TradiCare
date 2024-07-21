import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Image.asset(
                  'assets/logo.png',
                  width: MediaQuery.of(context).size.width * 0.45,
                ),
    );
  }
}
