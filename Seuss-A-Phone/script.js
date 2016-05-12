window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));

$(document).ready(function() {
  var q = [
    "Today you are you! That is truer than true! There is no one alive who is you-er than you!",
    "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    "Don't cry because it's over. Smile because it happened.",
    "Today is your day! Your mountain is waiting. So. . . get on your way.",
    "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.",
    "A person's a person, no matter how small.",
    "Unless someone like you cares a whole awful lot, nothing is going to get better. It's not.",
    "Sometimes the questions are complicated and the answers are simple.",
    "Be who you are and say what you feel, because those who mind don't matter and those who matter don't mind.",
    "I like nonsense, it wakes up the brain cells. Fantasy is a necessary ingredient in living."
  ];
  var count = 100;
  var quote;
  var advice = document.getElementById("quote");
  var TWEET_URI_BASE = "https://twitter.com/intent/tweet?text=";
  var URI_ATTRIBUTES = "&hashtags=drseuss,seussaphone&via=DrSeuss"
  var encodedQuote;
  var tweetURL;

  $('#button').on("click", function() {
    if (count == 100) {
      $('#front').toggleClass('first');
      $('#back').toggleClass('first');
      count = 0;
    } else if (count == 9) {
      count = 0;
    } else {
      count = count + 1;
    }
    $('#card').toggleClass("flip");
    quote = q[count];
    advice.innerHTML = quote;
    encodedQuote = encode(quote);
    tweetURL = (TWEET_URI_BASE + encodedQuote + URI_ATTRIBUTES);

    $('#tweet').setAttribute('href', tweetURL);
  })

})