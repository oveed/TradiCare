import 'package:flutter/material.dart';
import '../services/api_service.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  void _login() async {
    final apiService = ApiService();
    final response = await apiService.login(
      _emailController.text,
      _passwordController.text,
    );
    if (response != null && response['token'] != null) {
      Navigator.pushReplacementNamed(context, '/home');
    } else {
      // Handle login failure
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Login failed. Please check your credentials.')),
      );
    }
  }

  

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: <Widget>[
              SizedBox(height: 20.0),
              Center(
                child: Image.asset(
                  'assets/logo.png',
                  width: MediaQuery.of(context).size.width * 0.45,
                ),
              ),
              SizedBox(height: 20.0),
              Center(
                child: Text(
                  'Log In',
                  style: TextStyle(
                    fontSize: 40.0,
                    color: Color(0xFF1D4056),
                    fontFamily: 'Poppins',
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              SizedBox(height: 30),
              Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'Email Address',
                  style: TextStyle(
                    fontSize: 16.0,
                    color: Color(0xFF1D4056),
                    fontFamily: 'Poppins',
                  ),
                ),
              ),
              SizedBox(height: 10),
              TextField(
                controller: _emailController,
                decoration: InputDecoration(
                  labelText: 'Email',
                  labelStyle: TextStyle(
                    color: Color.fromARGB(133, 117, 117, 117),
                  ),
                  fillColor: Color.fromARGB(79, 158, 158, 158).withOpacity(0.2),
                  filled: true,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8.0),
                    borderSide: BorderSide.none,
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8.0),
                    borderSide: BorderSide(
                      color: Color.fromARGB(67, 158, 158, 158).withOpacity(0.5),
                    ),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8.0),
                    borderSide: BorderSide(
                      color: Color.fromARGB(62, 158, 158, 158).withOpacity(0.8),
                    ),
                  ),
                ),
              ),
              SizedBox(height: 20),
              Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'Password',
                  style: TextStyle(
                    fontSize: 16.0,
                    color: Color(0xFF1D4056),
                    fontFamily: 'Poppins',
                  ),
                ),
              ),
              SizedBox(height: 10),
              TextField(
                controller: _passwordController,
                decoration: InputDecoration(
                  labelText: 'Password',
                  labelStyle: TextStyle(
                    color: Color.fromARGB(133, 117, 117, 117),
                  ),
                  fillColor: Color.fromARGB(79, 158, 158, 158).withOpacity(0.2),
                  filled: true,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8.0),
                    borderSide: BorderSide.none,
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8.0),
                    borderSide: BorderSide(
                      color: Color.fromARGB(67, 158, 158, 158).withOpacity(0.5),
                    ),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8.0),
                    borderSide: BorderSide(
                      color: Color.fromARGB(62, 158, 158, 158).withOpacity(0.8),
                    ),
                  ),
                ),
                obscureText: true,
              ),
              SizedBox(height: 30),
              GestureDetector(
                onTap: _login,
                child: Image.asset(
                  'assets/login.png',
                  width: MediaQuery.of(context).size.width * 0.9,
                ),
              ),
              
              SizedBox(height: 30),
              Image.asset(
                'assets/Sep.png',
                width: MediaQuery.of(context).size.width * 0.9,
              ),
              SizedBox(height: 5),
              TextButton(
                onPressed: () => Navigator.pushNamed(context, '/signup'),
                child: Text(
                  'No account yet? Sign Up',
                  style: TextStyle(
                    fontSize: 13.0,
                    color: Color(0xFF1D4056),
                    fontFamily: 'Poppins',
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
