import 'package:flutter/material.dart';

class ConfidentialityScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Confidentiality'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Center(
          child: Text(
            'Confidentiality information goes here.',
            style: TextStyle(fontSize: 16),
          ),
        ),
      ),
    );
  }
}
