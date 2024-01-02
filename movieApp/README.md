# movieApp
Get Started

This app is built on React-Native Expo.

Pre-requirements
1. Ensure you have Node.js installed on your machine.
2. Install Expo CLI: -> npm install -g expo-cli
3. Download Expo app in your phone, to view the App.

Next: - Move to the project.

Step 1: Install Dependencies by navigating to the project directory, Run the following command to install the required dependencies:

yarn install

Step 2: Configure API Key
Open the `utils/apikey.js` file and add your API key:

Step 3:
Run the App, using the following command:
yarn expo



It will show QR Code, you can scan the QR on your expo app in your phone.
NOTE:- Make sure your system and your phone both are using the same network.
NOTE: - As Current is now 2024, so as per the requirement. We need to add a check that movie list to be show till current year. But now it goes till 2024, with 0 movies. So, added a check if no movies are there user can move to the previous year 

After scaning the QR, you will be able to view your app.

You can also open expo on your browser using, this URL-> exp://192.168.249.163:8081(PORT Number)

› Metro waiting on exp://192.168.249.163:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)


Commands Reference
Below is the list of commands you can use to configue for app. 

- Press `s` to switch to the development build.
- Press `a` to open Android.
- Press `i` to open iOS simulator.
- Press `w` to open the web version.
- Press `j` to open the debugger.
- Press `r` to reload the app.
- Press `m` to toggle the menu.
- Press `o` to open the project code in your editor.
- Press `?` to show all commands.


Thank you for using MovieApp(Movie You Choose)! 


Movie List API response, didn't provide some data like:- cast, director

Here is the one of the record of API response

        {
            "adult": false,
            "backdrop_path": "/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
            "genre_ids": [
                878,
                28,
                12
            ],
            "id": 24428,
            "original_language": "en",
            "original_title": "The Avengers",
            "overview": "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!",
            "popularity": 135.307,
            "poster_path": "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
            "release_date": "2012-04-25",
            "title": "The Avengers",
            "video": false,
            "vote_average": 7.7,
            "vote_count": 29493
        },
