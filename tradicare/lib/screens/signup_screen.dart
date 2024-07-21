import 'package:flutter/material.dart';
import '../services/api_service.dart';

class SignupScreen extends StatefulWidget {
  @override
  _SignupScreenState createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final ApiService _apiService = ApiService();

  void _signup() async {
  try {
    final response = await _apiService.signup(
      _usernameController.text,
      _emailController.text,
      _passwordController.text,
    );

    print('Signup response: $response');

    if (response != null && response['token'] != null) {
      // Save the token
      await _apiService.saveToken(response['token']);
      Navigator.pushReplacementNamed(context, '/home');
    } else {
      // Show error message
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Sign-up failed. Please try again.')),
      );
    }
  } catch (e) {
    print('Error during signup: $e');
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('An error occurred. Please try again.')),
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
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              SizedBox(height: 20.0),
              Center(
                child: Image.asset(
                  'assets/logo.png',
                  width: MediaQuery.of(context).size.width * 0.45,
                ),
              ),
              Center(
                child: Text(
                  'Sign Up',
                  style: TextStyle(
                    fontSize: 40.0,
                    color: Color(0xFF1D4056),
                    fontFamily: 'Poppins',
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              SizedBox(height: 30),
              _buildTextField(
                controller: _usernameController,
                label: 'Username',
                hintText: 'Enter your username',
              ),
              SizedBox(height: 20),
              _buildTextField(
                controller: _emailController,
                label: 'Email Address',
                hintText: 'Enter your email',
                keyboardType: TextInputType.emailAddress,
              ),
              SizedBox(height: 20),
              _buildTextField(
                controller: _passwordController,
                label: 'Password',
                hintText: 'Enter your password',
                obscureText: true,
              ),
              SizedBox(height: 20),
              GestureDetector(
                onTap: _signup,
                child: Image.asset(
                  'assets/signup.png',
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
                onPressed: () => Navigator.pushNamed(context, '/login'),
                child: Text(
                  'Already have an account? Login',
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

  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
    required String hintText,
    bool obscureText = false,
    TextInputType keyboardType = TextInputType.text,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text(
          label,
          style: TextStyle(
            fontSize: 16.0,
            color: Color(0xFF1D4056),
            fontFamily: 'Poppins',
          ),
        ),
        SizedBox(height: 10),
        TextField(
          controller: controller,
          obscureText: obscureText,
          keyboardType: keyboardType,
          decoration: InputDecoration(
            hintText: hintText,
            hintStyle: TextStyle(
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
      ],
    );
  }
}
