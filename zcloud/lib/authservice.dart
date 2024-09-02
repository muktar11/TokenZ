import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:hive/hive.dart';
import 'package:http/http.dart' as http;


class AuthService {
  static const String _apiUrl = 'http://localhost:5000/api/users/';

  // Method to register a new user
  static Future<void> register(String username, String phone, String password) async {
    final url = Uri.parse('${_apiUrl}signup');
    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'username': username,
          'phone': phone,
          'password': password,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        if (data['accessToken'] != null) {
          final cacheData = {
            'token': data['accessToken'],
            'user': {'phone': data['user']['phone']},
          };

          final prefs = await SharedPreferences.getInstance();
          prefs.setString('user', jsonEncode(cacheData));
        }
      } else {
        throw Exception('Registration failed: ${response.statusCode}');
      }
    } catch (error) {
      print('Error during registration: $error');
      rethrow;
    }
  }


static Future<void> login(String phone, String password) async {
  final url = Uri.parse('${_apiUrl}login-user');
  try {
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'phone': phone,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      if (data['token'] != null) {
        final cacheData = {
          'token': data['token'],
          'user': {
            'username': data['user']['username'],
            'phone': data['user']['phone'],
            'id': data['user']['id'],
            'coins': data['user']['coins'],             
          },
        };

        // Save data to Hive
        var box = Hive.box('userBox');
        box.put('userData', cacheData);

        // Print the cached data
        print('Cached user data: ${box.get('userData')}');
      }
    } else {
      throw Exception('Login failed: ${response.statusCode}');
    }
  } catch (error) {
    print('Error during login: $error');
    rethrow;
  }
}



  // Method to log out the user
  static Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    prefs.remove('user');
  }

  // Method to get the currently logged-in user
  static Future<Map<String, dynamic>?> getCurrentUser() async {
    final prefs = await SharedPreferences.getInstance();
    final userData = prefs.getString('user');
    if (userData != null) {
      return jsonDecode(userData);
    }
    return null;
  }
}
