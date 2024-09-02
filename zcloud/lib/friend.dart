import 'package:flutter/material.dart';
import 'dart:async';

class FriendPage extends StatefulWidget {
  @override
  _FriendPageState createState() => _FriendPageState();
}

class _FriendPageState extends State<FriendPage> {
  int coins = 541507981;
  int levelIndex = 6;
  int points = 732749365;
  int pointsToAdd = 300;
  int profitPerHour = 15126420;
  List<String> levelNames = [
    'Bronze', // From 0 to 4999 coins
    'Silver', // From 5000 coins to 24,999 coins
    'Gold', // From 25,000 coins to 99,999 coins
    'Platinum', // From 100,000 coins to 999,999 coins
    'Diamond', // From 1,000,000 coins to 2,000,000 coins
    'Epic', // From 2,000,000 coins to 10,000,000 coins
    'Legendary', // From 10,000,000 coins to 50,000,000 coins
    'Master', // From 50,000,000 coins to 100,000,000 coins
    'Grandmaster', // From 100,000,000 coins to 1,000,000,000 coins
    'Lord', // From 1,000,000,000 coins to ∞
  ];
  List<int> levelMinPoints = [
    0, // Bronze
    5000, // Silver
    25000, // Gold
    100000, // Platinum
    1000000, // Diamond
    2000000, // Epic
    10000000, // Legendary
    50000000, // Master
    100000000, // GrandMaster
    1000000000, // Lord
  ];

  String dailyRewardTimeLeft = '';
  String dailyCipherTimeLeft = '';
  String dailyComboTimeLeft = '';

  @override
  void initState() {
    super.initState();
    _updateCountdowns();
    Timer.periodic(Duration(seconds: 1), (timer) {
      setState(() {
        points += (profitPerHour ~/ 3600);
        _updateLevel();
      });
    });
    Timer.periodic(Duration(minutes: 1), (timer) {
      _updateCountdowns();
    });
  }

  void _updateCountdowns() {
    setState(() {
      dailyRewardTimeLeft = _calculateTimeLeft(0);
      dailyCipherTimeLeft = _calculateTimeLeft(19);
      dailyComboTimeLeft = _calculateTimeLeft(12);
    });
  }

  String _calculateTimeLeft(int targetHour) {
    final now = DateTime.now().toUtc();
    final target = DateTime.utc(now.year, now.month, now.day, targetHour);

    if (now.hour >= targetHour) {
      target.add(Duration(days: 1));
    }

    final diff = target.difference(now);
    final hours = diff.inHours.toString().padLeft(2, '0');
    final minutes = (diff.inMinutes % 60).toString().padLeft(2, '0');

    return '$hours:$minutes';
  }

  void _updateLevel() {
    if (levelIndex < levelNames.length - 1 &&
        points >= levelMinPoints[levelIndex + 1]) {
      setState(() {
        levelIndex++;
      });
    } else if (levelIndex > 0 && points < levelMinPoints[levelIndex]) {
      setState(() {
        levelIndex--;
      });
    }
  }

  double _calculateProgress() {
    if (levelIndex >= levelNames.length - 1) return 100.0;
    final currentLevelMin = levelMinPoints[levelIndex];
    final nextLevelMin = levelMinPoints[levelIndex + 1];
    final progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return progress.clamp(0, 100);
  }

  String _formatProfitPerHour(int profit) {
    if (profit >= 1000000000) return '+${(profit / 1000000000).toStringAsFixed(2)}B';
    if (profit >= 1000000) return '+${(profit / 1000000).toStringAsFixed(2)}M';
    if (profit >= 1000) return '+${(profit / 1000).toStringAsFixed(2)}K';
    return '+$profit';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              children: [
                Icon(Icons.pets, color: Colors.grey),
                SizedBox(width: 8),
                Text('Gevork Sarkisyan', style: TextStyle(color: Colors.white)),
              ],
            ),
          ),
          GestureDetector(
            onTap: () => _showWarningDialog(context),
            child: Column(
              children: [
                Text(levelNames[levelIndex], style: TextStyle(color: Colors.white)),
                LinearProgressIndicator(
                  value: _calculateProgress() / 100,
                  color: Colors.yellow,
                  backgroundColor: Colors.grey,
                ),
              ],
            ),
          ),
          GestureDetector(
            onTap: () => _showWarningDialog(context),
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: Colors.grey.withOpacity(0.6),
                borderRadius: BorderRadius.circular(24),
              ),
              child: Row(
                children: [
                  Image.asset('assets/binanceLogo.png', width: 32, height: 32),
                  Spacer(),
                  Text(
                    _formatProfitPerHour(profitPerHour),
                    style: TextStyle(color: Colors.white),
                  ),
                  SizedBox(width: 8),
                  Icon(Icons.info, color: Colors.grey),
                ],
              ),
            ),
          ),
          // Add more widgets based on the original code
        ],
      ),
    );
  }

  void _showWarningDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Warning'),
          content: Text('User has hidden this information. Please enter the password.'),
          actions: <Widget>[
            TextButton(
              child: Text('OK'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }
}
