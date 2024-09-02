import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
//import 'package:web_socket_channel/web_socket_channel.dart';
import 'package:shared_preferences/shared_preferences.dart'; // For local storage
import 'dart:async';

import 'package:zcloud/minepage.dart';
import 'package:zcloud/settings.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:hive/hive.dart';

class ExchangePage extends StatefulWidget {
  @override
  _ExchangePageState createState() => _ExchangePageState();
}

class _ExchangePageState extends State<ExchangePage> {
  String username = '';
  int? userId;
  String? token;
  String? socketStatus;
  int coinCount = 0;
  String? error;
  IO.Socket? socket;

  @override
  void initState() {
    super.initState();
    _checkLocalCache(); // Fetch the cached user data
    setupSocketConnection();
  }

  Future<void> _checkLocalCache() async {
    var box = Hive.box('userBox');
    final cachedUser = box.get('userData');

    if (cachedUser != null) {
      setState(() {
         final userData = cachedUser['user'];
        username = userData['username'] ?? '';
        userId = userData['id'] as int?;
        token = cachedUser['token'] as String?;
      });
      // Setup socket connection after retrieving cached data
      await setupSocketConnection();
    } else {
      setState(() {
        error = 'User not logged in.';
      });
    }
  }

  Future<void> setupSocketConnection() async {   
  try {
   
    socket = IO.io('http://localhost:5000', IO.OptionBuilder()
      .setTransports(['websocket'])
      .setQuery({'userId': userId.toString()}) // Ensure userId is a string
      .setExtraHeaders({'Authorization': 'Bearer $token'}) // Ensure token is a string
      .build());

    // Indicate socket initialization
    setState(() {
      socketStatus = 'Socket initialized, connecting...';
    });

    // Handle successful connection
    socket?.on('connect', (_) {
      setState(() {
        socketStatus = 'Connected to server';
      });
      // Request initial coins on connection
      socket?.emit('getUserCoins', userId);
    });

    // Handle receiving user coins
    socket?.on('userCoins', (data) {
      print('Received userCoins event: $data'); // Debugging
      if (data is Map && data.containsKey('coins')) {
        setState(() {
          coinCount = data['coins'];
        });
      } else {
        setState(() {
          error = 'Invalid userCoins data received';
        });
      }
    });

    // Handle coins update from the server
    socket?.on('coinsUpdated', (data) {
      print('Received coinsUpdated event: $data'); // Debugging
      if (data != null && data is Map && data.containsKey('coins')) {
        setState(() {
          coinCount = data['coins'];
        });
      }
    });

    // Handle errors
    socket?.on('error', (data) {
      print('Socket error: $data'); // Debugging
      setState(() {
        error = data['error'] ?? 'Unknown error';
        socketStatus = 'Socket connection failed';
      });
    });

    // Handle disconnect
    socket?.on('disconnect', (_) {
      setState(() {
        socketStatus = 'Disconnected from server';
      });
    });
  } catch (e) {
    print('Socket initialization failed: $e'); // Debugging
    setState(() {
      error = 'Socket initialization failed: $e';
      socketStatus = 'Socket failed to initialize';
    });
  }
}

// Method to update coins from the client-side
void updateCoins(int userId, int coinsEarned) {
  socket?.emit('updateCoins', [userId, coinsEarned]);
}

  
  Future<void> handleImageClick() async {
    try {
      var box = Hive.box('userBox');
      final cachedUser = box.get('userData');

      if (cachedUser != null) {
      setState(() {
        final userData = cachedUser['user'];
        username = userData['username'] ?? '';
        userId = userData['id'] as int?;
        token = cachedUser['token'] as String?;
      });

        final response = await http.post(
          Uri.parse('http://localhost:5000/api/activities/tap'),
          headers: {
            'Authorization': 'Bearer $token',
          },
        );

        if (response.statusCode == 200) {
          print('Activity created: ${json.decode(response.body)}');
        } else {
          setState(() {
            error =
                'Failed to increase coins. Status Code: ${response.statusCode}';
          });
        }
      } else {
        setState(() {
          error = 'User not logged in.';
        });
      }
    } catch (e) {
      setState(() {
        error = 'An error occurred while increasing coins.';
      });
      print(e);
    }
  }

