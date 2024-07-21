import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  final String apiUrl = 'http://192.168.1.5:3000'; // Replace with your actual IP address

 Future<Map<String, dynamic>?> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$apiUrl/auth/login'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, String>{
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      final Map<String, dynamic> data = jsonDecode(response.body);
      if (data['token'] != null) {
        await saveToken(data['token']);
      }
      return data;
    } else {
      // Handle error
      return null;
    }
  }
 Future<Map<String, dynamic>?> signup(String username, String email, String password) async {
  try {
    final response = await http.post(
      Uri.parse('http://192.168.1.5:3000/auth/signup'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'username': username,
        'email': email,
        'password': password,
      }),
    );

    print('Response status: ${response.statusCode}');
    print('Response body: ${response.body}');

    if (response.statusCode == 201) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      return null;
    }
  } catch (e) {
    print('Error during signup: $e');
    return null;
  }
}



  Future<void> createUser(String uid, String email) async {
    final response = await http.post(
      Uri.parse('$apiUrl/users'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, String>{
        'uid': uid,
        'email': email,
      }),
    );

    if (response.statusCode != 201) {
      throw Exception('Failed to create user');
    }
  }

  Future<void> createPatient(String patientName, String patientId, int age) async {
    final response = await http.post(
      Uri.parse('$apiUrl/patients'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, dynamic>{
        'patientName': patientName,
        'patientId': patientId,
        'age': age,
      }),
    );

    if (response.statusCode != 201) {
      throw Exception('Failed to create patient');
    }
  }

  Future<void> updatePatientInteraction(String patientId, DateTime lastInteraction) async {
    final response = await http.put(
      Uri.parse('$apiUrl/patients/$patientId'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, dynamic>{
        'lastInteraction': lastInteraction.toIso8601String(),
      }),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to update patient interaction');
    }
  }

  



  Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('auth_token', token);
  }

  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('auth_token');
  }
}
