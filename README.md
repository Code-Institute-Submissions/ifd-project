# Interactive Front End Design Project

## The City-Break Finder Webpage

The City-Break Finder website has been designed to provide a resource for users who wish
to find out more information about hotels, bars and restaurants, and tourist attractions
in any given location.

If the user has a specific destination in mind, they can enter this location
into the search box from a drop down list and the results are displayed in table form with
corresponding markers appearing on the map to give precise locations within that destination.
Further information about each individual result can be displayed in a window on the map by
clicking on the relevant result.

If the user is unsure or undecided as to which destination to choose, four suggestions are provided
for possible destinations which result in the same information being provided as before when clicked.
The whole page can be reset / cleared by the user ready for another search for a different location.

Wireframes for this website can be found [here](/ifd-wireframes.pdf)

### Technologies Used

[HMTL5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
   * Used to define the webpage.

[CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3)
   * Used to apply styles and colours to, and provide a responsive layout for the webpage.

[Javascript](https://www.javascript.com/)
   * Used to render Google Maps API and plot results from the search box.

[jQuery](https://jquery.com/)
   * Javascript library used to target specific HTML elements with javascript functions.

### Testing

The City-Break Finder Webpage utilises Google Maps API with Google Places API as a library
resource and the auto-complete search provided by the Google Places API. Code was taken from 
Google developer documentation and applied and modified / adapted to suit the purposes of this
application.

The search box has a prompt to enter a city upon which a destination must be chosen from the 
drop down menu supplied by the auto-complete search. No entry or incorrect spelling in the search 
box produces no drop down menu from which to select a location.
Results for hotels, bars and restaurants and tourist attractions are produced in tables with
corresponding markers located on the map. Each individual result can be clicked on and further 
information regarding the individual result is displayed on the map in a window. The code for this 
functionality was taken from Google Maps API developer documentation.

The clear button resets the page back to it's initial display, ready for a new search.

Four suggested destinations are provided on the page, which when clicked produce results for hotels,
bars and restaurants and tourist attractions for that destination.

The webpage was tested for full operation as above and once rendered in a browser window, the browser
window was re-sized to prove the responsive, mobile first design of the webpage.

### Deployment

Webpage deployed on github pages [here](https://geoffdoig.github.io)

### Credits

* __Code__ The code used for rendering the maps, markers, auto-complete search box and information window
          was taken from Google developer documentation supplied with [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial)
          
* __Media__ The images used for the destination suggestions were chosen from Google search results 
           for images of each specific location.