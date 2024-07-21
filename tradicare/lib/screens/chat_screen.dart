import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'message.dart';
import 'package:chat_bubbles/bubbles/bubble_normal.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({Key? key}) : super(key: key);

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  TextEditingController controller = TextEditingController();
  ScrollController scrollController = ScrollController();
  List<Message> msgs = [];
  bool isTyping = false;
  String user1Direction = "en-fr"; // Default translation direction for user 1
  String user2Direction = "fr-en"; // Default translation direction for user 2
  bool isUser1 = true; // Toggle to determine which user is sending the message

  String get currentUserHint => isUser1 ? 'User 1' : 'User 2';

  void sendMsg() async {
    String text = controller.text;
    controller.clear();
    if (text.isNotEmpty) {
      String selectedDirection = isUser1 ? user1Direction : user2Direction;
      setState(() {
        msgs.insert(0, Message(isUser1, text)); // Add original message
        isTyping = true; // Bot is typing when message is sent
      });
      scrollController.animateTo(0.0,
          duration: const Duration(seconds: 1), curve: Curves.easeOut);

      try {
        var response = await http.post(
          Uri.parse("http://192.168.1.13:5000/translate"),
          headers: {
            "Content-Type": "application/json"
          },
          body: jsonEncode({
            "text": text,
            "direction": selectedDirection
          }),
        );

        if (response.statusCode == 200) {
          var json = jsonDecode(response.body);
          String translation = json["translated_text"].toString().trimLeft();

          setState(() {
            isTyping = false; // Bot is done typing
            msgs[0] = Message(isUser1, text, translation); // Update with translation
            isUser1 = !isUser1; // Automatically switch users after sending message
          });
          scrollController.animateTo(0.0,
              duration: const Duration(seconds: 1), curve: Curves.easeOut);
        } else {
          setState(() {
            isTyping = false;
          });
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text("Some error occurred, please try again!"),
            ),
          );
        }
      } on Exception {
        setState(() {
          isTyping = false;
        });
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text("Some error occurred, please try again!"),
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          const SizedBox(height: 8),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Column(
                      children: [
                        const Text('User 1:'),
                        DropdownButton<String>(
                          value: user1Direction,
                          onChanged: (String? newValue) {
                            setState(() {
                              user1Direction = newValue!;
                            });
                          },
                          items: <String>['en-fr', 'fr-en']
                              .map<DropdownMenuItem<String>>((String value) {
                            return DropdownMenuItem<String>(
                              value: value,
                              child: Text(value == 'en-fr' ? 'English to French' : 'French to English'),
                            );
                          }).toList(),
                        ),
                      ],
                    ),
                    Column(
                      children: [
                        const Text('User 2:'),
                        DropdownButton<String>(
                          value: user2Direction,
                          onChanged: (String? newValue) {
                            setState(() {
                              user2Direction = newValue!;
                            });
                          },
                          items: <String>['en-fr', 'fr-en']
                              .map<DropdownMenuItem<String>>((String value) {
                            return DropdownMenuItem<String>(
                              value: value,
                              child: Text(value == 'en-fr' ? 'English to French' : 'French to English'),
                            );
                          }).toList(),
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),
          Expanded(
            child: ListView.builder(
              controller: scrollController,
              itemCount: msgs.length,
              shrinkWrap: true,
              reverse: true,
              itemBuilder: (context, index) {
                final message = msgs[index];
                if (message.hasTranslation) {
                  return Padding(
                    padding: const EdgeInsets.symmetric(vertical: 4),
                    child: Align(
                      alignment: message.isSender ? Alignment.centerRight : Alignment.centerLeft,
                      child: BubbleNormal(
                        text: message.translatedMsg!,
                        isSender: message.isSender,
                        color: message.isSender ? Colors.blue.shade100 : Colors.grey.shade200,
                      ),
                    ),
                  );
                }
                return SizedBox.shrink(); // Don't display non-translated messages
              },
            ),
          ),
          if (isTyping)
            Padding(
              padding: const EdgeInsets.only(left: 16, bottom: 8),
              child: Align(
                alignment: Alignment.centerLeft,
                child: const Text("Typing..."),
              ),
            ),
          Row(
            children: [
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Container(
                    width: double.infinity,
                    height: 40,
                    decoration: BoxDecoration(
                      color: Colors.grey[200],
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 8),
                      child: TextField(
                        controller: controller,
                        textCapitalization: TextCapitalization.sentences,
                        onSubmitted: (value) {
                          sendMsg();
                        },
                        textInputAction: TextInputAction.send,
                        showCursor: true,
                        decoration: InputDecoration(
                          border: InputBorder.none,
                          hintText: "Enter text as $currentUserHint",
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              InkWell(
                onTap: () {
                  sendMsg();
                },
                child: Container(
                  height: 40,
                  width: 40,
                  decoration: BoxDecoration(
                    color: Colors.blue,
                    borderRadius: BorderRadius.circular(30),
                  ),
                  child: const Icon(
                    Icons.send,
                    color: Colors.white,
                  ),
                ),
              ),
              const SizedBox(width: 8),
            ],
          ),
        ],
      ),
    );
  }
}
