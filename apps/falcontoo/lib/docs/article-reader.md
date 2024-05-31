# Article Reader

1. The user shares the article to the reader.
   1. Add manifest for the app to make the thing sharable with the app.
2. The user starts reading the article in the reader. 
   1. Parse the article using cheerio, jsdom, and readability/postlight
   2. Display the article inside the app.
   3. Keep a track of text on the current screen with html2canvas or similar libraries.
3. The user asks while reading the article
   1. Send a request to openai, along with the data of the article that is currently on the screen.
      1. Server action has two variables, current message, screen context
   2.  