  @override
  void dispose() {
    socket?.disconnect();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.only(top: 56.0), // Adds top margin
              child: Row(
                mainAxisAlignment: MainAxisAlignment
                    .spaceBetween, // Distributes space between children
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: Color(0xFF1d2025),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Icon(Icons.pets, color: Color(0xFFd4d4d4)),
                      ),
                      SizedBox(width: 8),
                      Text(
                        username.isNotEmpty
                            ? username
                            : 'Loading...', // Display username or loading text
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.white,
                        ),
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      Image.asset('assets/binance-logo.png', width: 32),
                      Container(
                        width: 2,
                        height: 32,
                        color: Color(0xFF43433b),
                      ),
                      Column(
                        children: [
                          Text(
                            'Earned Cash',
                            style: TextStyle(
                              fontSize: 12,
                              color: Color.fromARGB(255, 255, 255, 255),
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          Row(
                            children: [
                              Image.asset('assets/dollar-coin.png', width: 14),
                              SizedBox(width: 4),
                              Text(
                                '12',
                                style: TextStyle(
                                    fontSize: 14, color: Colors.white),
                              ),
                              Icon(Icons.info_outline,
                                  size: 8,
                                  color: Color.fromARGB(255, 221, 221, 202)),
                            ],
                          ),
                        ],
                      ),
                      Container(
                        width: 2,
                        height: 32,
                        color: Color(0xFF43433b),
                      ),
                      GestureDetector(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) =>
                                    SettingPage()), // Replace with your Settings page
                          );
                        },
                        child: Icon(Icons.settings, color: Colors.white),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Flexible(
                    child: Column(
                      children: [
                        SizedBox(height: 4),
                        Stack(),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            Expanded(
              child: Container(
                margin: EdgeInsets.only(top: 16),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      Color(0xFFF3BA2F),
                      Colors.transparent,
                    ],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
                  borderRadius: BorderRadius.vertical(top: Radius.circular(48)),
                ),
                child: Container(
                  margin: EdgeInsets.only(top: 2),
                  decoration: BoxDecoration(
                    color: Color(0xFF1e2229),
                    borderRadius:
                        BorderRadius.vertical(top: Radius.circular(48)),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            TaskColumn(
                              title: 'Daily reward',
                              icon: Image.asset(
                                'assets/daily-reward.png', // Path to your asset image
                                width: 18, // Adjust size as needed
                                height: 18,
                              ),
                              timeLeft: '12',
                            ),
                            TaskColumn(
                              title: 'Daily cipher',
                              icon: Image.asset(
                                'assets/daily-cipher.png', // Path to your asset image
                                width: 18, // Adjust size as needed
                                height: 18,
                              ),
                              timeLeft: '12',
                            ),
                            TaskColumn(
                              title: 'Daily combo',
                              icon: Image.asset(
                                'assets/daily-combo.png', // Path to your asset image
                                width: 18, // Adjust size as needed
                                height: 18,
                              ),
                              timeLeft: '12',
                            ),
                          ],
                        ),
                        Expanded(
                          child: Center(
                            child: GestureDetector(
                                onTap: handleImageClick,
                              child: Stack(
                                alignment: Alignment.center,
                                children: [
                                  Container(
                                    width: 140,
                                    height: 140,
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      gradient: LinearGradient(
                                        colors: [
                                          Color(0xFF43433b),
                                          Color(0xFF43433b).withOpacity(0.3),
                                        ],
                                        begin: Alignment.topLeft,
                                        end: Alignment.bottomRight,
                                      ),
                                    ),
                                  ),
                                  Container(
                                    width: 120,
                                    height: 120,
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      gradient: LinearGradient(
                                        colors: [
                                          Color(0xFF1d2025),
                                          Color(0xFF43433b),
                                        ],
                                        begin: Alignment.topCenter,
                                        end: Alignment.bottomCenter,
                                      ),
                                    ),
                                    child: Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Icon(Icons.touch_app,
                                            size: 32, color: Color(0xFF95908a)),
                                        SizedBox(height: 4),
                                        Text(
                                          '$coinCount',
                                          style: TextStyle(
                                              fontSize: 16,
                                              color: Color(0xFFFFD700)),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Expanded(
                                child: GestureDetector(
                              onTap: () async {
                                await handleImageClick();
                                socket?.emit('getUserCoins',
                                    userId); // Use the actual userId
                              },
                              child: Container(
                                margin: EdgeInsets.symmetric(horizontal: 4),
                                padding: EdgeInsets.all(16),
                                decoration: BoxDecoration(
                                  color: Color(0xFF1d2025),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Column(
                                  children: [
                                    Icon(
                                      Icons.swap_horiz,
                                      size: 32,
                                      color: Color(0xFFFFD700), // Gold color
                                    ),
                                    SizedBox(height: 8),
                                    Text(
                                      "Exchange",
                                      style: TextStyle(
                                          fontSize: 14, color: Colors.white),
                                    ),
                                  ],
                                ),
                              ),
                            )),
                            Expanded(
                              child: GestureDetector(
                                onTap: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) =>
                                            MinePage()), // Replace with your Mine page
                                  );
                                },
                                child: Container(
                                  margin: EdgeInsets.symmetric(horizontal: 4),
                                  padding: EdgeInsets.all(16),
                                  decoration: BoxDecoration(
                                    color: Color(0xFF1d2025),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  child: Column(
                                    children: [
                                      Icon(
                                        Icons.swap_horiz,
                                        size: 32,
                                        color: Color(0xFFFFD700),
                                      ),
                                      SizedBox(height: 8),
                                      Text(
                                        "Mine",
                                        style: TextStyle(
                                            fontSize: 14, color: Colors.white),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                            Expanded(
                              child: Container(
                                margin: EdgeInsets.symmetric(horizontal: 4),
                                padding: EdgeInsets.all(16),
                                decoration: BoxDecoration(
                                  color: Color(0xFF1d2025),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Column(
                                  children: [
                                    Icon(
                                      Icons.share,
                                      size: 32,
                                      color: Color(0xFFFFD700),
                                    ),
                                    SizedBox(height: 8),
                                    Text(
                                      "Share",
                                      style: TextStyle(
                                          fontSize: 14, color: Colors.white),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        )
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Column taskColumn(
      {required String title,
      required IconData icon,
      required String timeLeft}) {
    return Column(
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: 12,
            color: Color(0xFF85827d),
          ),
        ),
        SizedBox(height: 8),
        Icon(icon, size: 32, color: Color(0xFF85827d)),
        SizedBox(height: 8),
        Text(
          timeLeft,
          style: TextStyle(
            fontSize: 12,
            color: Color(0xFF85827d),
          ),
        ),
      ],
    );
  }
}

class TaskColumn extends StatelessWidget {
  final String title;
  final Widget icon; // Changed to Widget
  final String timeLeft;

  TaskColumn({required this.title, required this.icon, required this.timeLeft});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        icon, // Use the icon widget directly
        SizedBox(height: 8),
        Text(
          title,
          style: TextStyle(
            color: Colors.white,
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: 4),
        Text(
          timeLeft,
          style: TextStyle(
            color: Colors.grey,
            fontSize: 14,
          ),
        ),
      ],
    );
  }
}
