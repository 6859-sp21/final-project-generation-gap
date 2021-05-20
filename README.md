# Bridging the Generational Gap

## Overview

Polarization in U.S politics has been growing in recent years. The “generation gap” between youth and older adults in American society reflects these widening divisions in political viewpoints and media consumption. Even within a family, these gaps between parents and children have the opportunity to cause conflicts and create communication siloes. With our scrollytelly visualization “Bridging the Generational Gap”, we attempt to find common ground in both the news different generations have lived through and the news sources they consume. Using media trend data from Pew Research and headlines from AllSides.com, we also highlight the various media biases and political leanings of many news sources. Our final unit visualization encourages people to learn from others by allowing users to choose from various demographics to build a real reader, step into their perspective, and explore their newsfeed. Though division has become a defining feature of American Politics, our goal is to create a story with interactive visualizations to help each side talk with and understand one another.

## Development Process

### Pre-MVP
We started off by independently exploring various datasets and topics before coming together and sharing our findings. After a few iterations of this and sketching out visualizations for all the topics we were considering, we chose the topic we were the most passionate about and personally invested in-- the generational gap in American politics and particularly between us and our parents! We cycled through many datasets on the topic of politics across different generations before deciding on the Pews Research Dataset.

Next, we brainstormed what features we wanted to include and how we wanted to tell the story to accomplish our overall goal: bridging the gap and finding common understanding between different people. We designed and styled the scrollytelling and final visualization together to have a cohesive idea of the overall visualization. We determined that we wanted to include three main sections 1) Setting up the context for the two generations we were comparing,  2) Exploring the media habits and the relation to politics for each generation, and finally 3) Allow readers to compare their own newsfeed to that of another person, step into their perspective, and bridge the gap. For the MVP, we implemented the basic interactions for the first two sections, and began to design the final visualization in a figma file.

### Post-MVP
We refined the scrollytelling by adding a timeline to encode similar events between the generations. In addition, we added another graph in our scrollytelly to include political ideologies in response to the feedback from our MVP.
We began implementing the final visualization after our MVP. We iterated through different designs and how best to compare the user to different real readers. We chose a newsfeed design with newspaper icons, and scraped Allsides to populate the icons with recent headline data. We also cleaned the Pew Research Dataset and connected it to the newsfeed design so that users could choose different people in the Pew Research Dataset based on different demographics and read their newsfeed. 
We implemented many of the interactions after our MVP including all tooltips and modals. 


## Work Split
Jessica worked on cleaning the Pew Research Dataset. She also worked on the scrollytelling aspect of the visualization, writing the text, rendering the timeline, and using the Pew Research Dataset to visualize the aggregate statistics. She also worked on designing and styling.

Shirley mainly worked on final visualization, focusing on the rendering and styling of the unit display, sorting and filtering algorithms, and styling for the person card and filters. She also worked on the concluding text and inspiration acknowledgements.

Annie worked on scraping and preprocessing the AllSides data. On the timeline, she implemented the tooltip of the front page articles. She also implemented the interactions in the final visualization including the tooltip and the modal as well as the source bias pie chart.



