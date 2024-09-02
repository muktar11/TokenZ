import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:async';
import 'package:youtube_player_flutter/youtube_player_flutter.dart';
import 'package:zcloud/exchange.dart';
import 'package:zcloud/minepage.dart';

class SettingPage extends StatefulWidget {
  @override
  _SettingsState createState() => _SettingsState();
}

class _SettingsState extends State<SettingPage> {
 

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
                        "Nikandr (CEO)",
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
                                        mainAxisAlignment: MainAxisAlignment.center, // This centers the button
                                        children: [
                                         
                                          SizedBox(width: 8),
                                        ElevatedButton(
                                        onPressed: () async {
                                          final prefs = await SharedPreferences.getInstance();
                                          
                                          // Remove the token and user data from SharedPreferences
                                          await prefs.remove('user');
                                          
                                          // Navigate to the login page
                                          Navigator.pushReplacementNamed(context, '/login'); 
                                        },
                                        child: Text('Logout'),
                                      ),

                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                                // YouTube player
                                
                              ],
                            ),
                          ),
                        ),
Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween,
  children: [
    Expanded(
      child: GestureDetector(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => ExchangePage()), // Replace with your Exchange page
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
    ),
    Expanded(
      child: GestureDetector(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => MinePage()), // Replace with your Mine page
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
                style: TextStyle(fontSize: 14, color: Colors.white),
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
                style: TextStyle(fontSize: 14, color: Colors.white),
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
