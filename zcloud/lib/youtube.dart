import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:async';
import 'package:youtube_player_flutter/youtube_player_flutter.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:hive/hive.dart';

class YouTubePage extends StatefulWidget {
  @override
  _YouTubePageState createState() => _YouTubePageState();
}


class _YouTubePageState extends State<YouTubePage> {
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
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Call this method to trigger coin count request whenever dependencies change
    _requestCoinCount();
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
      await _setupSocketConnection();
    } else {
      setState(() {
        error = 'User not logged in.';
      });
    }
  }

  Future<void> _setupSocketConnection() async {
    try {
      // Clean up any existing socket connection
      socket?.disconnect();

      if (userId == null || token == null) {
        print('UserID or Token is null');
        return;
      }

      socket = IO.io('http://10.0.2.2:5000', IO.OptionBuilder()
        .setTransports(['websocket'])
        .setQuery({'userId': userId.toString()})
        .setExtraHeaders({'Authorization': 'Bearer $token'})
        .build());

      // Indicate socket initialization
      setState(() {
        socketStatus = 'Socket initialized, connecting...';
      });

      socket?.on('connect', (_) {
        setState(() {
          socketStatus = 'Connected to server';
        });
        // Request initial coins on connection
        _requestCoinCount();
      });

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

      socket?.on('coinsUpdated', (data) {
        print('Received coinsUpdated event: $data'); // Debugging
        if (data != null && data is Map && data.containsKey('coins')) {
          setState(() {
            coinCount = data['coins'];
          });
        }
      });

      socket?.on('error', (data) {
        print('Socket error: $data'); // Debugging
        setState(() {
          error = data is Map ? data['error'] ?? 'Unknown error' : 'Unknown error';
          socketStatus = 'Socket connection failed';
        });
      });

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

  void _requestCoinCount() {
    if (socket != null) {
      socket?.emit('getUserCoins', userId);
      print('Emitted getUserCoins event'); // Debugging
    } else {
      print('Socket is not connected'); // Debugging
    }
  }

  // Method to update coins from the client-side
  void updateCoins(int userId, int coinsEarned) {
    socket?.emit('updateCoins', [userId, coinsEarned]);
  }

  @override
  void dispose() {
    socket?.disconnect();
    super.dispose();
  }

  final videos = ['https://www.youtube.com/watch?v=taqWvJnX6u0'];



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.only(top: 56.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
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
                              color: Colors.white,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          Row(
                            children: [
                              Image.asset('assets/dollar-coin.png', width: 14),
                              SizedBox(width: 4),
                              Text(
                                '12',
                                style: TextStyle(fontSize: 14, color: Colors.white),
                              ),
                              Icon(Icons.info_outline, size: 8, color: Color.fromARGB(255, 221, 221, 202)),
                            ],
                          ),
                        ],
                      ),
                      Container(
                        width: 2,
                        height: 32,
                        color: Color(0xFF43433b),
                      ),
                      Icon(Icons.settings, color: Colors.white),
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
                    borderRadius: BorderRadius.vertical(top: Radius.circular(48)),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            TaskColumn(
                              title: 'YouTube',
                              icon: Image.asset(
                                'assets/youtube.png',
                                width: 18,
                                height: 18,
                              ),
                            ),

                           Text(
                                          '$coinCount',
                                          style: TextStyle(
                                              fontSize: 16,
                                              color: Color(0xFFFFD700)),
                                        ),
                              
                          ],
                        ),
                        
                        Expanded(
                          child: SingleChildScrollView(
                            child: Column(
                              children: [
                                // Text input field and submit button
                                Padding(
                                  padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                                  child: Column(
                                    children: [
                                      Row(
                                        children: [
                                          Expanded(
                                            child: TextField(
                                              decoration: InputDecoration(
                                                hintText: 'Enter your coin',
                                                filled: true,
                                                fillColor: Colors.white,
                                                border: OutlineInputBorder(
                                                  borderRadius: BorderRadius.circular(12.0),
                                                  borderSide: BorderSide(
                                                    color: Color(0xFFFFD700),
                                                    width: 2.0,
                                                  ),
                                                ),
                                                enabledBorder: OutlineInputBorder(
                                                  borderRadius: BorderRadius.circular(12.0),
                                                  borderSide: BorderSide(
                                                    color: Color(0xFFFFD700),
                                                    width: 2.0,
                                                  ),
                                                ),
                                                focusedBorder: OutlineInputBorder(
                                                  borderRadius: BorderRadius.circular(12.0),
                                                  borderSide: BorderSide(
                                                    color: Color(0xFFFFD700),
                                                    width: 2.0,
                                                  ),
                                                ),
                                              ),
                                              style: TextStyle(color: Colors.black),
                                              onChanged: (value) {
                                                // Handle the input value change if needed
                                              },
                                            ),
                                          ),
                                          SizedBox(width: 8),
                                          ElevatedButton(
                                            onPressed: () {
                                              // Handle the submit action for the coin
                                            },
                                            child: Text('Submit'),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                                // YouTube player
                                ...videos.map((video) {
                                  return Container(
                                    width: double.infinity,
                                    height: 400.0,
                                    margin: const EdgeInsets.symmetric(vertical: 8.0),
                                    child: YoutubePlayerWidget(video),
                                  );
                                }).toList(),
                              ],
                            ),
                          ),
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
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
                                      Icons.swap_horiz,
                                      size: 32,
                                      color: Color(0xFFFFD700), // Gold color
                                    ),
                                    SizedBox(height: 8),
                                    Text(
                                      "Exchange",
                                      style: TextStyle(fontSize: 14, color: Colors.white),
                                    ),
                                  ],
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
                                    Icon(Icons.swap_horiz, size: 32, color: Color(0xFFFFD700)),
                                    SizedBox(height: 8),
                                    Text(
                                      "Mine",
                                      style: TextStyle(fontSize: 14, color: Colors.white),
                                    ),
                                  ],
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
                                    Icon(Icons.share, size: 32, color: Color(0xFFFFD700)),
                                    SizedBox(height: 8),
                                    Text(
                                      "Share",
                                      style: TextStyle(fontSize: 14, color: Colors.white),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
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

  Column taskColumn({required String title, required IconData icon, required String timeLeft}) {
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
            color: Color(0xFF85827d)),
        )
      ],
    );
  }
}



class TaskColumn extends StatelessWidget {
  final String title;
  final Widget icon;  // Changed to Widget
  

  TaskColumn({required this.title, required this.icon});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        icon,  // Use the icon widget directly
        SizedBox(height: 8),
        Text(
          title,
          style: TextStyle(
            color: Colors.white,
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),       
      ],
    );
  }
}



class YoutubePlayerWidget extends StatefulWidget {
  final String videoUrl;
  YoutubePlayerWidget(this.videoUrl);

  @override
  _YoutubePlayerWidgetState createState() => _YoutubePlayerWidgetState();
}

class _YoutubePlayerWidgetState extends State<YoutubePlayerWidget> {
  late YoutubePlayerController _controller;

  @override
  void initState() {
    super.initState();
    _controller = YoutubePlayerController(
      initialVideoId: YoutubePlayer.convertUrlToId(widget.videoUrl)!,
      flags: YoutubePlayerFlags(
        autoPlay: false,
        mute: false,
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return YoutubePlayer(
      controller: _controller,
      showVideoProgressIndicator: true,
      progressIndicatorColor: Colors.blueAccent,
      onReady: () {},
    );
  }
}
