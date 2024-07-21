class Message {
  final bool isSender;
  final String originalMsg; // Original message
  final String? translatedMsg; // Translated message (nullable)

  Message(this.isSender, this.originalMsg, [this.translatedMsg]);

  bool get hasTranslation => translatedMsg != null;
}
