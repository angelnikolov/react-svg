##TASK 5
There are a couple of options to do this, all with different advantages and disadvantages

1. Send the data series and graph type to the server. 
On the server, based on the data we can dynamically create an html page with that component only. We could easily integrate Next.js to do our server side rendering and use a different templating engine to generate a simple html file with an invocation to the graph component (based on the type we have chosen). Once we got that, there are plenty of tools which will generate an image from HTML on the server side.
* Advantages - fine grain control on the process, clientside interaction is easy (just sending parameters)
* Disadvantages the process to generate the template, then render the app and take a picture of it could be hard to implement
2. We can use a Headless browser to get a photo of the page. However that won't be sufficient since we don't need the whole page, but just the graphic. For that we can actually use Puppeteer which is a fairly new Google Headless Node API based on Chrome. It actually has a pretty nice implementation about taking screenshots of specific elements and believe it or not the method to do that is
`await element.screenshot({path: 'screenshot.png'});`
* Advantages - really easy for the client, screenshot should always be one-to-one to what people would see in Chrome, since it uses exactly the same API
* Disadvantages - not that fine grain control over the process of making that screenshot, need to facilitate authentication if the graphic is behind such, could take more resources due to the headless browser