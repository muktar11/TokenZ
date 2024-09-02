import 'dart:async';
import 'package:flutter/material.dart';
import 'package:zcloud/login.dart'; // Make sure this path is correct
import 'package:zcloud/register.dart';
import 'package:zcloud/exchange.dart';
import 'package:zcloud/minepage.dart';
import 'package:zcloud/youtube.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:hive_flutter/hive_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

    // Initialize Hive
  await Hive.initFlutter();

  // Open a box for user data
  await Hive.openBox('userBox');

  // Check if token is available
  final prefs = await SharedPreferences.getInstance();
  final user = prefs.getString('user');
  final hasToken = user != null && user.isNotEmpty;

  runApp(MyApp(initialRoute: hasToken ? '/Exchange' : '/login'));
}

class MyApp extends StatelessWidget {
  final String initialRoute;

  MyApp({required this.initialRoute});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Login App',
      theme: ThemeData(
        primarySwatch: Colors.orange,
        scaffoldBackgroundColor: Color(0xFF1A1A1A),
      ),
      initialRoute: initialRoute,
      routes: {
        '/Youtube': (context) => YouTubePage(),
        '/MinePage': (context) => MinePage(),
        '/login': (context) => LoginAccount(),
        '/register': (context) => RegisterAccount(),
        '/Exchange': (context) => ExchangePage(),
      },
    );
  }
}
