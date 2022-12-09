# INFO 253A - Final Project Learning Report

## Team name:

- Hexagon (Group 7)

## Team members

- Binyao Hao, Guangyao Li, Haojin Liu, Jingyan Ma, Ning Zhang

## What was your original goal and how much of it were you able to achieve?

Our original goal was to build a React web application for people to browse basic information about movies and TV series. In our proposal, we included the following key features: a discovery page with a list of popular movies and TV series, two separate pages for genre-based filtering of movies and TV series respectively, and a search feature that allows a user to search for a particular title. We were also thinking about adding a watchlist for users to save certain titles for future reference.

We have now completed every goal in our proposal and added more functionality to the application. Please refer to the next section for more details.

## What our project does and the functionality that it provides

Hexagon is used to search and browse information about movies and TV series. It has five main pages: a homepage that shows today’s popular TV series and movies and supports filtering by media type, a TV Series page that supports filtering by genres, years and watch providers, a Movies page that supports filtering by genres, years and watch providers, a favorite page storing the titles bookmarked by a user, and lastly, a search results page. The Movies and TV Series pages also have a drop-down selector that allows a user to sort the list by popularity, rating and release date. Every page is essentially a list of cards, and each card comes with a favorite button. When we click the favorite button, the selected card stores on the favorite page. And when we click a card, a modal component gets rendered. The modal displays basic information about the movie or TV series, including its rating, overview, watch providers, cast list, and a link to the trailer. Meanwhile, there is a search bar in the header which allows users to search for titles based on their names and media types.

## What we learned from the project

Looking back at how we built this complex web application with multiple pages and cross functionalities, we have greatly honed our ability to pass information between files using React hooks such as states and contexts. A prime example is how we used state and constructed handling functions to track changes in genre filtering made by users on the discover pages. We learned to capture changes by resetting states and passing them to API calls to invoke new filtered content lists.

One of our key takeaways from this project is the experience of using Material UI components in our implementation. Some of our key components - such as the cards in a movie list, the modal to display detailed information about each movie and the filter buttons - are built on top of the Material UI library. Other than giving our components a more sophisticated look, using MUI components allowed us to learn to read official documentations, to understand the logic behind each component and to integrate them into the project with our own customization. With this experience, when it comes to building our own side projects in the future, we will definitely be more comfortable to explore more external libraries.

In terms of teamwork, we learned that it is really important to plan the order in which each team member completes their components. This is because some components are reused in different pages, and people working on one page might not be able to test their work until someone else finishes a component required for that page. In some cases, they would have to build a temporary placeholder for testing purposes, and this might cost them extra time and effort. Also, since we have pages that follow almost the same logic (such as the movies and TV series pages), if someone finished the implementation of one page first, another team member might just complete their part by modifying the existing similar page instead of coding it from scratch.

Technology-wise, we became better Git users after completing this project. We learned to manage different features using Github issues. We also learned to create a new branch every time we implement something new. By opening multiple branches and submitting code updates through pull requests, we effectively avoided merge conflicts which oftentimes cause a lot of headache for developers working on a team project. Using pull requests also gave us the opportunity to review one another’s code and provide constructive and timely feedback.

Throughout the process of designing and implementing the “add and remove from the favorite list” feature, we gained a better understanding of how to create a global state using the useContext hook and persist application data in the browser using the localStorage object. Since this feature is the extra one outside of our main features proposed from the start, to show the favorites list on a separate page, we created the new Favorite page component and added a react route to this new page. At the next step, the most important question was how to maintain a consistent state across all pages and for every single content appearing on screen that indicates whether a certain movie or TV show is added to favorites list. Under such a situation, we figured that the useContext hook would be helpful. As long as we maintain a global variable storing favorite items and set it into localStorage, our choice would be persisted and not get lost when refreshing the page. Lastly, every time the favorite state changes, the useEffect hook would be used to update our global list and store back to the localStorage object. By doing this, the displaying contents on the favorite page would be rendered dynamically as we remove from our favorite list.
