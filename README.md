#Belly Button Biodiversity
![Click Here for the live page](https://ntorres95.github.io/interactive_visualizations/)


Using the Belly Button Biodiversity dataset, the dashboard allows users to easily explore the available informtion of microbes that colonize the human navel.

When first loading the page, it loads without any visualizations. They don't show up until you select one from the drop down.

![first](images/first.png)

When you do, it looks something like this.

![second](images/second.png)

![third](images/third.png)

The dropdown displays all of the available subjects. After selecting one, the Demographic Info section displays that individuals age, ethnicity, gender, among other things.

The graphs then give a general breakdown of the different types of microbes found in tat subjects navel. The bar chart and pie chart display on the the top ten most common microbes. However, the bar chart only gives you the count of each while the pie chart provides a breakdown by percentage as well as the count.

![fourth](images/fourth.png)

Further down you can find a scatter plot that displays the OTU ID's vs their sample_values. The size is refelctive of their values while the color represents their id number. Hovering over a point provides additional information, including the sample_value as well as the specific names of the bacteria found within that individual.

#Neccessary Tools

In order to make this possible, I used:

![JavaScript](https://www.javascript.com/)
![D3](https://d3js.org/)
![Plotly](https://plotly.com/python/)
